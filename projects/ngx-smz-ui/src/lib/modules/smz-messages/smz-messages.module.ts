import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmzIconMessageComponent } from './components/icon-message/icon-message.component';
import { SmzTagMessage } from './components/tag-message/tag-message.component';

// export { SmzIconMessageComponent };

@NgModule({
    declarations: [
        SmzIconMessageComponent,
        SmzTagMessage
    ],
    imports: [
        CommonModule
    ],
    exports: [
        SmzIconMessageComponent,
        SmzTagMessage
    ]
})
export class SmzMessagesModule { }
