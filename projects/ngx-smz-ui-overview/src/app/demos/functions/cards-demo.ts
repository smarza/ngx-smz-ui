import { DemoKeys } from '@demos/demo-keys';
import { Store } from '@ngxs/store';
import { GlobalInjector, nameof, SmzCardsBuilder, SmzCardsType } from 'ngx-smz-ui';
import { of } from 'rxjs';
import { SmzCardsDemo, SmzCardsDemoData } from '../data/cards/cards-data';
import * as moment from 'moment';

const store = GlobalInjector.instance.get(Store);

export const CardsDemo: { [key: string]: { code: () => void } } = {
  //
  [DemoKeys.CARDS_SAMPLE]: {
    code: () => {
    return new SmzCardsBuilder<SmzCardsDemoData>()
        .debugMode()
        .setTitle('Demo Cards')
        .setSource(of(SmzCardsDemo))
        .setGridType(SmzCardsType.IMAGE_WITH_DETAILS)
        .setListType(SmzCardsType.RAW)
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