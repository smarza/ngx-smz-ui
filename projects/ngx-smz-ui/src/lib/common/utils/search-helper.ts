import { ObjectUtils } from 'primeng/utils';

export function GlobalFilter<T>(array: T[], search: string, propertyPaths: string[], matchMode: 'contain'): T[] {

  const searchWords: string[] = ObjectUtils.removeAccents(search.toString()).toLocaleLowerCase().split(' ');

  const results = [];

  array.forEach(item => {
    propertyPaths.forEach(property => {
      const value = ObjectUtils.resolveFieldData(item, property);
      const match = searchWords.some(word => {

        switch (matchMode) {
          case 'contain':
            return FilterContains(value, word);

          default:
            return false;
        }

      });
      if (match) {
        results.push(item);
      }
    });
  });

  return results;
}

export function FilterContains(value: any, filter: any, filterLocale?: any): boolean {
  if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
    return true;
  }

  if (value === undefined || value === null) {
    return false;
  }

  const filterValue = filter; // ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
  const stringValue = ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);

  return stringValue.indexOf(filterValue) !== -1;
}