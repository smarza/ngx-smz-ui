import { NgModule } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { TreeNode } from 'primeng/api';

@Pipe({
  standalone: false,
  name: 'demoTitle'
})

export class DemoTitlePipe implements PipeTransform {
  transform(node: TreeNode): string {

    const response: string[] = [];

    response.push(node.label);
    this.getParentLabelRecursivally(node, response);

    return response.reduceRight((a, c) => `${a} > ${c}`);
  }

  private getParentLabelRecursivally(node: TreeNode, response: string[]): void
  {
    if (node.parent != null) {
      response.push(node.parent.label);
      this.getParentLabelRecursivally(node.parent, response);
    }
  }
}

@NgModule({
  imports: [],
  exports: [DemoTitlePipe],
  declarations: [DemoTitlePipe],
  providers: [],
})
export class DemoTitlePipeModule { }
