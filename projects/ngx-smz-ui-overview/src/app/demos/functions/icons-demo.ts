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
        .dataTransform('font5Name', 'Font Awesome 5', (data, row) => (`<i class="${row.font5}"></i>`), '150px')
          .addStyles('text-2xl text-center')
          .columns
        .text('font5', '')
          .disableFilter()
          .disableSort()
          .columns
        .dataTransform('font6Name', 'Font Awesome 6', (data, row) => (`<i class="${row.font6}"></i>`), '150px')
          .addStyles('text-2xl text-center')
          .columns
        .text('font6', '')
          .disableFilter()
          .disableSort()
          .columns
        .table
      .build()
  }
  },
}
