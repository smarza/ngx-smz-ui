import { DemoKeys } from '@demos/demo-keys';
import { Store } from '@ngxs/store';
import { GlobalInjector, nameof, namesof, SmzCardsBuilder, SmzCardsType, SimpleNamedEntity } from 'ngx-smz-ui';
import { of } from 'rxjs';
import { SmzCardsDemo, SmzCardsDemoData } from '../data/cards/cards-data';
import * as moment from 'moment';

const store = GlobalInjector.instance.get(Store);

export const CardsDemo: { [key: string]: { code: () => void } } = {
  //
  [DemoKeys.CARDS_SAMPLE]: {
    code: () => {
    return new SmzCardsBuilder<SmzCardsDemoData>()
        .setTitle('Demo Cards')
        .setSource(of(SmzCardsDemo))
        .setGridType(SmzCardsType.IMAGE_WITH_DETAILS)
        .setListType(SmzCardsType.IMAGE_WITH_DETAILS)
        .columns()
          .image(nameof<SmzCardsDemoData>('imagePath'))
            .setDynamicTitle((item: SmzCardsDemoData) => item.date == null ? '' : moment(item.date).format('l'))
            .columns
          .dataTransform(nameof<SmzCardsDemoData>('date'))
            .setCallback((date) => moment(date).format('lll'))
            .columns
          .text(namesof<SmzCardsDemoData, SimpleNamedEntity>('type', 'name'))
            .setStyles('px-2 py-1 text-xs bg-green-200 rounded')
            .columns
          .text(nameof<SmzCardsDemoData>('notes'))
            .shorten(60)
            .columns
          .table
        .menu()
          .item('Consultar')
            .setCallback((event: any) => console.log('--- Consultar'))
            .menu
          .item('Apagar', 'fa-solid fa-trash')
            .setCallback((event: any) => console.log('--- Apagar'))
            .menu
          .table
      .build()
  }
  },
}