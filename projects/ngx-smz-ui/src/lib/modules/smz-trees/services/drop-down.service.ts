import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { SmzTreeDragEvent, SmzTreeDragNode, SmzTreeDragResult } from '../models/drag-and-drop';

@Injectable()
export class SmzTreeDropDownService {
  private config: { dragType: string, dropType: string }[] = [];

  private parentNode: SmzTreeDragNode = null;
  private node: SmzTreeDragNode = null;
  private event: SmzTreeDragEvent = null;
  private operationResult = false;
  private operationType: 'reorder' | 'move';

  public setup(config: { dragType: string, dropType: string }[]): void {
    this.config = config;
  }

  // Método que verifica se uma operação é permitida ou não, baseado nas regras da configuração
  public check(event: { originalEvent: DragEvent, dragNode: TreeNode, dropNode: TreeNode, dropIndex: number, index: number, accept: () => void }): boolean {
    // Passa o evento original caso precise para alguma lógica futura
    this.event = event;

    if (event.dropNode.data.isVirtual == null) {
      event.dropNode.data.isVirtual = false;
    }

    if (event.dropNode.parent.data.isVirtual == null) {
      event.dropNode.parent.data.isVirtual = false;
    }

    if (event.dragNode.data.isVirtual == null) {
      event.dragNode.data.isVirtual = false;
    }

    if (event.dragNode.parent.data.isVirtual == null) {
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
      return false;
    }
    else if (event.index != null && dragParent === newParent) {
      return false;
    }

    for (const allowedOperation of this.config) {
      if (allowedOperation.dropType === event.dropNode.type && allowedOperation.dragType === event.dragNode.type) {
        this.operationType = event.index != null ? 'move' : 'reorder';
        return this.operationResult = true;
      }
    }

    return false;
  }

  // Método para ler o resultado da última operação de arrastar. Porém só pode ser chamado depois de um tempo pré-determinado
  // pois o parent do nó arrastado só atualizado depois que a ui é atualizada
  public getOperationDetails(): SmzTreeDragResult {
    const childrenIds: string[] = this.event.index != null
      ? this.event.dropNode.children.filter(x => x.data.isVirtual != null && !x.data.isVirtual).map(x => x.data.id)
      : this.event.dropNode.parent.children.filter(x => x.data.isVirtual != null && !x.data.isVirtual).map(x => x.data.id);

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