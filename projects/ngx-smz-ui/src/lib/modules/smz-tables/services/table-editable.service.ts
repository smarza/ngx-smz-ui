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
    public hasChangedTracking: { [s: string]: boolean; } = {};
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
                this.hasChangedTracking[row.id] = false;
            });
    }

    public onChanges(row: any): void {
        const before = this.originalCache[row.id];
        const after = this.editingCache[row.id];
        const changes = this.getChanges(before, after);

        if (changes != null && Object.keys(changes).length === 0) {
            this.hasChangedTracking[row.id] = false;
        }
        else {
            this.hasChangedTracking[row.id] = true;
        }
    }

    public onRowEditSave(row: any): void {

        const before = this.originalCache[row.id];
        const after = this.editingCache[row.id];

        // console.log('before', before);
        // console.log('after', after);

        const changes = this.getChanges(before, after);

        let dispatchData = null;
        let params = null;

        console.log('changes', changes);

        for (let changeKey of Object.keys(changes)) {

                const change = changes[changeKey];
                const action = this.state.editable.dispatch;

                for (let afterDataKey of Object.keys(change.after.data)) {
                    setNestedObject(row, afterDataKey, change.after.data[afterDataKey]);
                };

                params = action.mapResults(row, change);
                if (action.action != null) dispatchData = new action.action(params);
        }

        // console.log('-----------');
        // console.log('dispatchs', dispatchs);
        // console.log('saveEvents', saveEvents);

        if (this.state.editable.dispatch.action != null) {
            this.store.dispatch(dispatchData);
        }
        else {
            this.saveEvent.emit(params);
        }

        delete this.originalCache[row.id];
        delete this.editingCache[row.id];
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
        delete this.hasChangedTracking[row.id];
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