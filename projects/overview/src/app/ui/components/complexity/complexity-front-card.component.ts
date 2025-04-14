import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSmzServerImageModule, SimpleEntity } from '@ngx-smz/core';

@Component({
  selector: 'app-complexity-front-card',
  standalone: true,
  imports: [CommonModule, NgxSmzServerImageModule],
  host: { class: 'w-full h-full relative' },
  encapsulation: ViewEncapsulation.None,
  styles: [`
  .app-complexity-front-card {}
  `
  ],
  template: `
    <div class="bg-gray-400 h-full rounded-lg shadow-lg grid grid-nogutter flex-col items-center justify-center">
      <div class="text-4xl font-bold mx-auto">{{ data.name }}</div>
    </div>
  `,
})
export class ComplexityFrontCardComponent {
  @Input() public data: SimpleEntity<Number>;

}