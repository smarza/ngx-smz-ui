import { Pipe, PipeTransform } from '@angular/core';
import { SmzTreeNode } from '../models/tree-node';
import { SmzTreeSourceTransform } from '../models/tree-state';
import { TreeHelperService } from '../services/tree-helper.service';

@Pipe({
    name: 'dataTransformTree',
    standalone: false
})

export class SmzDataTransformTreePipe implements PipeTransform {
  constructor(private treeHelper: TreeHelperService) {}
  transform(items: any[], isDebug: boolean, content: SmzTreeSourceTransform, key: string, that: any): any[] {

    const bindedItems = [];

    if (content.dataTransform == null) {
      bindedItems.push(...this.response(items, content.sincronize, key));
    }
    else {
      bindedItems.push(...this.response(content.dataTransform(items), content.sincronize, key));
    }

    that.sincronizeItems(bindedItems);

    if (isDebug) {
      console.log('SmzDataTransformTreePipe', bindedItems);
    }

    return bindedItems;

  }

  private response(nodes: SmzTreeNode[], sincronize: boolean, key: string): SmzTreeNode[] {
    return sincronize ? this.treeHelper.sincronize(key, nodes): nodes;
  }

}