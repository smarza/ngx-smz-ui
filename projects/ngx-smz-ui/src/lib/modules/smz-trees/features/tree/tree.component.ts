import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core'
import { MenuItem, PrimeTemplate, TreeDragDropService, TreeNode } from 'primeng/api';
import { ContextMenu } from 'primeng/contextmenu';
import { SmzTreeDragEvent, SmzTreeDragNode, SmzTreeDragResult } from '../../models/drag-and-drop';
import { SmzTreeMenuItem } from '../../models/tree-menu-item';
import { SmzTreeContext, SmzTreeState } from '../../models/tree-state';
import { SmzTreeDropDownService } from '../../services/drop-down.service';

@Component({
  selector: 'smz-ui-tree',
  templateUrl: './tree.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SmzTreeDropDownService, TreeDragDropService]
})
export class SmzTreeComponent implements OnInit, AfterContentInit, OnChanges {
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  @Input() public state: SmzTreeState;
  @Input() public items: TreeNode[] = [];
  @Input() public loading: boolean = false;

    // Evento emitido quando um nó da árvore é selecionado ou é clicado com o botão direito do mouse
    @Output() public selectionChange = new EventEmitter<TreeNode>();

    // Evento emitido quando um nó é movido para outro pai
    @Output() public parentChange = new EventEmitter<{ parentNode: SmzTreeDragNode, node: SmzTreeDragNode, event: SmzTreeDragEvent }>();

    // Evento emitido quando um nó é reordenado dentro do mesmo pai
    @Output() public reorder = new EventEmitter<{ parentNode: SmzTreeDragNode, node: SmzTreeDragNode, childrenIds: string[], event: SmzTreeDragEvent }>();

    // Evento emitido quando uma operação de arrastar não é permitida
    @Output() public blockedDrop = new EventEmitter<{ blockedEvent: SmzTreeDragEvent }>();

    // Evento emitido quando um nó é expandido
    @Output() public nodeExpanded = new EventEmitter<{ node: TreeNode }>();

    // Evento emitido quando um nó é colapsado
    @Output() public nodeCollapsed = new EventEmitter<{ node: TreeNode }>();

    // Evento emitido quando toda a árvore é expandida
    @Output() public treeExpanded = new EventEmitter();

    // Evento emitido quando toda a árvore é colapsada
    @Output() public treeCollapsed = new EventEmitter();
  public headerTemplate: TemplateRef<any>;
  public footerTemplate: TemplateRef<any>;
  public toolbarTemplate: TemplateRef<any>;
  public emptyStateTemplate: TemplateRef<any>;
  public selectedItems: TreeNode[];
  public documentClickListener = null;
  public menuItems: MenuItem[] = null;

  public selection: TreeNode;



  // -- Drag and drop variables

  private parentNode: SmzTreeDragNode = null;
  private node: SmzTreeDragNode = null;
  private event: SmzTreeDragEvent = null;
  private operationResult = false;
  private operationType: 'reorder' | 'move';


  constructor(public cdr: ChangeDetectorRef) {
  }

  public ngOnInit(): void {

  }

  public bind(): void {
  }

  public ngOnChanges(changes: SimpleChanges): void {

    if (changes.state != null) {

      const newState: SmzTreeState = changes.state.currentValue;
      console.log(newState);
      this.cdr.markForCheck();
    }

  }

  public ngAfterContentInit() {

    this.templates.forEach((item) => {
      switch (item.getType()) {

        case 'header':
          this.headerTemplate = item.template;
          break;

        case 'footer':
          this.footerTemplate = item.template;
          break;

        case 'empty':
          this.emptyStateTemplate = item.template;
          break;

        case 'toolbar':
          this.toolbarTemplate = item.template;
          break;

        case 'emptyState':
          this.emptyStateTemplate = item.template;
          break;
      }
    });
  }

  public clear(dt: any, context: SmzTreeContext): void {
    dt.clear();

    // if (context.state.caption?.clearFilters?.callback != null) {
    //   context.state.caption.clearFilters.callback();
    // }
  }

  public onRowSelection(context: SmzTreeContext): void {
    // context.state.caption.rowSelection.isEnabled = !context.state.caption.rowSelection.isEnabled;

    // if (context.state.caption.rowSelection.callback != null) {
    //   context.state.caption.rowSelection.callback();
    // }
  }










  public onUnselected(event: { originalEvent: MouseEvent, node: TreeNode }): void {

  }

  public onSelected(event: { originalEvent: MouseEvent, node: TreeNode }): void {
    this.selectionChange.emit(event.node);
console.log(event.node);
    if (!event.node.expanded) {
      event.node.expanded = true;
      this.nodeExpanded.emit({ node: event.node });
    }
  }

  public onExpanded(event: { originalEvent: MouseEvent, node: TreeNode }): void {
    this.nodeExpanded.emit({ node: event.node });
  }

  public onCollapsed(event: { originalEvent: MouseEvent, node: TreeNode }): void {
    this.nodeCollapsed.emit({ node: event.node });
  }

  public onContextMenuOpen(event: { originalEvent: MouseEvent, node: TreeNode }): void {
    if (this.state.menu.isVisible) {
      this.menuItems = this.convertMenu(this.state.menu.items, event.node);
      this.cdr.markForCheck();
    }
    this.selectionChange.emit(event.node);
  }

  private convertMenu(items: SmzTreeMenuItem[], context: TreeNode): MenuItem[] {
    if (items == null) return null;

    const results: MenuItem[] = [];

    items.forEach(item => {
      const newItem: MenuItem = {
        label: item.label,
        title: item.tooltip,
        icon: item.icon,
        visible: item.visible,
        disabled: item.disabled,
        separator: item.separator,
        command: item.callback != null ? () => item.callback(context) : null,
        items: this.convertMenu(item.items, context),
      };

      if (newItem.items == null || newItem.items.length > 0) {
        if (item.allowedTypes != null && item.allowedTypes.find(x => x === context.type) != null) {
          results.push(newItem);
        }
        else if (item.unallowedTypes != null && item.unallowedTypes.find(x => x === context.type) == null) {
          results.push(newItem);
        }
        else if (item.allowedTypes == null && item.unallowedTypes == null) {
          results.push(newItem);
        }
      }

    });

    const newResults = [];

    for (let i = 0; i < results.length; i++) {
      if (results[i].separator === true && i === 0) {

      }
      else if (results[i].separator === true && i === results.length - 1) {

      }
      else if (i > 0 && i < results.length - 1 && results[i].separator === true && results[i + 1].separator) {

      }
      else {
        newResults.push(results[i]);
      }
    }

    return newResults;
  }


  public expandAll(): void {
    this.items.forEach(node => {
      this.expandRecursive(node, true);
    });
    this.treeExpanded.emit();
  }

  public collapseAll(): void {
    this.items.forEach(node => {
      this.expandRecursive(node, false);
    });
    this.treeCollapsed.emit();
  }

  public expandNode(): void {
    if (this.selection != null) {
      this.expandRecursive(this.selection, true);
      this.nodeExpanded.emit({node: this.selection});
    }
  }

  public collapseNode(): void {
    if (this.selection != null) {
      this.expandRecursive(this.selection, false);
      this.nodeCollapsed.emit({node: this.selection});
    }
  }

  // Método que recebe o evento de arrastar do prime e repassa para o nosso serviço de drag and drop.
  // Inicialmente ele verifica se a operação é permitida e envia o accept para o prime, entretanto
  // o dados do evento só podem ser lidos depois de um tempo pre-definido porque o parent do nó
  // só é atualizado depois que a ui processa a operação.
  public onDropped(event: { originalEvent: DragEvent, dragNode: TreeNode, dropNode: TreeNode, dropIndex: number, index: number, accept: () => void }): void {
    const isAllowed = this.check(event);

    if (isAllowed) {
      console.log('** ALLOW OPERATION **');
    }
    else {
      console.log('** BLOCK OPERATION **');
    }

    if (isAllowed) {
      event.accept();

      setTimeout(() => {
        const result = this.getOperationDetails();
        if (result.operationType === 'move') {
          this.parentChange.emit({
            node: result.node,
            parentNode: result.parentNode,
            event: result.event
          });
        }
        else if (result.operationType === 'reorder') {
          this.reorder.emit({
            node: result.node,
            parentNode: result.parentNode,
            childrenIds: result.childrenIds,
            event: result.event
          });
        }
      }, 250);
    }
    else {
      const result = this.getOperationDetails();
      this.blockedDrop.emit({ blockedEvent: result.event });
    }
  }

  public onFiltered(event: {filter: any, filteredValue: any}): void {
  }

  private expandRecursive(node: TreeNode, isExpand: boolean): void {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach(childNode => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }










    // Método que verifica se uma operação é permitida ou não, baseado nas regras da configuração
    public check(event: { originalEvent: DragEvent, dragNode: TreeNode, dropNode: TreeNode, dropIndex: number, index: number, accept: () => void }): boolean {
      console.log('CHECK D&D:', event);
      // Passa o evento original caso precise para alguma lógica futura
      this.event = event;

      if (event.dropNode.data.isVirtual == null) {
        event.dropNode.data.isVirtual = false;
      }

      if (event.dropNode.parent != null && event.dropNode.parent.data.isVirtual == null) {
        event.dropNode.parent.data.isVirtual = false;
      }

      if (event.dragNode.data.isVirtual == null) {
        event.dragNode.data.isVirtual = false;
      }

      if (event.dragNode.parent != null && event.dragNode.parent.data.isVirtual == null) {
        event.dragNode.parent.data.isVirtual = false;
      }

      // Verifica se o úsuário está movendo ou reordenando um nó e pega o novo pai de acordo com a ação
      const newParent: TreeNode = event.index != null
        // Se estiver movendo, o novo pai deve ser o nó aonde ele jogou ou o avó desse nó caso ele seja virtual
        ? event.dropNode.data.isVirtual ? event.dropNode.parent : event.dropNode
        // Se estiver reordenando, o novo pai deve ser o pai do nó aonde ele jogou ou o avó desse nó caso ele seja virtual
        : event.dropNode.parent.data.isVirtual ? event.dropNode.parent.parent : event.dropNode.parent;

      this.parentNode = { id: newParent.data.id, type: newParent.type };
      this.node = { id: event.dragNode.data.id, type: event.dragNode.type };

      if (event.dragNode.data.isVirtual) {
        console.log('D&D: Block because drag node is virtual');
        return false;
      }

      // Se o pai do nó a ser movimentado for um nó virtual pega o avó ou pai se não
      const dragParent: TreeNode = event.dragNode.parent.data.isVirtual ? event.dragNode.parent.parent : event.dragNode.parent;

      // Se o pai do nó que recebeu for um nó virtual pega o avó ou só o pai se não
      // Se ele não tiver pai, a variável recebe nulo
      const dropParent: TreeNode = event.dropNode.parent != null
        ? event.dropNode.parent.data.isVirtual ? event.dropNode.parent.parent : event.dropNode.parent
        : null;

      if (event.dropIndex != null && dragParent.key !== dropParent.key) {
        console.log('D&D: Block because.. Have no idea (case 1)');
        return false;
      }
      else if (event.index != null && dragParent === newParent) {
        console.log('D&D: Block because.. Have no idea (case 2)');
        return false;
      }

      for (const allowedOperation of this.state.dragAndDrop.configuration) {
        if (allowedOperation.dropType === event.dropNode.type && allowedOperation.dragType === event.dragNode.type) {
          this.operationType = event.index != null ? 'move' : 'reorder';

          console.log('D&D: Allow by operation type');
          this.operationResult = true;
          return true;
        }
      }

      console.log('D&D: Block because why not?');
      return false;
    }

    // Método para ler o resultado da última operação de arrastar. Porém só pode ser chamado depois de um tempo pré-determinado
    // pois o parent do nó arrastado só atualizado depois que a ui é atualizada
    public getOperationDetails(): SmzTreeDragResult {
      const childrenIds: string[] = [];

      if (this.event.index != null) {
        if (this.event.dropNode.children != null) {
          this.event.dropNode.children.filter(x => x.data.isVirtual != null && !x.data.isVirtual).map(x => x.data.id);
        }
      }
      else {
        if (this.event.dropNode.parent != null && this.event.dropNode.parent.children != null) {
          this.event.dropNode.parent.children.filter(x => x.data.isVirtual != null && !x.data.isVirtual).map(x => x.data.id);
        }
      }


      return {
        isAllowed: this.operationResult,
        operationType: this.operationType,
        node: this.node,
        parentNode: this.parentNode,
        childrenIds: childrenIds,
        event: this.event
      };
    }
}
