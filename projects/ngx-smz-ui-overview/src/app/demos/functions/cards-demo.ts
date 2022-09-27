import { DemoKeys } from '@demos/demo-keys';
import { Store } from '@ngxs/store';
import { GlobalInjector, SmzCardsBuilder } from 'ngx-smz-ui';
import { of } from 'rxjs';
import { SmzCardsDemo, SmzCardsDemoData } from '../data/cards/cards-data';
import * as moment from 'moment';
import { nameof } from '../../../../../ngx-smz-ui/src/lib/common/models/simple-named-entity';

const store = GlobalInjector.instance.get(Store);

export const CardsDemo: { [key: string]: { code: () => void } } = {
  //
  [DemoKeys.CARDS_SAMPLE]: {
    code: () => {
    return new SmzCardsBuilder<SmzCardsDemoData>()
        .setTitle('Demo Cards')
        .setSource(of(SmzCardsDemo))
        .columns()
          .text(nameof<SmzCardsDemoData>('notes'))
            .columns
          .image(nameof<SmzCardsDemoData>('imagePath'))
            .useServerPath()
            .setDynamicTitle((item: SmzCardsDemoData) => item.date == null ? '' : moment(item.date).format('l'))
            .columns
          .table
        .menu()
          .item('Consultar')
            .setCallback((event: any) => console.log('---'))
            .menu
          .table
      .build()
  }
  },
}