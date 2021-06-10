import { Injectable } from '@angular/core';
import { ObjectUtils } from 'primeng/utils';
import { SmzEditableType } from '../models/editable-types';
import { SmzTableState } from '../models/table-state';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// SERVIÇO COM INSTANCIAS DIFERENTES POR TABELA
@Injectable()
export class TableFormsService {

    // BINDING DO STATE ORIGINAL DA TABELA
    public state: SmzTableState;

    constructor() { }

    public createForm(row: any): FormGroup {
        const form: FormGroup = new FormGroup({});

        // PERCORRER COLUNAS EDITÁVEIS
        this.state.columns
            .filter(c => c.editable.type !== SmzEditableType.NONE)
            .forEach(col => {

                // VALOR
                const value = ObjectUtils.resolveFieldData(row, col.editable.property);

                // CRIAR CONTROL
                form.addControl(col.editable.property, new FormControl(value, Validators.required));
            });

        return form;
    }

}