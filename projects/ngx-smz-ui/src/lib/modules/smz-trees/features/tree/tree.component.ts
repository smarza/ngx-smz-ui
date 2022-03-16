import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core'
import { MenuItem, PrimeTemplate, TreeDragDropService } from 'primeng/api';
import { SmzTreeDragEvent, SmzTreeDragResult } from '../../models/drag-and-drop';
import { SmzTreeMenuItem } from '../../models/tree-menu-item';
import { SmzTreeNode } from '../../models/tree-node';
import { SmzTreeContext, SmzTreeState } from '../../models/tree-state';
import { uuidv4 } from '../../../../common/utils/utils';

@Component({
  selector: 'smz-ui-tree',
  templateUrl: './tree.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TreeDragDropService]
})
export class SmzTreeComponent implements OnInit, AfterContentInit, OnChanges {
  public treeKey = uuidv4();
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  @Input() public state: SmzTreeState;
  @Input() public items: SmzTreeNode[] = [];
  @Input() public loading: boolean = false;
  @Input() public styleClass = '';
  @Input() public inlineStyle = '';
  @Input() public appendTo = 'body';
  public primeSelection: SmzTreeNode[] = [];
  @Input() public selection: string[] = [];
  @Input() public selectionKey: string = 'key';

  // Evento emitido quando o array de nodes selecionados é atualizado
  @Output() public selectedNodes = new EventEmitter<SmzTreeNode[]>();

  // Evento emitido quando um nó da árvore é selecionado ou é clicado com o botão direito do mouse
  @Output() public selectionChange = new EventEmitter<SmzTreeNode>();

  // Evento emitido quando um nó é movido para outro pai
  @Output() public parentChange = new EventEmitter<{ parentNode: SmzTreeNode, node: SmzTreeNode, event: any }>();

  // Evento emitido quando um nó é reordenado dentro do mesmo pai
  @Output() public reorder = new EventEmitter<{ parentNode: SmzTreeNode, node: SmzTreeNode, childrenIds: string[], event: any }>();

  // Evento emitido quando uma operação de arrastar não é permitida
  @Output() public blockedDrop = new EventEmitter<{ blockedEvent: SmzTreeDragEvent }>();

  // Evento emitido quando um nó é expandido
  @Output() public nodeExpanded = new EventEmitter<{ node: SmzTreeNode }>();

  // Evento emitido quando um nó é colapsado
  @Output() public nodeCollapsed = new EventEmitter<{ node: SmzTreeNode }>();

  // Evento emitido quando toda a árvore é expandida
  @Output() public treeExpanded = new EventEmitter();

  // Evento emitido quando toda a árvore é colapsada
  @Output() public nodeDropped = new EventEmitter<SmzTreeDragResult>();
  public headerTemplate: TemplateRef<any>;
  public footerTemplate: TemplateRef<any>;
  public toolbarTemplate: TemplateRef<any>;
  public emptyStateTemplate: TemplateRef<any>;
  public contentTemplates: { type: string, template: TemplateRef<any> }[] = [];
  public selectedItems: SmzTreeNode[];
  public documentClickListener = null;
  public menuItems: MenuItem[] = null;

  // -- Drag and drop variables

  private dropNode: SmzTreeNode = null;
  private dragNode: SmzTreeNode = null;
  private dragParentNode: SmzTreeNode = null;
  private dropIndex: number = -1;
  private operationResult = false;
  private operationType: 'reorder' | 'move' | 'not-implemented' | 'none';
  private dropPlace: string;

  constructor(public cdr: ChangeDetectorRef) {
  }

  public ngOnInit(): void {
    if (this.items != null) {
      this.primeSelection = [];
      this.checkNode(this.items, this.selection);
      this.selectedNodes.emit(this.primeSelection);
    }
  }

  checkNode(nodes: SmzTreeNode[], str: string[]) {
    nodes.forEach(node => {
      //check parent
      if(str.includes(node[this.selectionKey])) {
        this.primeSelection.push(node);
      }

      if(node.children != undefined){
        node.children.forEach(child => {
          //check child if the parent is not selected
          if(str.includes(child[this.selectionKey]) && !str.includes(node[this.selectionKey])) {
            node.partialSelected = true;
            child.parent = node;
          }

          //check the child if the parent is selected
          //push the parent in str to new iteration and mark all the childs
          if(str.includes(node[this.selectionKey])){
            child.parent = node;
            str.push(child[this.selectionKey]);
          }
        });
      }else{
        return;
      }

      this.checkNode(node.children, str);

      node.children.forEach(child => {
        if(child.partialSelected) {
          node.partialSelected = true;
        }
      });
    });
  }

  public bind(): void {
  }

  public ngOnChanges(changes: SimpleChanges): void {

    if ((changes.items?.currentValue != null && this.selection != null) || (changes.selection?.currentValue != null && this.items != null)) {
      this.primeSelection = [];
      this.checkNode(this.items, this.selection);
      this.selectedNodes.emit(this.primeSelection);
    }

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

  public onUnselected(event: { originalEvent: MouseEvent, node: SmzTreeNode }): void {
    this.selectedNodes.emit(this.primeSelection);
  }

  public onSelected(event: { originalEvent: MouseEvent, node: SmzTreeNode }): void {
    this.selectedNodes.emit(this.primeSelection);
    this.selectionChange.emit(event.node);
    if (!event.node.expanded) {
      event.node.expanded = true;
      this.nodeExpanded.emit({ node: event.node });
    }
  }

  public onExpanded(event: { originalEvent: MouseEvent, node: SmzTreeNode }): void {
    this.nodeExpanded.emit({ node: event.node });
  }

  public onCollapsed(event: { originalEvent: MouseEvent, node: SmzTreeNode }): void {
    this.nodeCollapsed.emit({ node: event.node });
  }

  public onContextMenuOpen(event: { originalEvent: MouseEvent, node: SmzTreeNode }): void {
    if (this.state.menu.isVisible) {
      this.menuItems = this.convertMenu(this.state.menu.items, event.node);
      this.cdr.markForCheck();
    }
    this.selectionChange.emit(event.node);
  }

  private convertMenu(items: SmzTreeMenuItem[], context: SmzTreeNode): MenuItem[] {
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

    setTimeout(() => {
      this.treeExpanded.emit();
    }, 200);
  }

  public collapseAll(): void {
    this.items.forEach(node => {
      this.expandRecursive(node, false);
    });

    setTimeout(() => {
      this.nodeCollapsed.emit(null);
    }, 200);
  }

  public expandNode(): void {
    if (this.primeSelection != null) {
      this.expandRecursive(this.primeSelection as SmzTreeNode, true);
      setTimeout(() => {
        this.nodeExpanded.emit({ node: this.primeSelection as SmzTreeNode });
      }, 200);
    }
  }

  public collapseNode(): void {
    if (this.primeSelection != null) {
      this.expandRecursive(this.primeSelection as SmzTreeNode, false);
      setTimeout(() => {
        this.nodeCollapsed.emit({ node: this.primeSelection as SmzTreeNode });
      }, 200);
    }
  }

  // Método que recebe o evento de arrastar do prime e repassa para o nosso serviço de drag and drop.
  // Inicialmente ele verifica se a operação é permitida e envia o accept para o prime, entretanto
  // o dados do evento só podem ser lidos depois de um tempo pre-definido porque o parent do nó
  // só é atualizado depois que a ui processa a operação.
  public onDropped(event: { originalEvent: DragEvent, dragNode: SmzTreeNode, dropNode: SmzTreeNode, dropIndex: number, index: number, accept: () => void }): void {
    const isAllowed = this.check(event);

    if (isAllowed) {
      event.accept();

      setTimeout(() => {
        const result = this.getOperationDetails();
        let operationType = 'move';
        if (this.dragParentNode == null && result.dragNode.parent == null) {
          operationType = 'reorder';
        }
        else if (this.dragParentNode != null && result.dragNode.parent != null && this.dragParentNode.key === result.dragNode.parent.key) {
          operationType = 'reorder'
        }

        result.operationType = operationType;

        if (operationType === 'move') {
          this.parentChange.emit({
            node: result.dragNode,
            parentNode: result.dropNode,
            event: result.originalEvent
          });
        }
        else if (result.operationType === 'reorder') {
          this.reorder.emit({
            node: result.dragNode,
            parentNode: result.dropNode,
            childrenIds: result.dropNode.children.map(x => x.key),
            event: result.originalEvent
          });
        }
        // console.log('DRAG RESULT: ', result);
        this.nodeDropped.emit(this.getOperationDetails());
      }, 250);
    }
    else {
      const result = this.getOperationDetails();
      this.blockedDrop.emit({ blockedEvent: result.originalEvent });
      // console.log('DRAG RESULT: ', result);
    }
  }

  public onFiltered(event: {filter: any, filteredValue: any}): void {
  }

  private expandRecursive(node: SmzTreeNode, isExpand: boolean): void {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach(childNode => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }










    // Método que verifica se uma operação é permitida ou não, baseado nas regras da configuração
    public check(event: { originalEvent: any, dragNode: SmzTreeNode, dropNode: SmzTreeNode, dropIndex: number, index: number, accept: () => void }): boolean {
      // console.log(`D&D: Dropped [${event.dragNode.label} (${event.dragNode.type})] into [${event.dropNode.label} (${event.dropNode.type})], index=${event.index}`);

      // if (event.dropNode.data.isVirtual == null) {
      //   event.dropNode.data.isVirtual = false;
      // }

      // if (event.dropNode.parent != null && event.dropNode.parent.data.isVirtual == null) {
      //   event.dropNode.parent.data.isVirtual = false;
      // }

      // if (event.dragNode.data.isVirtual == null) {
      //   event.dragNode.data.isVirtual = false;
      // }

      // if (event.dragNode.parent != null && event.dragNode.parent.data.isVirtual == null) {
      //   event.dragNode.parent.data.isVirtual = false;
      // }

      // // Verifica se o úsuário está movendo ou reordenando um nó e pega o novo pai de acordo com a ação
      // const newParent: TreeNode = event.index != null
      //   // Se estiver movendo, o novo pai deve ser o nó aonde ele jogou ou o avó desse nó caso ele seja virtual
      //   ? event.dropNode.data.isVirtual ? event.dropNode.parent : event.dropNode
      //   // Se estiver reordenando, o novo pai deve ser o pai do nó aonde ele jogou ou o avó desse nó caso ele seja virtual
      //   : event.dropNode.parent.data.isVirtual ? event.dropNode.parent.parent : event.dropNode.parent;

      // this.parentNode = { id: newParent.data.id, type: newParent.type };
      // this.node = { id: event.dragNode.data.id, type: event.dragNode.type };

      // if (event.dragNode.data.isVirtual) {
      //   // console.log('D&D: Block because drag node is virtual');
      //   return false;
      // }

      // // Se o pai do nó a ser movimentado for um nó virtual pega o avó ou pai se não
      // const dragParent: TreeNode = event.dragNode.parent.data.isVirtual ? event.dragNode.parent.parent : event.dragNode.parent;

      // // Se o pai do nó que recebeu for um nó virtual pega o avó ou só o pai se não
      // // Se ele não tiver pai, a variável recebe nulo
      // const dropParent: TreeNode = event.dropNode.parent != null
      //   ? event.dropNode.parent.data.isVirtual ? event.dropNode.parent.parent : event.dropNode.parent
      //   : null;

      // if (event.dropIndex != null && dragParent.key !== dropParent.key) {
      //   // console.log('D&D: Block because.. Have no idea (case 1)');
      //   return false;
      // }
      // else if (event.index != null && dragParent === newParent) {
      //   // console.log('D&D: Block because.. Have no idea (case 2)');
      //   return false;
      // }
      this.dragParentNode = event.dragNode.parent;

      let dropType = event.dropNode.type;
      let dropNode = event.dropNode;
      let dropPlace = 'node';
      if (event.originalEvent.path[0].className.indexOf('droppoint') > -1) {
        dropType = (event?.dropNode?.parent?.type) ?? 'ROOT';
        dropNode = event?.dropNode?.parent;
        dropPlace = 'between';
      }

      for (const allowedOperation of this.state.dragAndDrop.configuration) {
        if (allowedOperation.dropType === dropType && allowedOperation.dragType === event.dragNode.type) {
          // this.operationType = event.index != null ? 'move' : 'reorder';
          this.dragNode = event.dragNode;
          this.dropNode = dropNode;
          this.dropIndex = event.index;
          this.dropPlace = dropPlace;

          // console.log('D&D: Allow by operation type');
          this.operationResult = true;
          return true;
        }
      }

      this.operationType = 'none';
      this.dropPlace = '';
      this.dragNode = null;
      this.dropNode = null;
      this.dropIndex = -1;
      // console.log('D&D: Block because why not?');
      return false;
    }

    // Método para ler o resultado da última operação de arrastar. Porém só pode ser chamado depois de um tempo pré-determinado
    // pois o parent do nó arrastado só atualizado depois que a ui é atualizada
    public getOperationDetails(): SmzTreeDragResult {
      // const childrenIds: string[] = [];

      // if (this.dropEvent.index != null) {
      //   if (this.dropEvent.dropNode.children != null) {
      //     this.dropEvent.dropNode.children.filter(x => x.data.isVirtual != null && !x.data.isVirtual).map(x => x.data.id);
      //   }
      // }
      // else {
      //   if (this.dropEvent.dropNode.parent != null && this.dropEvent.dropNode.parent.children != null) {
      //     this.dropEvent.dropNode.parent.children.filter(x => x.data.isVirtual != null && !x.data.isVirtual).map(x => x.data.id);
      //   }
      // }


      return {
        isAllowed: this.operationResult,
        operationType: this.operationType,
        dragNode: this.dragNode,
        dropNode: this.dropNode,
        originalEvent: event,
        dropIndex: this.dropIndex,
        dropPlace: this.dropPlace
      };
    }

  public onToolbarButtonClick(event: MouseEvent, button: any): void {
    if(button.callback != null) {
      button.callback(event, this.items, null);
    }
  }
}
