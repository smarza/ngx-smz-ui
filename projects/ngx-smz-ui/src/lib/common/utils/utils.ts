import { ObjectUtils } from 'primeng/utils';
import { mergeMap, of } from 'rxjs';
import { SimpleNamedEntity } from '../models/simple-named-entity';

export type CollectionPredicate = (item?: any, index?: number, collection?: any[]) => boolean;

export function isUndefined(value: any): value is undefined {
    return typeof value === 'undefined';
}

export function isNull(value: any): value is null {
    return value === null;
}

export function isNumber(value: any): value is number {
    return typeof value === 'number';
}

export function isNumberFinite(value: any): value is number {
    return isNumber(value) && isFinite(value);
}

// Not strict positive
export function isPositive(value: number): boolean {
    return value >= 0;
}

export function isInteger(value: number): boolean {
    // No rest, is an integer
    return value % 1 === 0;
}

export function isNil(value: any): value is null | undefined {
    return value === null || typeof value === 'undefined';
}

export function isString(value: any): value is string {
    return typeof value === 'string';
}

export function isObject(value: any): boolean {
    return value !== null && typeof value === 'object';
}

export function isArray(value: any): boolean {
    return Array.isArray(value);
}

export function isFunction(value: any): boolean {
    return typeof value === 'function';
}

export function toDecimal(value: number, decimal: number): number {
    return Math.round(value * Math.pow(10, decimal)) / Math.pow(10, decimal);
}

export function upperFirst(value: string): string {
    return value.slice(0, 1).toUpperCase() + value.slice(1);
}

export function createRound(method: string): Function {
    // <any>Math to suppress error
    const func: any = (<any>Math)[method];
    return function (value: number, precision: number = 0) {
        if (typeof value === 'string') {
            throw new TypeError('Rounding method needs a number');
        }

        if (typeof precision !== 'number' || isNaN(precision)) {
            precision = 0;
        }

        if (precision) {
            let pair = `${value}e`.split('e');
            const val = func(`${pair[0]}e` + (+pair[1] + precision));

            pair = `${val}e`.split('e');
            return +(pair[0] + 'e' + (+pair[1] - precision));
        }

        return func(value);
    };
}

export function leftPad(str: string, len: number = 0, ch: any = ' ') {
    str = String(str);
    ch = toString(ch);
    let i = -1;
    const length = len - str.length;

    while (++i < length && str.length + ch.length <= len) {
        str = ch + str;
    }

    return str;
}

export function rightPad(str: string, len: number = 0, ch: any = ' ') {
    str = String(str);
    ch = toString(ch);

    let i = -1;
    const length = len - str.length;

    while (++i < length && str.length + ch.length <= len) {
        str += ch;
    }

    return str;
}

export function toString(value: number | string) {
    return `${value}`;
}

export function pad(str: string, len: number = 0, ch: any = ' '): string {
    str = String(str);
    ch = toString(ch);
    let i = -1;
    const length = len - str.length;

    let left = true;
    while (++i < length) {
        const l = str.length + ch.length <= len ? str.length + ch.length : str.length + 1;

        if (left) {
            str = leftPad(str, l, ch);
        } else {
            str = rightPad(str, l, ch);
        }

        left = !left;
    }

    return str;
}

export function flatten(input: any[], index: number = 0): any[] {
    if (index >= input.length) {
        return input;
    }

    if (isArray(input[index])) {
        return flatten(input.slice(0, index).concat(input[index], input.slice(index + 1)), index);
    }

    return flatten(input, index + 1);
}

export function getProperty(value: { [key: string]: any }, key: string): any {
    if (isNil(value) || !isObject(value)) {
        return undefined;
    }

    const keys: string[] = key.split('.');
    let result: any = value[keys.shift()!];

    for (const key of keys) {
        if (isNil(result) || !isObject(result)) {
            return undefined;
        }

        result = result[key];
    }

    return result;
}

export function sum(input: Array<number>, initial = 0): number {
    return input.reduce((previous: number, current: number) => previous + current, initial);
}

// http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
export function shuffle(input: any): any {
    if (!isArray(input)) {
        return input;
    }

    const copy = [...input];

    for (let i = copy.length; i; --i) {
        const j = Math.floor(Math.random() * i);
        const x = copy[i - 1];
        copy[i - 1] = copy[j];
        copy[j] = x;
    }

    return copy;
}

export function deepIndexOf(collection: any[], value: any) {
    let index = -1;
    const length = collection.length;

    while (++index < length) {
        if (deepEqual(value, collection[index])) {
            return index;
        }
    }

    return -1;
}

export function deepEqual(a: any, b: any) {
    if (a === b) {
        return true;
    }

    if (!(typeof a === 'object' && typeof b === 'object')) {
        return a === b;
    }

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) {
        return false;
    }

    // Test for A's keys different from B.
    var hasOwn = Object.prototype.hasOwnProperty;
    for (let i = 0; i < keysA.length; i++) {
        const key = keysA[i];
        if (!hasOwn.call(b, keysA[i]) || !deepEqual(a[key], b[key])) {
            return false;
        }
    }

    return true;
}

export function isDeepObject(object: any) {
    return object.__isDeepObject__;
}

export function wrapDeep(object: any) {
    return new DeepWrapper(object);
}

export function unwrapDeep(object: any) {
    if (isDeepObject(object)) {
        return object.data;
    }

    return object;
}

export class DeepWrapper {
    public __isDeepObject__: boolean = true;

    constructor(public data: any) { }
}

export function count(input: any): any {
    if (!isArray(input) && !isObject(input) && !isString(input)) {
        return input;
    }

    if (isObject(input)) {
        return Object.keys(input).map(value => input[value]).length;
    }

    return input.length;
}

export function empty(input: any): any {
    if (!isArray(input)) {
        return input;
    }

    return input.length === 0;
}

export function every(input: any, predicate: CollectionPredicate) {
    if (!isArray(input) || !predicate) {
        return input;
    }

    let result = true;
    let i = -1;

    while (++i < input.length && result) {
        result = predicate(input[i], i, input);
    }

    return result;
}

export function takeUntil(input: any[], predicate: CollectionPredicate) {
    let i = -1;
    const result: any = [];
    while (++i < input.length && !predicate(input[i], i, input)) {
        result[i] = input[i];
    }

    return result;
}

export function takeWhile(input: any[], predicate: CollectionPredicate) {
    return takeUntil(input, (item: any, index: number, collection: any[]) => !predicate(item, index, collection));
}

export function replaceItem<T>(items: T[], newItem: T): T[] {
    const index = items.findIndex(x => (x as any).id === (newItem as any).id);

    if (index === -1) throw new Error('Elemento não encontrado no array');

    const result = [...items];
    result[index] = newItem;

    return result;
}

export function uuidv4(): string {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export function capitalizeFirstLetter(value: string, charsLimit = 0): string {
    // console.log('-----');
    const words = value.toLowerCase().split(" ");
    // console.log(value, words);

    return words.map((word) => {
        if (word?.length > charsLimit) {
            return word[0].toUpperCase() + word.substring(1).toLowerCase();
        }
        else {
            return word;
        }
    }).join(" ");

}

export function removeElementFromArray(arr: any[], value: string, prop?: string): void {
    const property = prop != null ? prop : 'id';

    const index = arr.findIndex(i => i[property] === value);

    if (index >= 0) {
        arr.splice(index, 1);
    }
}

export function sortArray<T>(data: T[], property: string, order = 1): T[] {
    return data.sort((obj1, obj2) => {
        if (Reflect.get(obj1 as Object, property) > Reflect.get(obj2 as Object, property)) {
            return order;
        }
        if (Reflect.get(obj1 as Object, property) < Reflect.get(obj2 as Object, property)) {
            return -order;
        }
        return 0;
    });
}

export function sortArrayOfObjects<T>(data: T[], dataPath: string, order = 1): T[] {
    return data.sort((obj1, obj2) => {
        if (ObjectUtils.resolveFieldData(obj1, dataPath) > ObjectUtils.resolveFieldData(obj2, dataPath)) {
            return order;
        }
        if (ObjectUtils.resolveFieldData(obj1, dataPath) < ObjectUtils.resolveFieldData(obj2, dataPath)) {
            return -order;
        }
        return 0;
    });
}

export function isSimpleNamedEntity(obj: SimpleNamedEntity): boolean {
    if (obj == null) return false;

    return (obj.id != null && obj.name != null);
}

export function setNestedObject(obj, path, value) {
    var schema = obj;  // a moving reference to internal objects within obj
    var pList = path.split('.');
    var len = pList.length;
    for (var i = 0; i < len - 1; i++) {
        var elem = pList[i];
        if (!schema[elem]) schema[elem] = {}
        schema = schema[elem];
    }

    schema[pList[len - 1]] = value;
}