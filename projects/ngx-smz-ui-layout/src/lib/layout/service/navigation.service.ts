// navigation.service.ts
import { Injectable, signal, computed } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  /** Sempre começamos com a raiz como entry-point */
  private history = signal<string[]>(['/']);

  /** Flag para indicar que o próximo NavigationEnd vem de um goBack() */
  private isPopping = signal(false);

  /** Signal público que informa se há para onde voltar */
  public readonly canGoBack = computed(() => this.history().length > 1);

  constructor(private location: Location, private router: Router) {
    this.router.events
      .pipe(filter(evt => evt instanceof NavigationEnd))
      .subscribe((evt: NavigationEnd) => {
        const url = evt.urlAfterRedirects;

        if (this.isPopping()) {
          // foi um goBack(): só limpa o flag, não mexe no history
          this.isPopping.set(false);
          return;
        }

        const hist = this.history();
        // Se for o primeiro evento (somente ['/'] no history):
        if (hist.length === 1 && hist[0] === '/') {
          if (url === '/' || url === '') {
            // navegação inicial para raiz → ignora (não duplica '/')
            return;
          } else {
            // navegação inicial para sub-rota → adiciona após '/'
            this.history.update(list => [...list, url]);
            return;
          }
        }

        // navegação normal após a inicial
        this.history.update(list => [...list, url]);
      });
  }

  /** Para usar no template: [disabled]="!navigationService.canGoBack()" */
  public canGoBackSignal(): boolean {
    return this.canGoBack();
  }

  /** Volta um passo, removendo do history e chamando Location.back() */
  public goBack(): void {
    if (!this.canGoBack()) {
      return;
    }
    this.isPopping.set(true);
    this.history.update(list => list.slice(0, -1));
    this.location.back();
  }
}
