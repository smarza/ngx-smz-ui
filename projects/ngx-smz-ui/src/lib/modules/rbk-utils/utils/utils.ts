import { Store } from '@ngxs/store';
import { FormGroupConfig, SmzDialog } from 'ngx-smz-dialogs';
import { GlobalInjector } from '../misc/global.injector';
import { UiDefinitionsDbSelectors } from '../state/database/ui-definitions/ui-definitions.selectors';

/*
    Replaces an item in an array by its id property
*/
export function replaceArrayItem<T>(items: T[], newItem: T): T[] {
    const index = items.findIndex(x => (x as any).id === (newItem as any).id);

    if (index === -1) throw new Error('Elemento não encontrado no array');

    const result = [...items];
    result[index] = newItem;

    return result;
}

/*
    Checks wheter the current date is withing a time interval of
    X min after the specified date
*/
export function isWithinTime(date: Date, interval: number): boolean {
    return Date.now() < date.getTime() + interval * 60 * 1000;
}

/*
    Order the given array by a text property
*/
export function orderArrayByProperty(array: any[], property: string): any[] {
    return array.sort((a, b) => (a[property] as string).toLowerCase() > (b[property] as string).toLowerCase() ? 1 : -1);
}
/*
    Deep clone any dummy object
*/
export function deepClone<T>(object: T): T {
  return JSON.parse(JSON.stringify(object));
}
/*
    Checks if a string is null, undefined or empty
*/
export function isEmpty(str: string): boolean {
    return (!str || 0 === str.length);
}

/*
    Remove all items from an array
*/
export function clearArray<T>(array: T[]): void {
    for (const item of array) {
        array.pop();
    }
}

export function fixDateProperties(data: { [key: string]: any }) {
    if (data != null) {
        for (const key of Object.keys(data)) {
            if (typeof data[key] === 'string') {
                if (key.startsWith('date') || key.endsWith('Date') || key ==='birthdate') {
                    data[key] = fixStringDate(data[key]);
                }
                else if (key === 'lastUpdate') {
                  data[key] = fixStringDate(data[key]);
                }
                else if (key === 'timestamp') {
                  data[key] = fixStringDate(data[key]);
                }
                else if (key === 'lastUpdated') {
                  data[key] = fixStringDate(data[key]);
                }
            }
            else if (typeof data[key] === 'number') {
                if (key.startsWith('date') || key.endsWith('Date')) {
                    data[key] = fixEpochDate(data[key]);
                }
            }
            else if (typeof data[key] === 'object') {
                fixDateProperties(data[key]);
            }
        }
    }
}

function fixStringDate(originalDate: string): Date {
    const epochDate = Date.parse(originalDate);
    return new Date(epochDate);
}

function fixEpochDate(epochData: number): Date {
    if (epochData > 99999999999) { // timestamp miliseconds
        return new Date(epochData);
    }
    else { // timestamp seconds
        return new Date(epochData * 1000);
    }
}

export function fixDate(date: FormGroupConfig): Date {
    if (date == null) return null;

    if (typeof date === 'string') {
        return fixStringDate(date);
    }
    else if (typeof date === 'number') {
        return fixEpochDate(date);
    }
    else {
        throw new Error('fixDate(): unsuported date format.');
    }
}