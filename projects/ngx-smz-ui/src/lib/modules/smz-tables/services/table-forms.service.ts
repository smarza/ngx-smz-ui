import { Injectable } from '@angular/core';
import { ObjectUtils } from 'primeng/utils';
import { SmzEditableType } from '../models/editable-types';
import { SmzTableState } from '../models/table-state';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { SmzTableColumn } from '../models/table-column';

// SERVIÇO COM INSTANCIAS DIFERENTES POR TABELA
@Injectable()
export class TableFormsService {

    // BINDING DO STATE ORIGINAL DA TABELA
    public state: SmzTableState;

    constructor() { }

    public createForm(row: any): UntypedFormGroup {
        const form: UntypedFormGroup = new UntypedFormGroup({});

        // PERCORRER COLUNAS EDITÁVEIS
        this.state.columns
            .filter(c => c.editable.type !== SmzEditableType.NONE)
            .forEach(col => {

                // VALOR
                const value = ObjectUtils.resolveFieldData(row, col.editable.property);

                // CRIAR VALIDADORES COM BASE NA CONFIGURAÇÃO DA COLUNA
                const validators = this.getValidators(col);

                // CRIAR CONTROL
                form.addControl(col.editable.property, new UntypedFormControl(value, validators));
            });

        // console.log('form', form);

        return form;

    }

    private getValidators(col: SmzTableColumn): any[]
    {
        const results = [];

        if (col.editable.validatorsPreset.isRequired) results.push(Validators.required);
        if (col.editable.validatorsPreset.max) results.push(Validators.max(col.editable.validatorsPreset.max));
        if (col.editable.validatorsPreset.maxLength) results.push(Validators.maxLength(col.editable.validatorsPreset.maxLength));
        if (col.editable.validatorsPreset.min) results.push(Validators.min(col.editable.validatorsPreset.min));
        if (col.editable.validatorsPreset.minLength) results.push(Validators.minLength(col.editable.validatorsPreset.minLength));

        return results;
    }

}