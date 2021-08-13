import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeOneTab'
})

export class RemoveOneTabPipe implements PipeTransform {
  transform(value: string, count = 1): any {

    if (value == null) return '';

    const code = value.toString();

    let lines = code.split(/\n/);

    lines.forEach((l, i) => {

      for (let j = 0; j < count; j++) {
        lines[i] = lines[i].replace('    ', '');
      }

    });

    return lines.join('\n');

  }
}