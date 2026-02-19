import { DemoKeys } from '../../demos/demo-keys';
import { SmzMenuBuilder } from '@ngx-smz/core';

export const MenusDemo: { [key: string]: () => void } = {
  //
  [DemoKeys.MENU_IF_TRUE]: () => {
    return new SmzMenuBuilder()
      .item('Opção 1 criada fora do if', 'fas fa-user')
        .setCallback((event) => console.log('callback'))
        .setVisibilityRule((event) => (true) )
        .menu
      .if(true)
        .item('Opção 2 criada dentro do if')
          .setCallback((event) => console.log('callback'))
          .menu
        .item('Opção 3 criada dentro do if')
          .setCallback((event) => console.log('callback'))
          .menu
        .endIf
      .build()
  },
  //
  [DemoKeys.MENU_IF_FALSE]: () => {
    return new SmzMenuBuilder()
      .item('Opção 1 criada fora do if')
        .setCallback((event) => console.log('callback'))
        .menu
      .if(false)
        .item('Opção 2 criada dentro do if')
          .setCallback((event) => console.log('callback'))
          .menu
        .item('Opção 3 criada dentro do if')
          .setCallback((event) => console.log('callback'))
          .menu
        .endIf
      .build()
  },
}

