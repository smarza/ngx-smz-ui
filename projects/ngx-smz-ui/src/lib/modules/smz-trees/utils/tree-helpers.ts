import { TreeNode } from 'primeng/api';

export namespace TreeHelpers {
  export function synchronizeTrees(destinationTrees: TreeNode[], sourceTrees: TreeNode[]): void {
    for (const destinationTree of destinationTrees) {
      const sourceRoot = sourceTrees.find(x => x.key === destinationTree.key)
      if (sourceRoot != null) {
        destinationTree.expanded = sourceRoot.expanded;

        if (destinationTree.children != null && sourceRoot.children != null) {
          for (const destinationChild of destinationTree.children) {
            const sourceChild = sourceRoot.children.find(x => x.key === destinationChild.key);

            if (sourceChild != null) {
              this.synchronizeTrees([destinationChild], [sourceChild]);
            }
          }
        }
      }
    }
  }

  export function findTreeNodeByKey<T>(nodes: TreeNode<T>[] | undefined, key: string): TreeNode<T> | null {
    if (!nodes) return null; // Se não há nós, retorna nulo

    for (const node of nodes) {
        if (node.key === key) {
            return node || null; // Retorna os dados do nó se a chave corresponder
        }

        // Se o nó atual tem filhos, busca recursivamente entre eles
        const result = findTreeNodeByKey(node.children, key);
        if (result !== null) { // Se encontrou o nó nos filhos, retorna o resultado
            return result;
        }
    }

    // Se nenhum nó correspondente for encontrado em toda a árvore
    return null;
  }

  export function findTreeNodeDataByKey<T>(nodes: TreeNode<T>[] | undefined, key: string): T | null {
    if (!nodes) return null; // Se não há nós, retorna nulo

    for (const node of nodes) {
        if (node.key === key) {
            return node.data || null; // Retorna os dados do nó se a chave corresponder
        }

        // Se o nó atual tem filhos, busca recursivamente entre eles
        const result = findTreeNodeDataByKey(node.children, key);
        if (result !== null) { // Se encontrou o nó nos filhos, retorna o resultado
            return result;
        }
    }

    // Se nenhum nó correspondente for encontrado em toda a árvore
    return null;
  }

  export function findTreeNodesByKeys<T>(nodes: TreeNode<T>[] | undefined, keys: string[]): TreeNode<T>[] {
    let foundNodes: TreeNode<T>[] = [];

    if (!nodes) return foundNodes; // Se não há nós, retorna o array vazio

    for (const node of nodes) {
        if (node.key && keys.includes(node.key)) {
          foundNodes.push(node.data); // Adiciona o nó se a chave corresponder
        }

        // Mesmo se encontrarmos um nó correspondente, continuamos a buscar em seus filhos
        // Isso porque pode haver chaves duplicadas ou queremos todos os matches
        foundNodes = foundNodes.concat(findTreeNodesByKeys(node.children, keys));
    }

    return foundNodes;
}

  export function findTreeNodesDataByKeys<T>(nodes: TreeNode<T>[] | undefined, keys: string[]): T[] {
      let foundNodes: T[] = [];

      if (!nodes) return foundNodes; // Se não há nós, retorna o array vazio

      for (const node of nodes) {
          if (node.key && keys.includes(node.key)) {
              if (node.data) foundNodes.push(node.data); // Adiciona os dados do nó se a chave corresponder
          }

          // Mesmo se encontrarmos um nó correspondente, continuamos a buscar em seus filhos
          // Isso porque pode haver chaves duplicadas ou queremos todos os matches
          foundNodes = foundNodes.concat(findTreeNodesDataByKeys(node.children, keys));
      }

      return foundNodes;
  }


}