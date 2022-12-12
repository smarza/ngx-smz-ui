import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmzCardsFlipCardDemoData } from '@demos/data/cards/flip-card-data';
import { NgxSmzServerImageModule } from 'ngx-smz-ui';

@Component({
  selector: 'app-front-card',
  standalone: true,
  imports: [CommonModule, NgxSmzServerImageModule],
  host: { class: 'w-full h-full relative' },
  encapsulation: ViewEncapsulation.None,
  styles: [`
  .app-front-card {}
  `
  ],
  template: `
    <img
        serverImage
        [path]="data.frontImage"
        [maximize]="false"
        [openMaximized]="false"
        [placeholder]="'assets/images/placeholder.jpeg'"
        [title]="'Título'"
        [useServerPath]="false"
        class="w-full h-full rounded-lg"
        draggable="false"
      >
  `,
})
export class FrontCardComponent {
  @Input() public data: SmzCardsFlipCardDemoData;
  @Input() public isSelectable = false;

}