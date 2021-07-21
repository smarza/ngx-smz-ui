import { ChangeDetectorRef, EventEmitter, Injectable } from '@angular/core';
import { ObjectUtils } from 'primeng/utils';
import { isSimpleNamedEntity, setNestedObject } from '../../../common/utils/utils';
import { EditableChanges, EditableRowContext } from '../models/editable-model';
import { SmzEditableType } from '../models/editable-types';
import { SmzTableContext, SmzTableState } from '../models/table-state';
import { Table } from 'primeng/table';
import { SmzTransactionsService } from './smz-transactions.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { takeWhile } from 'rxjs/operators';
import { UUID } from 'angular2-uuid';
import { Confirmable, removeElementFromArray } from 'ngx-smz-dialogs';
import { TableFormsService } from './table-forms.service';
import { Store } from '@ngxs/store';
import { AuthenticationSelectors } from 'ngx-rbk-utils';

// SERVIÇO COM INSTANCIAS DIFERENTES POR TABELA
@Injectable()
export class TableEditableService {

    // CONTEXTO EDITÁVEL POR ROW
    public context: { [k: string]: EditableRowContext } = {};

    // BINDING DO STATE ORIGINAL DA TABELA
    public state: SmzTableState;

    // BINDINGS DOS OUTPUTS PARA EVENTOS DA EDIÇÃO DA TABELA
    public createEvent: EventEmitter<any>;
    public updateEvent: EventEmitter<any>;
    public deleteEvent: EventEmitter<any>;

    // BINDING DA INJEÇÃO DE DETECÇÃO DA TABELA
    public cdr: ChangeDetectorRef;
    public isEditing = false;
    public isCreating = false;
    public isDeleting = false;

    constructor(private transactions: SmzTransactionsService, private formsService: TableFormsService, private store: Store) {
    }

    public setupAccess(): void {

        const creation = this.state.editable?.creation;
        if (creation != null) {
            const hasAccess = creation.accessClaim == null || this.store.selectSnapshot(AuthenticationSelectors.hasClaimAccess(creation.accessClaim));
            creation.isButtonDisabled = !hasAccess;
        }

        const update = this.state.editable?.update;
        if (update != null) {
            const hasAccess = update.accessClaim == null || this.store.selectSnapshot(AuthenticationSelectors.hasClaimAccess(update.accessClaim));
            update.isButtonDisabled = !hasAccess;
        }

        const remove = this.state.editable?.remove;
        if (remove != null) {
            const hasAccess = remove.accessClaim == null || this.store.selectSnapshot(AuthenticationSelectors.hasClaimAccess(remove.accessClaim));
            remove.isButtonDisabled = !hasAccess;
        }

    }

    public onRowCreateInit(table: Table, context: SmzTableContext): void {

        let creationValues = { id: UUID.UUID() };

        context.columns
            .filter(x => x.editable != null)
            .forEach(x => {
                creationValues[x.property] = x.editable.defaultCreationValue;
            });

        // ADICIONAR UM ITEM NOVO NA LISTA COM ID ÚNICO
        table.value.unshift(creationValues);

        // SINALIZAR EDIÇÃO NA TABELA DO PRIME PARA ELEMENTO CRIADO
        table.initRowEdit(table.value[0]);

        // CONFIGURAR ITEM NOVO PARA SER UM ELEMENTO CRIAÇÃO
        this.onRowEditInit(table.value[0], 'create');

        // ATIVAR FLAG DE CRIAÇÃO
        this.isCreating = true;

        // FORÇAR DETECÇÃO PARA A TABELA DO PRIME (ONPUSH)
        this.cdr.markForCheck();
    }

    @Confirmable('Tem certeza de que deseja excluir este item ?', 'Confirmação', true)
    public onRowRemove(event: MouseEvent, table: Table, row: any): void {

        // CONFIGURAR ITEM NOVO PARA SER UM ELEMENTO CRIAÇÃO
        this.onRowEditInit(row, 'delete');

        // PEGAR CONTEXTO ATUAL
        const context = this.context[row.id];

        // ATIVAR LOADING DA ROW
        context.isLoading = true;

        // PROVOCAR ANGULAR CHANGE DETECTION
        this.cdr.markForCheck();

        // ACTION DE EXCLUIR
        const action = this.state.editable.actions.remove;

        // ACTION INSTANCIADA COM PARAMETROS
        const dispatchData = new action(row.id);

        // PUBLICAR EVENTO DE OUTPUT SAVE DA TABELA
        this.deleteEvent.emit(row.id);

        // INICIAR TRANSAÇÃO PARA SALVAR OS DADOS
        context.transactionId = this.transactions.add(
            dispatchData,
            () => {

                // SUCCESS

                // DESATIVAR LOADING
                context.isLoading = false;

                // REMOVER ITEM DA TABELA
                removeElementFromArray(table.value, row.id);

                // EVITAR PROPAGAÇÃO DO CLICK PARA OUTROS EVENTOS.
                event.stopPropagation();

                // DESATIVAR FLAG DE EDIÇÃO
                this.isEditing = false;

                // PROVOCAR ANGULAR CHANGE DETECTION
                this.cdr.markForCheck();

                // REMOVER CONTEXTO DE EDIÇÃO PARA ESSA ROW
                delete this.context[row.id];

                // REMOVER CONTEXTO DA ROW
                delete row['_context'];

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

    public onRowEditInit(row: any, type: 'create' | 'update' | 'delete' = 'update'): void {

        // SINALIZAR SE A ROW SERÁ DE CRIAÇÃO OU EDIÇÃO
        row['_context'] = { isUpdating: type === 'update', isCreating: type === 'create', isDeleting: type === 'delete' };

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
            form: this.formsService.createForm(row)
        };

        // COPIAR PROPRIEDADES EDITÁVEL NO CONTEXTO ORIGINAL E EDIÇÃO
        this.state.columns
            .filter(c => c.editable.type !== SmzEditableType.NONE)
            .forEach(col => {
                context.original[col.editable.property] = ObjectUtils.resolveFieldData(row, col.editable.property);
                context.editing[col.editable.property] = ObjectUtils.resolveFieldData(row, col.editable.property);
            });

        // OUVIR ALTERAÇÕES NO FORM
        context.form.valueChanges
            .pipe(takeWhile(() => this.context[row.id] != null))
            .subscribe((event) => {

                for (let property of Object.keys(event)) {
                    // SETAR DADO MODIFICADO NA EDITING
                    setNestedObject(context.editing, property, event[property]);
                };

                // VERIFICAR SE HOUVERAM MUDANÇAS
                this.checkForChanges(row.id);
            });

        // GUARDAR CONTEXTO CRIADO
        this.context[row.id] = context;

        // ATIVAR FLAG DE EDIÇÃO OU CRIAÇÃO
        this.isEditing = type === 'update';
        this.isCreating = type === 'create';
        this.isDeleting = type === 'delete';

        // PROVOCAR ANGULAR CHANGE DETECTION
        this.cdr.markForCheck();

    }

    public checkForChanges(rowId: string): void {

        // PEGAR CONTEXTO ATUAL
        const context = this.context[rowId];

        // DADOS ORIGINAIS
        const before = context.original;

        // DADOS MODIFICADOS
        const after = context.editing;

        // DESCOBRIR O QUE MUDOU
        const changes = this.getChanges(rowId, before, after);

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
        const changes = this.getChanges(row.id, before, after);

        // PERCORRER AS PROPRIEDADES QUE MUDARAM
        for (let changeKey of Object.keys(changes)) {

            const change = changes[changeKey];

            for (let afterDataKey of Object.keys(change.after.data)) {
                // SETAR DADO MODIFICADO NA ROW
                setNestedObject(row, afterDataKey, change.after.data[afterDataKey]);
            };

        }

        // MAPEAR PARAMETROS PARA A ACTION
        const params = this.state.editable.mapResults(row, changes);

        // ACTION DE UPDATE
        const action = this.state.editable.actions.update;

        // SE HABILITADO, CRIAR ACTION PARA DISPATCH NA STORE
        const dispatchData = new action(params);

        // PUBLICAR EVENTO DE OUTPUT SAVE DA TABELA
        this.updateEvent.emit(params);

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

                // DESATIVAR FLAG DE EDIÇÃO
                this.isEditing = false;

                // PROVOCAR ANGULAR CHANGE DETECTION
                this.cdr.markForCheck();

                // REMOVER CONTEXTO DE EDIÇÃO PARA ESSA ROW
                delete this.context[row.id];

                // REMOVER CONTEXTO DA ROW
                delete row['_context'];

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

    public onRowCreateSave(event: MouseEvent, table: Table, editableRowElement: any, row: any): void {

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
        const changes = this.getChanges(row.id, before, after);

        // PERCORRER AS PROPRIEDADES QUE MUDARAM
        for (let changeKey of Object.keys(changes)) {

            const change = changes[changeKey];

            for (let afterDataKey of Object.keys(change.after.data)) {
                // SETAR DADO MODIFICADO NA ROW
                setNestedObject(row, afterDataKey, change.after.data[afterDataKey]);
            };

        }

        // ACTION DE CRIAÇÃO
        const action = this.state.editable.actions.creation;

        // MAPEAR PARAMETROS PARA A ACTION
        const params = this.state.editable.mapResults(row, changes);

        // SE HABILITADO, CRIAR ACTION PARA DISPATCH NA STORE
        const dispatchData = new action(params);

        // PUBLICAR EVENTO DE OUTPUT SAVE DA TABELA
        this.createEvent.emit(params);

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

                // DESATIVAR FLAG DE CRIAÇÃO
                this.isCreating = false;

                // PROVOCAR ANGULAR CHANGE DETECTION
                this.cdr.markForCheck();

                // REMOVER CONTEXTO DE EDIÇÃO PARA ESSA ROW
                delete this.context[row.id];

                // REMOVER CONTEXTO DA ROW
                delete row['_context'];

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
        const changes = this.getChanges(row.id, before, after);

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

        // DESATIVAR FLAG DE EDIÇÃO
        this.isEditing = false;

        // PROVOCAR ANGULAR CHANGE DETECTION
        this.cdr.markForCheck();

        // REMOVER CONTEXTO DE EDIÇÃO PARA ESSA ROW
        delete this.context[row.id];

        // REMOVER CONTEXTO DA ROW
        delete row['_context'];
    }

    public onRowCreateCancel(event: MouseEvent, table: Table, row: any): void {

        // REMOVER ITEM DE CRIAÇÃO DA LISTA DA TABELA
        removeElementFromArray(table.value, row.id);

        // EVITAR PROPAGAÇÃO DO CLICK PARA OUTROS EVENTOS.
        event.stopPropagation();

        // DESATIVAR FLAG DE CRIAÇÃO
        this.isCreating = false;

        // PROVOCAR ANGULAR CHANGE DETECTION
        this.cdr.markForCheck();

        // REMOVER CONTEXTO DE EDIÇÃO PARA ESSA ROW
        delete this.context[row.id];

    }
    private getChanges(id: string, before: any, after: any): EditableChanges<any> {

        // CRIAR RESULTADO (SEM MUDANÇAS)
        let results: EditableChanges<any> = {};

        // PERCORRER PROPRIEDADES
        for (let key of Object.keys(before)) {

            // DEFINIR SE O OBJECTO É SIMPLENAMED
            const isSimpleNamed = isSimpleNamedEntity(before[key]) || isSimpleNamedEntity(after[key]);

            // VALOR ORIGINAL
            const beforeValue = isSimpleNamed ? before[key]?.id : before[key];

            // VALOR ATUAL
            const afterValue = isSimpleNamed ? after[key].id : after[key];

            // SE OS VALORES MUDARAM
            if (beforeValue !== afterValue) {

                // REGISTRAR MUDANÇA NO RESULTADO
                results[key] = {
                    id: id,
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