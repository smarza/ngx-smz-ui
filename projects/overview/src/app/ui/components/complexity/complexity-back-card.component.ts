import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickStopPropagationModule, NgxSmzServerImageModule, SimpleEntity, SmzDialogsService } from '@ngx-smz/core';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-complexity-back-card',
  standalone: true,
  imports: [CommonModule, NgxSmzServerImageModule, ButtonModule, ClickStopPropagationModule],
  host: { class: 'w-full h-full relative' },
  encapsulation: ViewEncapsulation.None,
  styles: [`
  .app-complexity-back-card {}
  `
  ],
  template: `
    <div class="bg-green-500 h-full rounded-lg shadow-lg grid grid-nogutter flex-col items-center justify-center">
      <div class="text-4xl font-bold mx-auto">{{ data.name }}</div>
    </div>
    <div class="absolute inset-0 p-5 grid grid-nogutter items-end justify-center">
      <button pButton clickStopPropagation type="button" label="Escolher" class="p-button-rounded p-button-help" (click)="submit()"></button>
    </div>
  `,
})
export class ComplexityBackCardComponent {
  @Input() public data: SimpleEntity<Number>;
  constructor(private store: Store, private dialogs: SmzDialogsService) {
  }

  public submit(): void {
    console.log('submit', this.data);

    setTimeout(() => {
      this.dialogs.closeAll();
    }, 2000);
  }
}