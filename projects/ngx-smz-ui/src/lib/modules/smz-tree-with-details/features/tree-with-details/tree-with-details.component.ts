import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, TemplateRef, AfterContentInit, ContentChildren, QueryList, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { PrimeTemplate, TreeNode } from 'primeng/api';
import { SmzTreeNode } from '../../../smz-trees/models/tree-node';
import { SmzTreeWithDetailsState } from '../../models/tree-with-details-state';

@Component({
  selector: 'smz-ui-tree-with-details',
  templateUrl: './tree-with-details.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'absolute inset-0 p-10' },
})
export class SmzTreeWithDetailsComponent implements OnInit, AfterContentInit {
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  @Input() public state: SmzTreeWithDetailsState;
  @Output() public selectionChange = new EventEmitter<SmzTreeNode>();
  @Output() public detailsChange = new EventEmitter<SmzTreeNode>();
  public detailsTemplate: TemplateRef<any>;
  public emptySelectionTemplate: TemplateRef<any>;
  public headerTemplate: TemplateRef<any>;
  public contentTemplates: { type: string, template: TemplateRef<any> }[] = [];

  constructor(public cdr: ChangeDetectorRef) {
  }

  public ngOnInit(): void {
  }

  public ngAfterContentInit() {

    this.templates.forEach((item) => {

      const templateName = item.getType();
      if (templateName.includes('type')) {
        const type = templateName.split(':')[1];

        this.contentTemplates.push({
          type,
          template: item.template
        });
      }
      else {

        switch (templateName) {

          case 'details':
            this.detailsTemplate = item.template;
            break;

          case 'EmptySelection':
            this.emptySelectionTemplate = item.template;
            break;

          case 'header':
            this.headerTemplate = item.template;
            break;

        }

        console.log(this.contentTemplates);

      }

    });
  }

  public selectionChanged(node: TreeNode): void {
    if (this.state.tree.selectableTypes.some(x => x === node?.type)) {
      this.state.context.selectedNode = node;
      this.detailsChange.emit(this.state.context.selectedNode);
    }
    else {
      this.state.context.selectedNode = null;
    }

    this.selectionChange.emit(this.state.context.selectedNode);
  }

}
