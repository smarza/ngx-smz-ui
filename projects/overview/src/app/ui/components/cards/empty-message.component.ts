import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empty-message',
  standalone: true,
  imports: [CommonModule],
  host: { class: 'w-full h-full relative' },
  encapsulation: ViewEncapsulation.None,
  styles: [`
  .app-empty-message {}
  `
  ],
  template: `
    <div>
      <div class="text-2xl text-bold text-red-500">Injectable Component</div>
      <div class="text-3xl">{{ message }}</div>
    </div>
  `,
})
export class EmptyMessageComponent {
  @Input() public message: string;

}