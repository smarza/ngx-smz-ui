import { DemoKeys } from '@demos/demo-keys';
import { Store } from '@ngxs/store';
import { DemoFeatureSelectors } from '@states/demo/demo.selectors';
import { GlobalInjector, SmzTableBuilder } from 'ngx-smz-ui';
import { Observable } from 'rxjs';

const store = GlobalInjector.instance.get(Store);

export const IconsDemo: { [key: string]: { items$: Observable<any[]>, code: () => void } } = {
  //
  [DemoKeys.ICONS_FONTAWESOME_6]: {
    items$: store.select(DemoFeatureSelectors.icons),
    code: () => {
      return new SmzTableBuilder()
      .setTitle('Font Awesome 6 Overview')
      .enableGlobalFilter()
      .disableRowHoverEffect()
      .useStrippedStyle()
      .setSize('small')
      .columns()
        .text('font5', 'Font Awesome 5', '150px')
          .disableFilter()
          .disableSort()
          .addStyles('text-2xl')
        .columns
          .dataTransform('font5Name', '', (data, row) => (new RegExp('(?<=\=")(.*?)(?=\">)').exec(row.font5)[0].toString()))
          .columns
        .text('font6', 'Font Awesome 6', '200px')
          .addStyles('text-2xl')
          .columns
        .dataTransform('font6Name', '', (data, row) => (new RegExp('(?<=\=")(.*?)(?=\">)').exec(row.font6)[0].toString()))
          .columns
        .table
      .build()
  }
  },
}
