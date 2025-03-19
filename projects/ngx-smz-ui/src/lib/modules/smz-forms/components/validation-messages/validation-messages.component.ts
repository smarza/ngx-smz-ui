import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { SmzFormsBehaviorsConfig } from '../../models/behaviors';
import { SmzControlTypes } from '../../models/control-types';
import { GlobalInjector } from '../../../../common/services/global-injector';

@Component({
    selector: 'smz-validation-messages',
    templateUrl: './validation-messages.component.html',
    standalone: false
})
export class ValidationMessagesComponent {
    @Input() public input: SmzControlTypes;
    @Input() public control: AbstractControl;
    @Input() public behaviors: SmzFormsBehaviorsConfig;
    @Input() public extraMessages: string[] = [];
    public uiConfig = GlobalInjector.config;
}
