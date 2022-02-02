import { Pipe, PipeTransform } from '@angular/core';
import { TableHelperService } from '../services/table-helper.service';

@Pipe({
  name: 'sincronizeTable'
})

export class SmzSincronizeTablePipe implements PipeTransform {
  constructor(private tableHelper: TableHelperService) {}
  transform(items: any[], key: string): any[] {
    return this.tableHelper.sincronize(key, items);
  }

}