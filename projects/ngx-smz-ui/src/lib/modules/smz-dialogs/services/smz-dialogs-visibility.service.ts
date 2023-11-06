import { Injectable } from '@angular/core';
import { SmzDialogsConfig } from '../../smz-dialogs/smz-dialogs.config';
import { BehaviorSubject } from 'rxjs';
import { SmzCheckBoxControl, SmzControlType } from '../../smz-forms/models/control-types';
import { ComponentData } from '../../../common/modules/inject-content/models/injectable.model';

@Injectable({
    providedIn: 'root'
})
export class SmzDialogsVisibilityService
{

    public dependsOn: { [key: string]: { observers: string[], value: any } };
    public observers: { [key: string]: { component: ComponentData; visibility$: BehaviorSubject<{ state: boolean }> } };

    constructor()
    {
        this.clear();
    }

    public registryObserver(component: ComponentData): void
    {
        const componentId = `${component.componentId}${component.component.name}`;
        this.observers[componentId] = { component, visibility$: new BehaviorSubject<{ state: boolean }>({ state: false }) };
        const dependsOn = `${component.visibilityDependsOn.formId}${component.visibilityDependsOn.propertyName}`;

        const data = this.dependsOn[dependsOn];

        if (data == null)
        {
            this.dependsOn[dependsOn] = { observers: [componentId], value: [] };
        }
        else
        {
            this.dependsOn[dependsOn].observers.push(componentId);
        }
    }

    public registryDependsOnData(input: SmzCheckBoxControl, formId: string): void
    {
        // console.log('registryDependsOnData input', input);
        const dependsOn = formId + input.propertyName;
        const data = this.dependsOn[dependsOn];

        if (data == null)
        {
            this.dependsOn[dependsOn] = { observers: [], value: [] };
        }
    }

    public setValue(input: SmzCheckBoxControl, formId: string, onChangeDropdownEvent: any): void
    {
        // console.log('setValue 1', onChangeDropdownEvent);
        const dependsOn = formId + input.propertyName;
        const data = this.dependsOn[dependsOn];
        let eventValue = null;

        switch (input.type)
        {
            case SmzControlType.CHECKBOX:
                eventValue = onChangeDropdownEvent.checked;
                break;

            case SmzControlType.DROPDOWN:
                eventValue = onChangeDropdownEvent.value?.id;
                break;
            default:
                break;
        }

        if (data == null)
        {
            this.dependsOn[dependsOn] = { observers: [], value: eventValue };
        }
        else
        {
            this.dependsOn[dependsOn].value = eventValue;
        }

        // console.log('this.dependsOn[dependsOn]', this.dependsOn[dependsOn]);
        // console.log('event', onChangeDropdownEvent);

        this.emitToObservers(input, this.dependsOn[dependsOn].observers, eventValue);
    }

    private emitToObservers(input: SmzCheckBoxControl, observers: string[], value: any): void
    {
        // console.log('-------');
        // console.log('emitToObservers', observers);

        for (let observer of observers)
        {
            const match = this.observers[observer];

            if (match == null)
            {
                console.log('Observer não encontrado.');
            }
            else
            {
                // console.log('match', match);
                let stateCondition = false;
                switch (input.type)
                {
                    case SmzControlType.CHECKBOX:
                        stateCondition = value === true;
                        break;

                    case SmzControlType.DROPDOWN:
                        stateCondition = value === match.component.visibilityDependsOn.condition;
                        break;
                    default:
                        break;
                }

                // console.log('dialog stateCondition', stateCondition);

                this.observers[observer].visibility$.next({ state: stateCondition });
            }
        }
    }

    public clear(): void
    {
        this.dependsOn = {};
        this.observers = {};
    }

}
