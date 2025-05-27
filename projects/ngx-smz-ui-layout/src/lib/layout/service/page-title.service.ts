import { Injectable, signal, computed, inject } from '@angular/core';
import {
  Router,
  NavigationEnd,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { filter } from 'rxjs/operators';
import { LoggingService, ScopedLogger } from '../../logging/logging.service';
import { LoggingScope } from '../../logging/logging-scope';

@Injectable({ providedIn: 'root' })
export class PageTitleService {
  private router = inject(Router);
  private loggingService = inject(LoggingService);
  private logger: ScopedLogger = this.loggingService.scoped(LoggingScope.PageTitleService);
  // signal que guarda o título (ou null)
  private titleSignal = signal<string | null>(null);

  // string pura para template ('' quando null)
  public readonly title = computed(() => this.titleSignal() ?? '');

  // boolean para visibilidade (false quando null)
  public readonly hasTitle = computed(() => this.titleSignal() !== null);

  constructor() {
    // toda vez que uma navegação termina, atualiza o título
    this.router.events
      .pipe(filter(evt => evt instanceof NavigationEnd))
      .subscribe(() => this.updateTitle());

    // atualiza de cara no load
    this.updateTitle();
  }

  /** Percorre recursivamente o snapshot até a rota mais interna */
  private getDeepestSnapshot(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
    return route.firstChild
      ? this.getDeepestSnapshot(route.firstChild)
      : route;
  }

  /** Lê o title do data da rota mais interna */
  private updateTitle(): void {
    const routerState: RouterStateSnapshot = this.router.routerState.snapshot;
    const rootSnapshot = routerState.root;
    const deepest = this.getDeepestSnapshot(rootSnapshot);
    const title = typeof deepest.data['title'] === 'string'
      ? deepest.data['title']
      : null;
    this.titleSignal.set(title);
  }
}
