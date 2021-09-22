import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SmzNotificationsComponent } from './features/notifications/notifications.component';

@NgModule({
    imports: [CommonModule],
    exports: [SmzNotificationsComponent],
    declarations: [SmzNotificationsComponent]
  })
  export class SmzNotificationsModule {}
