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
        // console.log(' ');
        // console.log(' ');
        // console.log('--------------------------------');
        // console.log('emitToObservers', observers, value);
        // console.log('Dependências', this.dependsOn);

        for (let observer of observers)
        {
            // console.log('Emitindo para o observer', observer);
            const match = this.observers[observer];

            if (match == null)
            {
                // console.log('Observer não encontrado.');
            }
            else
            {
                // console.log('Observer encontrado.', match);
                const options = match.input.options;

                let newList = [];
                let emitValue = null;

                // console.log('Observer Dependencies', this.dependsOn[observer]);

                if (value != null)
                {
                    // console.log(`Procurando opções para o valor ${value}`, options);
                    const newOptionsIndex = options.findIndex(x => x.parentId === (value?.id ?? value));

                    // console.log('newOptionsIndex', newOptionsIndex);

                    if (newOptionsIndex > -1)
                    {
                        // console.log('Opções', newList);
                        newList = options[newOptionsIndex].data;
                    }
                    else
                    {
                        console.warn('Lista de opções não encontrada.', match.input);
                    }
                }
                else
                {
                    // console.log('Setando valor vazio pois o valor do parente é null.');
                }

                // console.log('Emitindo opções.', newList);
                this.observers[observer].options.next(newList);

                if (match.input.defaultValue == null) {
                    // console.log('Setando valor padrão.');
                    match.input._inputFormControl.setValue('');
                    emitValue = null;
                }
                else {
                    // console.log('Procurando valor padrão na lista de opções.', newList, match.input.defaultValue);
                    if (newList.find(x => x.id == (match.input.defaultValue?.id ?? match.input.defaultValue))) {
                        // console.log('Valor padrão encontrado.', match.input.defaultValue);
                        emitValue = match.input.defaultValue;
                    }
                    else {
                        // console.warn('Valor padrão não encontrado na lista de opções.', match.input.defaultValue);
                    }
                }

                if (this.dependsOn[observer].observers.length > 0) {
                    // console.log('Emitindo para os observers dependentes.', this.dependsOn[observer].observers);
                    // console.log('Emitindo valor', emitValue);
                    this.emitToObservers(this.dependsOn[observer].observers, emitValue);
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
