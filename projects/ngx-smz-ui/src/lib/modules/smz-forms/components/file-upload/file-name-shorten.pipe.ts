import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'fileNameShorten',
    standalone: false
})

export class FileNameShortenPipe implements PipeTransform {
  transform(value: string, length: number, separator: string): any {

    if (length == null || value == null || value.length <= length) return value;

    separator = separator || '...';

    var sepLen = separator.length,
        charsToShow = length - sepLen,
        frontChars = Math.ceil(charsToShow/2),
        backChars = Math.floor(charsToShow/2);

    return value.substr(0, frontChars) +
           separator +
           value.substr(value.length - backChars);

  }
}
