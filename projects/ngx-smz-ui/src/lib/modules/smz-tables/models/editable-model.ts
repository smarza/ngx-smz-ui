import { isSimpleNamedEntity } from '../../../common/utils/utils';
import { FormGroup } from '@angular/forms';

export interface EditableRowContext {
    transactionId: string;
    rowId: string;
    original: any;
    editing: any;
    hasChanged: boolean;
    isLoading: boolean;
    hasErrors: boolean;
    errors: string[];
    form: FormGroup;
 }

export interface EditableChanges<T>
{
    [key: string]: EditableChangeTrack<T>
}

export interface EditableChangeTrack<T>
{
    id: string;
    before: EditableChangesData<T>,
    after: EditableChangesData<T>
}

export interface EditableChangesData<T>
{
    data: T;
    propertyData: any;
    value: string | number | boolean | Date;
}

export interface EditableSaveEvent
{
    key: string;
    data: any;
}

export function defaultMapResults(data: any, changes: EditableChanges<any>) {

    // console.log('defaultMapResults');
    // console.log('data', data);
    // console.log('change', change);

    const result = {};

    const after = data;

    for (let key of Object.keys(after))
    {

        const isSimpleNamed = isSimpleNamedEntity(after[key]);

        if (isSimpleNamed) {
            result[`${key}Id`] = after[key].id;
        }
        else {
            result[key] = after[key];
        }

    }

    return { id: data.id, ...result };
};