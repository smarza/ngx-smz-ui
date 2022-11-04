import { Pipe, PipeTransform } from '@angular/core';
import { SmzTreeNode } from '../models/tree-node';
import { SmzTreeState } from '../models/tree-state';
import { TreeHelperService } from '../services/tree-helper.service';

@Pipe({
  name: 'dataTransformTree'
})

export class SmzDataTransformTreePipe implements PipeTransform {
  constructor(private treeHelper: TreeHelperService) {}
  transform(items: any[], state: SmzTreeState, key: string, that: any): any[] {

    const bindedItems = [];

    if (state.content.dataTransform == null) {
      bindedItems.push(...this.response(items, state.content.sincronize, key));
    }
    else {
      bindedItems.push(...this.response(state.content.dataTransform(items), state.content.sincronize, key));
    }

    that.sincronizeItems(bindedItems);

    return bindedItems;

  }

  private response(nodes: SmzTreeNode[], sincronize: boolean, key: string): SmzTreeNode[] {
    return sincronize ? this.treeHelper.sincronize(key, nodes): nodes;
  }

}