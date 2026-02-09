
import { Component, Input, WritableSignal } from "@angular/core";
import { TooltipModule } from 'primeng/tooltip';

@Component({
    selector: 'smz-label',
    standalone: true,
    imports: [TooltipModule],
    host: { class: 'flex flex-row gap-2' },
    template: `
    @if(showLabel) {
      <label [for]="propertyName" [innerHTML]="text"></label>
      @if(warning != null) {
        @if (warning(); as warningValue) {
          @if(warningValue != null) {
            <i class="pi pi-exclamation-triangle text-red-500 text-lg" [pTooltip]="warningValue"></i>
          }
        }
      }
    }
    `
})
export class LabelComponent {
    @Input() text: string;
    @Input() propertyName: string;
    @Input() showLabel: boolean = true;
    @Input() warning?: WritableSignal<string | null>;
}
