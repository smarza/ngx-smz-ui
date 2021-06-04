
export interface EditableChanges<T>
{
    [key: string]: EditableChangeTrack<T>
}

export interface EditableChangeTrack<T>
{
    before: EditableChangesData<T>,
    after: EditableChangesData<T>
}

export interface EditableChangesData<T>
{
    data: T;
    propertyData: any;
    value: string | number | boolean | Date;
}

export interface EditableSaveActions<T>
{
    [key: string]: { action: any, mapResults: (data: T, change: EditableChangeTrack<T>) => any }
}

export interface EditableProperties
{
    [key: string]: { actionKey: string }
}

export interface EditableDispatch
{
    key: string;
    dispatchAction: any;
}

export interface EditableSaveEvent
{
    key: string;
    data: any;
}