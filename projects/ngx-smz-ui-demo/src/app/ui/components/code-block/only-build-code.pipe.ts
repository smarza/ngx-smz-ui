import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'onlyBuildCode',
    standalone: false
})

export class OnlyBuildCodePipe implements PipeTransform {
  transform(value: string): any {

    if (value == null) return '';

    const code = value.toString();
    const begin = code.indexOf('{') + 2;

    const result = code.substr(begin, code.length - begin - 1);

    return result;

  }
}