import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmzCardsFlipCardDemoData } from '@demos/data/cards/flip-card-data';
import { ClickStopPropagationModule, NgxSmzServerImageModule, NgxSmzServerImageToBase64Module } from 'ngx-smz-ui';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-back-card',
  standalone: true,
  imports: [CommonModule, NgxSmzServerImageModule, NgxSmzServerImageToBase64Module, ButtonModule, ClickStopPropagationModule],
  host: { class: 'w-full h-full relative' },
  encapsulation: ViewEncapsulation.None,
  styles: [`
  .app-back-card {}
  `
  ],
  template: `
    <img
        serverImageToBase64
        [path]="data.backImage"
        [maximize]="false"
        [openMaximized]="false"
        [placeholder]="'assets/images/placeholder.jpeg'"
        [title]="'Título'"
        [useServerPath]="false"
        class="w-full h-full rounded-lg"
        draggable="false"
      >
    <div class="absolute inset-0 p-5 grid grid-nogutter items-end justify-center">
      <button pButton clickStopPropagation type="button" label="Help" class="p-button-rounded p-button-help"></button>
    </div>
  `,
})
export class BackCardComponent {
  @Input() public data: SmzCardsFlipCardDemoData;
}