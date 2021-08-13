import { FormGroupConfig } from './dialog-input-conversion';

/*
    Checks if a string is null, undefined or empty
*/
export function isEmpty(str: string): boolean {
  return (!str || 0 === str.length);
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

