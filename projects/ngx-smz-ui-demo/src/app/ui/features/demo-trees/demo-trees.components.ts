import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SmzTreeBuilder, SmzTableState, SmzClipboardService, SmzFilterType, SmzTreeState } from 'ngx-smz-ui';
import { TreeNode } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Component({
    selector: 'app-demo-trees',
    templateUrl: './demo-trees.component.html',
    providers: [],
    standalone: false
})

export class DemoTreesComponent implements OnInit {
  public items$: Observable<TreeNode[]>;
  public treeState: SmzTreeState;
  public loading = false;
  public selectionIds: string[] = [];
  constructor(private http: HttpClient) {

    this.items$ = this.http
      .get<{data: TreeNode[]}>('assets/tree-profiles.json')
      .pipe(
        map(x => x.data),
        tap(x => {
          this.selectionIds = ['0eafdff0-9257-47a0-a886-08dbdabbcc83', '3cea3867-43f9-4546-a887-08dbdabbcc83'];
        })
        );
  }

  ngOnInit() {
    this.setupTree();
  }

  public setupTree(): void {

    this.treeState = new SmzTreeBuilder()
      .setTitle('My awesome tree')
      .setSelection('checkbox')
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
        .buttons()
          .button('', 'fa-solid fa-mug-saucer')
            .setCallback((event, data, node) => console.log(event))
            .setTooltip('Button 1 awesome tooltip')
            .setColor('danger')
            .buttons
          .button('', 'fa-solid fa-burger')
            .setCallback((event, data, node) => console.log('Button 2'))
            .setTooltip('Button 2 awesome tooltip')
            .setColor('warning')
            .buttons
          .button('', 'fa-solid fa-pizza-slice')
            .setCallback((event, data, node) => console.log('Button 3'))
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