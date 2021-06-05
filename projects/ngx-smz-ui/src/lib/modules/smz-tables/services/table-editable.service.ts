import { ChangeDetectorRef, EventEmitter, Injectable } from '@angular/core';
import { ObjectUtils } from 'primeng/utils';
import { isSimpleNamedEntity, setNestedObject } from '../../../common/utils/utils';
import { EditableChanges, EditableRowContext } from '../models/editable-model';
import { SmzEditableType } from '../models/editable-types';
import { SmzTableState } from '../models/table-state';
import { Table } from 'primeng/table';
import { SmzTransactionsService } from './smz-transactions.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { takeWhile } from 'rxjs/operators';

// SERVIÇO COM INSTANCIAS DIFERENTES POR TABELA
@Injectable()
export class TableEditableService {
    // CONTEXTO EDITÁVEL POR ROW
    public context: { [k: string]: EditableRowContext } = {};

    // BINDING DO STATE ORIGINAL DA TABELA
    public state: SmzTableState;

    // BINDING DO OUTPUT DE SALVAR DA TABELA
    public saveEvent: EventEmitter<any>;

    // BINDING DA INJEÇÃO DE DETECÇÃO DA TABELA
    public cdr: ChangeDetectorRef;

    constructor(private transactions: SmzTransactionsService, private fb: FormBuilder) { }

    public onRowEditInit(row: any): void {

        // INICIAR UM NOVO CONTEXTO DE EDIÇÃO
        const context: EditableRowContext = {
            transactionId: null,
            rowId: row.id,
            editing: {},
            original: {},
            hasChanged: false,
            errors: [],
            hasErrors: false,
            isLoading: false,
            form: this.createForm(row)
        };

        // COPIAR PROPRIEDADES EDITÁVEL NO CONTEXTO ORIGINAL E EDIÇÃO
        this.state.columns
            .filter(c => c.editable.type !== SmzEditableType.NONE)
            .forEach(col => {
                context.original[col.editable.property] = ObjectUtils.resolveFieldData(row, col.editable.property);
                context.editing[col.editable.property] = ObjectUtils.resolveFieldData(row, col.editable.property);
            });

        context.form.valueChanges
            .pipe(takeWhile(() => this.context[row.id] != null))
            .subscribe((event) => {

                for (let property of Object.keys(event)) {
                    // SETAR DADO MODIFICADO NA EDITING
                    setNestedObject(context.editing, property, event[property]);
                };

                this.onChanges(row.id);
            });

        // GUARDAR CONTEXTO CRIADO
        this.context[row.id] = context;
    }

    private createForm(row: any): FormGroup {
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

    public onChanges(rowId: string): void {
        // PEGAR CONTEXTO ATUAL
        const context = this.context[rowId];

        // DADOS ORIGINAIS
        const before = context.original;

        // DADOS MODIFICADOS
        const after = context.editing;

        // DESCOBRIR O QUE MUDOU
        const changes = this.getChanges(before, after);

        if (changes != null && Object.keys(changes).length === 0) {

            // PROPAGAR QUE OS DADOS MUDARAM
            this.context[rowId].hasChanged = false;
        }
        else {

            // PROPAGAR QUE NÃO TIVERAM MUDANÇAS
            this.context[rowId].hasChanged = true;
        }
    }

    public onRowEditSave(event: MouseEvent, table: Table, editableRowElement: any, row: any): void {

        // PEGAR CONTEXTO ATUAL
        const context = this.context[row.id];

        // ATIVAR LOADING DA ROW
        context.isLoading = true;

        // PROVOCAR ANGULAR CHANGE DETECTION
        this.cdr.markForCheck();

        // DADOS ORIGINAIS
        const before = context.original;

        // DADOS MDIFICADOS
        const after = context.editing;

        // DESCOBRIR O QUE MUDOU
        const changes = this.getChanges(before, after);

        let dispatchData = null;
        let params = null;

        // PERCORRER AS PROPRIEDADES QUE MUDARAM
        for (let changeKey of Object.keys(changes)) {

            const change = changes[changeKey];
            const action = this.state.editable.dispatch;

            for (let afterDataKey of Object.keys(change.after.data)) {
                // SETAR DADO MODIFICADO NA ROW
                setNestedObject(row, afterDataKey, change.after.data[afterDataKey]);
            };

            // MAPEAR PARAMETROS PARA A ACTION
            params = action.mapResults(row, change);

            // SE HABILITADO, CRIAR ACTION PARA DISPATCH NA STORE
            if (action.action != null) dispatchData = new action.action(params);
        }

        // PUBLICAR EVENTO DE OUTPUT SAVE DA TABELA
        this.saveEvent.emit(params);

        // INICIAR TRANSAÇÃO PARA SALVAR OS DADOS
        context.transactionId = this.transactions.add(
            dispatchData,
            () => {

                // SUCCESS

                // DESATIVAR LOADING
                context.isLoading = false;

                // SALVAR EDIÇÃO DA TABELA DO PRIME
                table.saveRowEdit(row, editableRowElement);

                // EVITAR PROPAGAÇÃO DO CLICK PARA OUTROS EVENTOS.
                event.stopPropagation();

                // PROVOCAR ANGULAR CHANGE DETECTION
                this.cdr.markForCheck();

                // REMOVER CONTEXTO DE EDIÇÃO PARA ESSA ROW
                delete this.context[row.id];
            },
            (errors: string[]) => {

                // FAILURE

                // DESATIVAR LOADING
                context.isLoading = false;

                // ATIVAR E PUBLICAR OS ERROS
                context.hasErrors = true;
                context.errors = errors;

                // PROVOCAR ANGULAR CHANGE DETECTION
                this.cdr.markForCheck();
            });

    }

    public onRowEditCancel(event: MouseEvent, table: Table, row: any): void {
        const context = this.context[row.id];

        // DADOS ORIGINAIS
        const before = context.original;

        // DADOS MDIFICADOS
        const after = context.editing;

        // DESCOBRIR O QUE MUDOU
        const changes = this.getChanges(before, after);

        // PERCORRER AS PROPRIEDADES QUE MUDARAM
        for (let changeKey of Object.keys(changes)) {

            const change = changes[changeKey];

            for (let beforeDataKey of Object.keys(change.before.data)) {
                // SETAR DADO ORIGINAL NA ROW
                setNestedObject(row, beforeDataKey, change.before.data[beforeDataKey]);
            };

        }

        // CANCELAR EDIÇÃO DA TABELA DO PRIME
        table.cancelRowEdit(row);

        // EVITAR PROPAGAÇÃO DO CLICK PARA OUTROS EVENTOS.
        event.stopPropagation();

        // PROVOCAR ANGULAR CHANGE DETECTION
        this.cdr.markForCheck();

        // REMOVER CONTEXTO DE EDIÇÃO PARA ESSA ROW
        delete this.context[row.id];
    }

    private getChanges(before: any, after: any): EditableChanges<any> {

        // CRIAR RESULTADO (SEM MUDANÇAS)
        let results: EditableChanges<any> = {};

        // PERCORRER PROPRIEDADES
        for (let key of Object.keys(before)) {

            // DEFINIR SE O OBJECTO É SIMPLENAMED
            const isSimpleNamed = isSimpleNamedEntity(before[key]) || isSimpleNamedEntity(after[key]);

            // VALOR ORIGINAL
            const beforeValue = isSimpleNamed ? before[key].id : before[key];

            // VALOR ATUAL
            const afterValue = isSimpleNamed ? after[key].id : after[key];

            // SE OS VALORES MUDARAM
            if (beforeValue !== afterValue) {

                // REGISTRAR MUDANÇA NO RESULTADO
                results[key] = {
                    before: {
                        data: before,
                        propertyData: before[key],
                        value: beforeValue
                    },
                    after: {
                        data: after,
                        propertyData: after[key],
                        value: afterValue
                    }
                };
            }
        }

        return results;
    }

}