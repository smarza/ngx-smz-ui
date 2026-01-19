import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '@environments/environment';
import { Store } from '@ngxs/store';
import { SimpleEntity } from '@ngx-smz/core';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { Subject, Subscription, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-auto-refresh-table',
  template: `
  <p-button *ngIf="showRefreshButton" icon="fa-solid fa-arrows-rotate" styleClass="p-button-rounded p-button-text p-button-lg w-10 h-10" (click)="manualRefreshData()" [disabled]="!enabled"></p-button>
  <p-select appendTo="body" [options]="options" [(ngModel)]="selected" optionLabel="name" optionValue="id" (onChange)="changeChoice()" [disabled]="!enabled"></p-select>
`,
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SelectModule,
    ButtonModule
  ],
  host: { class: 'grid grid-nogutter items-center justify-start gap-2' }
})

export class AutoRefreshTableComponent implements OnDestroy {
  @Input() public enabled = true;
  @Input() public showRefreshButton = true;
  @Input() public callback: () => void = () => {};
  @Input() public action: unknown;
  @Input() public actions: unknown[];
  @Input() public manualActions: unknown[];
  private timerSubscription: Subscription;
  private destroy$ = new Subject<void>();
  public options: SimpleEntity<number>[] = [
    { id: 0, name: 'Off' },
    { id: 10, name: '10 seg' },
    { id: 30, name: '30 seg' },
    { id: 60, name: '1 min' },
    { id: 60 * 5, name: '5 min' },
  ];

  public selected = 0;

  constructor(private store: Store) {
    if (!environment.production) {
      this.options.push({ id: 1, name: '5 seg'});
    }
  }

  public changeChoice(): void {

    // Se já houver um timer ativo, desative-o primeiro
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    if (this.selected > 0) {
      // Inicia o timer com base no valor selecionado
      this.timerSubscription = interval(this.selected * 1000)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.autoRefreshData();
        });
    }
  }

  public autoRefreshData(): void {
    if (this.enabled) {

      if (this.action != null) {
        this.store.dispatch(this.action);
      }

      if (this.actions != null) {
        this.actions.forEach(action => {
          this.store.dispatch(action);
        });
      }

      this.callback();

    }
  }

  public manualRefreshData(): void {
    if (this.enabled) {

      if (this.action != null) {
        this.store.dispatch(this.action);
      }

      if (this.manualActions != null) {
        this.manualActions.forEach(action => {
          this.store.dispatch(action);
        });
      }

      this.callback();

    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}