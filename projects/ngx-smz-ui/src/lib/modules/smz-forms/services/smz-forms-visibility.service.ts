import { Injectable } from '@angular/core';
import { SmzCheckBoxControl, SmzControlType, SmzControlTypes } from '../models/control-types';
import { BehaviorSubject } from 'rxjs';
import { SimpleNamedEntity } from '../../../common/models/simple-named-entity';

@Injectable({
    providedIn: 'root'
})
export class SmzFormsVisibilityService
{

    public dependsOn: { [ key: string ]: { observers: string[], value: any } };
    public observers: { [ key: string ]: { input: SmzControlTypes; options: BehaviorSubject<any> } };

    constructor()
    {
        this.clear();
    }

    public registryObserver(input: SmzControlTypes, formId: string): void
    {
        // console.log('registryObserver', input);
        this.observers[formId + input.propertyName] = { input, options: new BehaviorSubject<any[]>([]) };
        const dependsOn = this.getDependsOnKey(input, formId);

        const data = this.dependsOn[dependsOn];

        if (data == null)
        {
            this.dependsOn[dependsOn] = { observers: [formId + input.propertyName], value: [] };
        }
        else
        {
            this.dependsOn[dependsOn].observers.push(formId + input.propertyName);
        }
    }

    private getDependsOnKey(input: SmzControlTypes, formId: string): string
    {
        // console.log('getDependsOnKey input', input);
        return input.visibilityDependsOn.formId != null ? `${input.visibilityDependsOn.formId}${input.visibilityDependsOn.propertyName}` : `${formId}${input.visibilityDependsOn.propertyName}`;
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
        // console.log('setValue 2', onChangeDropdownEvent);
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

            case SmzControlType.MULTI_SELECT:
                eventValue = (onChangeDropdownEvent.value as SimpleNamedEntity[])?.map(x => x.id);
                break;

            case SmzControlType.RADIO:
                eventValue = onChangeDropdownEvent.value;
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
                console.warn('Observer não encontrado.', observer);
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
                        if (match.input.visibilityDependsOn.conditions != null) {
                            stateCondition = match.input.visibilityDependsOn.conditions.findIndex(c => c === value) !== -1;
                        }
                        else {
                            stateCondition = value === match.input.visibilityDependsOn.condition;
                        }
                        break;

                    case SmzControlType.RADIO:
                        if (match.input.visibilityDependsOn.conditions != null) {
                            stateCondition = match.input.visibilityDependsOn.conditions.findIndex(c => c === value) !== -1;
                        }
                        else {
                            stateCondition = value === match.input.visibilityDependsOn.condition;
                        }
                        break;

                    case SmzControlType.MULTI_SELECT:
                        if (match.input.visibilityDependsOn.conditions != null) {
                            stateCondition = match.input.visibilityDependsOn.conditions?.some(c => value.some(v => v === c));
                        }
                        else {
                            stateCondition = value?.some(x => x === match.input.visibilityDependsOn.condition);
                        }
                        break;
                    default:
                        break;
                }

                // console.log('stateCondition', stateCondition);

                match.input.isVisible = !match.input.visibilityDependsOn.reversed && stateCondition || match.input.visibilityDependsOn.reversed && !stateCondition;
            }
        }
    }

    public clear(): void
    {
        this.dependsOn = {};
        this.observers = {};
    }

}
