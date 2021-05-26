import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SmzTreeBuilder, SmzTableState, SmzClipboardService, SmzFilterType, SmzTreeState } from 'ngx-smz-ui';
import { TreeNode } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-demo-trees',
  templateUrl: './demo-trees.component.html',
  providers: []
})

export class DemoTreesComponent implements OnInit {
  public items$: Observable<TreeNode[]>;
  public treeState: SmzTreeState;
  public loading = false;
  constructor(private http: HttpClient) {

    this.items$ = this.http.get<{data: TreeNode[]}>('assets/files.json').pipe(map(x => x.data));
  }

  ngOnInit() {
    this.setupTree();

    // setTimeout(() => {
    //   this.tableState = null;
    //   setTimeout(() => {
    //     this.setupTable();
    //   }, 2000);
    // }, 2000);
  }

  public setupTree(): void {

    this.treeState = new SmzTreeBuilder()
      .setTitle('My awesome tree')
      .menu()
        .caption('Novo')
          .item('Arquivo text')
            .setCallback(node => console.log('TEXT: ', node))
            .hideForTypes('file')
            .parent
          .item('Imagem')
            .setCallback(node => console.log('IMAGEN: ', node))
            .showForTypes('folder')
            .menu
        .separator()
        .item('Renomear')
          .setCallback(node => console.log('RENOMEAR: ', node))
          .showForTypes('file', 'folder')
          .menu
        .item('Excluir')
          .setCallback(node => console.log('EXCLUIR: ', node))
          .menu
        .tree
      .enableFilter()
      .toolbar('rounded-outlined')
        .setAlignment('end')
        .useTreeExpandButtons()
        .useNodeExpandButtons()
        .buttons()
          .button('', 'fas fa-coffee')
            .setCallback((data, node) => console.log('Button 1'))
            .setTooltip('Button 1 awesome tooltip')
            .setColor('danger')
            .buttons
          .button('', 'fas fa-hamburger')
            .setCallback((data, node) => console.log('Button 2'))
            .setTooltip('Button 2 awesome tooltip')
            .setColor('warning')
            .buttons
          .button('', 'fas fa-pizza-slice')
            .setCallback((data, node) => console.log('Button 3'))
            .setTooltip('Button 3 awesome tooltip')
            .setColor('success')
            .buttons
          .toolbar
        .tree
        .dragAndDrop()
          .canDrag('file').into('folder', 'disk')
          .canDrag('folder').into('disk', 'folder')
        .tree
      .build();
  }
}
