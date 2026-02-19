import { SmzTreeBuilder, SmzTreeState } from '@ngx-smz/core';

export function getHidroblastTreeState(isEditing: boolean): SmzTreeState {
  return new SmzTreeBuilder()
  .setTitle('Localização dos Hidrojatos')
  .setSelection('checkbox')
  .toolbar('rounded-borderless')
    .useTreeExpandButtons()
    .tree
  .dataSource()
    .nested('Module')
      .setType('Module')
      .conditionalSelection((event) => {
        // console.log('Module condition', event);
        return false;
      })
      .addChild('sectors')
        .setType('Sector')
        .conditionalSelection((event) => {
          // console.log('Sector condition', event);
          return isEditing;
        })
        .back
      .dataSource
    .tree
  .enableFilter()
  .build();
}
