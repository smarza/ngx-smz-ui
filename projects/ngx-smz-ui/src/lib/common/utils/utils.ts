import { TreeNode } from 'primeng/api';
import { ObjectUtils } from 'primeng/utils';
import { SimpleNamedEntity } from '../models/simple-named-entity';
import { b64toBlob, handleBase64 } from './base64-helper';
import { HttpClient } from '@angular/common/http';
import { GlobalInjector } from '../services/global-injector';
import { environment } from '@environments/environment';

export function getFirst<T>(array: T[]) {
    return array == null || array.length === 0 ? null : array[0];
  }

export type CollectionPredicate = (item?: any, index?: number, collection?: any[]) => boolean;

export function isUndefined(value: any): value is undefined {
    return typeof value === 'undefined';
}

export function isNull(value: any): value is null {
    return value === null;
}

export function isConvertibleToNumber(value: string): boolean {
    if (value == null) {
        return false;
    }

    // Tenta converter a string para um número
    const convertedValue = Number(value);

    // Verifica se a conversão resultou em um valor NaN (não é número)
    // E também garante que o valor original não seja uma string vazia
    return !isNaN(convertedValue) && value?.toString().trim() !== '';
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

export function compareInsensitive(str1: string, str2: string): boolean {
    return str1?.toLocaleLowerCase() === str2?.toLocaleLowerCase();
}

export function compare(str1: string, str2: string): boolean {
    return str1 === str2;
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

export function replaceAll(string, search, replace) {
    return string.split(search).join(replace);
}

export function createObjectFromString(str: string, value: any, separator = '_', debug = false): any {
    const obj: any = {};
    // Caso queira ignorar partes vazias, use filter(Boolean)
    const props = str.split(separator).filter(Boolean);
    let currentObj = obj;
    for (let i = 0; i < props.length; i++) {
      const prop = props[i];
      currentObj[prop] = i === props.length - 1 ? value : {};
      if (debug) {
        console.log(`Após inserir '${prop}':`, obj);
      }
      currentObj = currentObj[prop];
    }
    return obj;
}

export function deepMerge(target: any, source: any): any {
    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        // Se ambos target e source possuem a propriedade como objeto, faz merge recursivamente
        if (
          typeof source[key] === 'object' && source[key] !== null &&
          target[key] && typeof target[key] === 'object'
        ) {
          deepMerge(target[key], source[key]);
        } else {
          // Caso contrário, atribui diretamente o valor
          target[key] = source[key];
        }
      }
    }
    return target;
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
    if (value == null)
        return '';

    const words = value?.toLowerCase().split(" ");

    return words.map((word) => {
        if (word?.length > charsLimit) {
            return word[0]?.toUpperCase() + word.substring(1).toLowerCase();
        }
        else {
            return word;
        }
    }).join(" ");

}

export function capitalizeWithSlash(value: string): string {
    return value?.replace(/\s+/g, '_')?.toUpperCase();
}

export function breakLinesForHtml(value: string): string {
    return value?.replace(/\n/g, '<br>');
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

export function sortArrayOfStrings<T>(data: T[], order = 1): T[] {
    return data.sort((obj1, obj2) => {
        if (obj1 > obj2) {
            return order;
        }
        if (obj1 < obj2) {
            return -order;
        }
        return 0;
    });
}

export function isSimpleNamedEntity(obj: any): boolean {
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

export function longestStringInArray(array: string[]): string {
    var max_str = array[0].length;
    var ans = array[0];
    for (var i = 1; i < array.length; i++) {
        var maxi = array[i].length;
        if (maxi > max_str) {
            ans = array[i];
            max_str = maxi;
        }
    }
    return ans;
}

export function debounce(func, wait, immediate?) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

export class Wait {
    throttlePause;
    debounceTimer;

    throttle = (callback, time) => {
        if (this.throttlePause) return;

        this.throttlePause = true;
        setTimeout(() => {
            callback();
            this.throttlePause = false;
        }, time);
    };

    debounce = (callback, time) => {
        window.clearTimeout(this.debounceTimer);
        this.debounceTimer = window.setTimeout(callback, time);
    };

    constructor() {

    }
}

export function downloadBase64File(base64: string, fileName: string, extension: string): void {
    handleBase64(b64toBlob(base64), `${fileName}.${extension}`);
}

export function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!
    return !isNaN(str as any) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }

export const base64ToFile = async (url, filename, mimeType) => {
    const res = await fetch(url);
    const buf = await res.arrayBuffer();
    return new File([buf], filename, { type: mimeType });
  };

export function getTreeNodeFromKey(elements: TreeNode[], key: string){

if (elements != null)
{
    var i;
    var result = null;

    for(i=0; result == null && i < elements.length; i++){
        result = searchTreeNode(elements[i], key);

        if (result != null) {
            return result;
        }
    }
}

return null;
}

function searchTreeNode(element, key){

if(element.key == key)
{
    return element;
}
else if (element.children != null)
{
    var i;
    var result = null;

    for(i=0; result == null && i < element.children.length; i++){
        result = searchTreeNode(element.children[i], key);
    }

    return result;
}

return null;
}

export function shorten(text: any, length: number = 0, suffix: string = '', wordBreak: boolean = true): string {
    if (!isString(text)) {
      return text;
    }

    if (text.length > length) {
      if (wordBreak) {
        return text.slice(0, length) + suffix;
      }

      // tslint:disable-next-line:no-bitwise
      if (!!~text.indexOf(' ', length)) {
        return text.slice(0, text.indexOf(' ', length)) + suffix;
      }
    }

    return text;
}

export function getFirstElement<T>(arr: T[] | null | undefined): T | undefined {
    return arr?.[0];
}


export function getFirstElements<T>(arr: T[], numElements: number): T[] {
    return arr?.slice(0, numElements);
}

export function getLastElements<T>(arr: T[], numElements: number): T[] {
    const startIndex = Math.max(0, arr.length - numElements);
    return arr?.slice(startIndex);
}

export function isNullOrEmptyString(str: string | null | undefined): boolean {
    return str === null || str === undefined || str.trim().length === 0;
}

export type GenericObject = {
    [key: string]: any;
  };

export function cloneAndRemoveProperty(item: any, propertyToRemove: string): any {
    const { [propertyToRemove]: _, ...clonedObject } = item;
    return clonedObject;
}

export function cloneAndRemoveProperties(item: any, propertiesToRemove: string[], log = false): any {

    let clonedObject = { ...item };

    for (const property of propertiesToRemove) {
      const { [property]: _, ...rest } = clonedObject;
      clonedObject = rest;
    }

    if (log) {
        console.log('-------------');
        console.log('propertyToRemove', propertiesToRemove);
        console.log('item', item);
        console.log('clonedObject', clonedObject);
        console.log('-------------');
    }

    return clonedObject;

}

export function toSimpleNamedEntity(item: any, idProperty: string = 'id', nameProperty: string = 'name'): SimpleNamedEntity {
    return { id: ObjectUtils.resolveFieldData(item, idProperty), name: ObjectUtils.resolveFieldData(item, nameProperty)};
}

export function downloadFromUrl(url: string, filename: string): void {
    const http: HttpClient = GlobalInjector.instance.get(HttpClient);

    http
        .get(url, { responseType: 'arraybuffer' })
        .subscribe(data => {
            const blob = new Blob([data]);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            link.click();
        });
}

export function downloadFromServerUrl(relativeUrl: string, filename: string): void {
    const http: HttpClient = GlobalInjector.instance.get(HttpClient);

    let path = environment.serverUrl;

    if (relativeUrl.startsWith("/")) {
        path = `${path}${relativeUrl}`;
    }
    else {
        path = `${path}/${relativeUrl}`;
    }

    http
        .get(path, { responseType: 'arraybuffer' })
        .subscribe(data => {
            const blob = new Blob([data]);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            link.click();
        });
}