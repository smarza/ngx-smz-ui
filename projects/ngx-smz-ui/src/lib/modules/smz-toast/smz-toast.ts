
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, inject, Input, NgZone, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'smz-ui-toast',
  standalone: true,
  imports: [
    ToastModule,
    ButtonModule,
    ProgressBarModule
],
  template: `
  <!-- <p-toast /> -->
<p-toast position="bottom-right">
    <ng-template let-message #message>
      <span class="p-toast-message-icon">
        <i class="pi pi-info-circle"></i>
      </span>
      <div class="p-toast-message-text">
        <div class="p-toast-summary">{{ message.summary }}</div>
        <div class="p-toast-detail">{{ message.detail }}</div>
        <!-- <p-progressBar [value]="message.progress()" [style]="{ height: '6px' }" [showValue]="false"></p-progressBar> -->
      </div>
    </ng-template>
</p-toast>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class SmzToastComponent {
  private readonly messageService = inject(MessageService);
}