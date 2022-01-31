import { Pipe, PipeTransform } from '@angular/core';
import { TreeHelperService } from '../services/tree-helper.service';

@Pipe({
  name: 'sincronizeTree'
})

export class SmzSincronizeTreePipe implements PipeTransform {
  constructor(private treeHelper: TreeHelperService) {}
  transform(items: any[], key: string): any[] {
    return this.treeHelper.sincronize(key, items);
  }

}