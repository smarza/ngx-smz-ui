import { Pipe, PipeTransform } from '@angular/core';
import { SmzTreeNode } from '../models/tree-node';
import { SmzTreeState } from '../models/tree-state';
import { TreeHelperService } from '../services/tree-helper.service';

@Pipe({
  name: 'dataTransformTree'
})

export class SmzDataTransformTreePipe implements PipeTransform {
  constructor(private treeHelper: TreeHelperService) {}
  transform(items: any[], state: SmzTreeState, key: string): any[] {

    if (state.content.dataTransform == null) {
      return this.response(items, state.content.sincronize, key);
    }
    else {
      return this.response(state.content.dataTransform(items), state.content.sincronize, key);
    }

  }

  private response(nodes: SmzTreeNode[], sincronize: boolean, key: string): SmzTreeNode[] {
    return sincronize ? this.treeHelper.sincronize(key, nodes): nodes;
  }

}