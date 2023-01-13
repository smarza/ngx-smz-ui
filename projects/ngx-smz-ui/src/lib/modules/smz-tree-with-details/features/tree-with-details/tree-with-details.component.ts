import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, TemplateRef, AfterContentInit, ContentChildren, QueryList, ViewEncapsulation, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { PrimeTemplate, TreeNode } from 'primeng/api';
import { SmzTreeComponent } from '../../../smz-trees/features/tree/tree.component';
import { SmzTreeNode } from '../../../smz-trees/models/tree-node';
import { SmzTreeWithDetailsState } from '../../models/tree-with-details-state';

@Component({
  selector: 'smz-ui-tree-with-details',
  templateUrl: './tree-with-details.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'absolute inset-0' },
})
export class SmzTreeWithDetailsComponent implements OnInit, AfterContentInit, OnChanges {
  @ViewChild(SmzTreeComponent) public treeComponent: SmzTreeComponent;
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  @Input() public state: SmzTreeWithDetailsState;
  @Output() public selectionChange = new EventEmitter<SmzTreeNode>();
  @Output() public detailsChange = new EventEmitter<SmzTreeNode>();
  public detailsTemplate: TemplateRef<any>;
  public emptySelectionTemplate: TemplateRef<any>;
  public headerTemplate: TemplateRef<any>;
  public toolbarTemplate: TemplateRef<any>;
  public contentTemplates: { type: string, template: TemplateRef<any> }[] = [];

  constructor(public cdr: ChangeDetectorRef) {
  }

  public ngOnInit(): void {
  }

  public ngOnChanges(changes: SimpleChanges): void {

  }

  public resetSelection(): void {
    this.state.context.selectedNode = null;
    this.treeComponent.primeSelection = [];
    this.cdr.markForCheck();
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

          case 'toolbar':
            this.toolbarTemplate = item.template;
            break;
        }

      }

    });
  }

  public selectionChanged(node: TreeNode): void {

    // console.log('selectionChanged ::', node);

    this.state.context.selectedNode = null;

    if (this.state.tree.selectableTypes.some(x => x === node?.type)) {

      if (this.state.behavior.emitDetailsAfterCycle) {
        this.detailsChange.emit();
        this.cdr.markForCheck();

        setTimeout(() => {
          this.state.context.selectedNode = node;
          this.detailsChange.emit(node);
          this.cdr.markForCheck();
        }, 0);
      }
      else {
        this.detailsChange.emit(node);
      }

    }

    this.selectionChange.emit(node);

  }

}
