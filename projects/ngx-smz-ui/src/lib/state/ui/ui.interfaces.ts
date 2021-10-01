export interface UiStoreStateModel<T> {
    items: T[];
    lastUpdated: Date | null;
}

export const getInitialUiStoreState = <T>(): UiStoreStateModel<T> => ({
    items: [],
    lastUpdated: null
});