import { DemoKeys } from '@demos/demo-keys';
import { SmzTreeBuilder } from 'ngx-smz-ui';

export const TreesDemo: { [key: string]: () => void } = {
  //
  [DemoKeys.TREE_DEMO_1]: () => {
    return new SmzTreeBuilder()
      .setTitle('Sincronized Tree')
      // .emptyFeedback()
      //   .setMessage('Lista vazia.')
      //   .useTreeEmptyMessage()
      //   .tree
      .emptyFeedback()
        .setButtonLabel('Criar nova conexão')
        .setMessage('Ainda não existem conexões cadastradas para esta UN')
        .setButtonCallback(() => { console.log('Hello!'); })
      .tree
      .useSincronization()
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
          .button('', 'fas fa-coffee')
            .setCallback((event, data, node) => console.log(event))
            .setTooltip('Button 1 awesome tooltip')
            .setColor('danger')
            .buttons
          .button('', 'fas fa-hamburger')
            .setCallback((event, data, node) => console.log('Button 2'))
            .setTooltip('Button 2 awesome tooltip')
            .setColor('warning')
            .buttons
          .button('', 'fas fa-pizza-slice')
            .setCallback((event, data, node) => console.log('Button 3'))
            .setTooltip('Button 3 awesome tooltip')
            .setColor('success')
            .buttons
          .toolbar
        .tree
        // .dragAndDrop()
        //   .canDrag('file').into('folder', 'disk')
        //   .canDrag('folder').into('disk', 'folder')
        // .tree
      .build()
  },
}

