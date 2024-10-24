import { Injectable } from '@angular/core';
import { SmzFormBaseLinkedControl } from '../models/control-types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SmzFormsDropdownService
{

    public dependsOn: { [ key: string ]: { observers: string[], value: any } };
    public observers: { [ key: string ]: { input: SmzFormBaseLinkedControl; options: BehaviorSubject<any> } };

    constructor()
    {
        this.clear();
    }

    public registryObserver(input: SmzFormBaseLinkedControl, formId: string): void
    {
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

        // console.log(this);
    }

    private getDependsOnKey(input: SmzFormBaseLinkedControl, formId: string): string
    {
        return input.dependsOn.formId != null ? `${input.dependsOn.formId}${input.dependsOn.propertyName}` : `${formId}${input.dependsOn.propertyName}`;
    }

    public registryDependsOnData(input: SmzFormBaseLinkedControl, formId: string): void
    {
        const dependsOn = formId + input.propertyName;
        const data = this.dependsOn[dependsOn];

        if (data == null)
        {
            this.dependsOn[dependsOn] = { observers: [], value: [] };
        }
    }

    public setValue(input: SmzFormBaseLinkedControl, formId: string, onChangeDropdownEvent: { originalEvent: any, value: any }): void
    {

        const dependsOn = formId + input.propertyName;
        const data = this.dependsOn[dependsOn];

        if (data == null)
        {
            this.dependsOn[dependsOn] = { observers: [], value: onChangeDropdownEvent.value };
        }
        else
        {
            this.dependsOn[dependsOn].value = onChangeDropdownEvent.value;
        }

        this.emitToObservers(this.dependsOn[dependsOn].observers, onChangeDropdownEvent.value);
    }

    private emitToObservers(observers: string[], value: any): void
    {
        for (let observer of observers)
        {
            const match = this.observers[observer];

            if (match == null)
            {
                console.log('Observer não encontrado.');
            }
            else
            {
                const options = match.input.options;

                const newOptionsIndex = options.findIndex(x => x.parentId === value.id);

                if (newOptionsIndex > -1)
                {
                    this.observers[observer].options.next(options[newOptionsIndex].data);
                }
                else
                {
                    this.observers[observer].options.next([]);
                    console.warn('Lista de opções não encontrada.', match.input);
                }

                if (match.input.defaultValue == null) {
                    match.input._inputFormControl.setValue('');
                }

            }
        }
    }

    public clear(): void
    {
        this.dependsOn = {};
        this.observers = {};
    }

}
