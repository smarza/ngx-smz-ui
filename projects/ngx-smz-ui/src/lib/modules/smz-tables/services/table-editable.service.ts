import { EventEmitter, Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { ObjectUtils } from 'primeng/utils';
import { isSimpleNamedEntity, setNestedObject } from '../../../common/utils/utils';
import { EditableDispatch, EditableChanges, EditableSaveEvent } from '../models/editable-model';
import { SmzEditableType } from '../models/editable-types';
import { SmzTableState } from '../models/table-state';

@Injectable()
export class TableEditableService {
    public originalCache: { [s: string]: any; } = {};
    public editingCache: { [s: string]: any; } = {};
    public state: SmzTableState;
    public saveEvent: EventEmitter<any>;

    constructor(private store: Store) {
    }

    public onRowEditInit(row: any): void {
        this.originalCache[row.id] = {};
        this.editingCache[row.id] = {};

        this.state.columns
            .filter(c => c.editable.type !== SmzEditableType.NONE)
            .forEach(col => {
                this.originalCache[row.id][col.editable.property] = ObjectUtils.resolveFieldData(row, col.editable.property);
                this.editingCache[row.id][col.editable.property] = ObjectUtils.resolveFieldData(row, col.editable.property);
            });
    }

    public onRowEditSave(row: any): void {

        const actions = this.state.actions.editable.actions;

        const before = this.originalCache[row.id];
        const after = this.editingCache[row.id];

        // console.log('before', before);
        // console.log('after', after);

        const changes = this.getChanges(before, after);

        const dispatchs: EditableDispatch[] = [];
        const saveEvents: EditableSaveEvent[] = [];

        for (let changeKey of Object.keys(changes)) {
            const actionLink = this.state.columns.find(x => x.editable.type !== SmzEditableType.NONE && x.field === changeKey)?.editable.actionLink;

            if (actionLink != null) {

                const change = changes[changeKey];
                const action = actions[actionLink];

                for (let afterDataKey of Object.keys(change.after.data)) {
                    setNestedObject(row, afterDataKey, change.after.data[afterDataKey]);
                };

                const params = action.mapResults(row, change);

                if (this.state.actions.editable.saveMethod == 'dispatch') {

                    if (action != null) {

                        const matchIndex = dispatchs.findIndex(x => x.key === actionLink);

                        if (matchIndex !== -1) {
                            // REPLACE DISPATCH
                            dispatchs[matchIndex] = { key: actionLink, dispatchAction: new action.action(params) };
                        }
                        else {
                            // ADD NEW DISPATCH
                            dispatchs.push({ key: actionLink, dispatchAction: new action.action(params) });
                        }

                    }
                }
                else {

                    const matchIndex = saveEvents.findIndex(x => x.key === actionLink);

                    if (matchIndex !== -1) {
                        // REPLACE DISPATCH
                        saveEvents[matchIndex] = { key: actionLink, data: params };
                    }
                    else {
                        // ADD NEW DISPATCH
                        saveEvents.push({ key: actionLink, data: params });
                    }

                }

            }
        }

        // console.log('-----------');
        // console.log('dispatchs', dispatchs);
        // console.log('saveEvents', saveEvents);

        if (this.state.actions.editable.saveMethod == 'dispatch') {
            for (let dispatch of dispatchs) {
                this.store.dispatch(dispatch.dispatchAction);
            }
        }
        else {
            this.saveEvent.emit(saveEvents.length > 0 ? saveEvents[0].data : {});
        }

        delete this.originalCache[row.id];
    }

    public onRowEditCancel(row: any, index: number, items: any[]): void {
        // console.log('onRowEditCancel');
        // console.log('row', row);
        // console.log('index', index);
        // console.log('items', items);
        // console.log('item', items[index]);
        // console.log('editCache', this.originalCache[row.id]);

        const before = this.originalCache[row.id];
        const after = this.editingCache[row.id];

        // console.log('before', before);
        // console.log('after', after);

        delete this.originalCache[row.id];
        delete this.editingCache[row.id];
    }

    private getChanges(before: any, after: any): EditableChanges<any> {
        let changes: EditableChanges<any> = {};

        for (let key of Object.keys(before)) {
            const isSimpleNamed = isSimpleNamedEntity(before[key]) || isSimpleNamedEntity(after[key]);

            const beforeValue = isSimpleNamed ? before[key].id : before[key];
            const afterValue = isSimpleNamed ? after[key].id : after[key];

            if (beforeValue !== afterValue) {
                changes[key] = {
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

        return changes;
    }

}