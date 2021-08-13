export interface DatabaseStoreStateModel<T> {
    items: T[];
    lastUpdated: Date | null;
}

export const getInitialDatabaseStoreState = <T>(): DatabaseStoreStateModel<T> => ({
    items: [],
    lastUpdated: null
});