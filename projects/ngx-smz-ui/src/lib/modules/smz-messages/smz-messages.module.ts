import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmzIconMessageComponent } from './components/icon-message/icon-message.component';

// export { SmzIconMessageComponent };

@NgModule({
    declarations: [
        SmzIconMessageComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        SmzIconMessageComponent
    ]
})
export class SmzMessagesModule { }
