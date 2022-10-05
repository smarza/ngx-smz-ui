import { DemoKeys } from '@demos/demo-keys';
import { Store } from '@ngxs/store';
import { GlobalInjector, nameof, namesof, SmzCardsBuilder, SimpleNamedEntity, SmzCardsTemplate } from 'ngx-smz-ui';
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
        .template()
          .imageWithDetails()
            .image(nameof<SmzCardsDemoData>('imagePath'))
              .setDynamicTitle((item: SmzCardsDemoData) => item.date == null ? '' : moment(item.date).format('l'))
              .template
            .title(nameof<SmzCardsDemoData>('date'))
              .transform((date) => moment(date).format('lll'))
              .template
            .subTitle(namesof<SmzCardsDemoData, SimpleNamedEntity>('type', 'name'))
              .enableGlobalFilter()
              .setStyles('px-2 py-1 text-xs bg-green-200 text-surface-50 rounded')
              .template
            .addText(nameof<SmzCardsDemoData>('notes'))
              .shorten(60)
              .template
            .template
          .cards
        .grid()
          .setLayout('col-12 lg:col-6 xl:col-3')
          .setPadding('p-2')
          .cards
        .list()
          .setLayout('col-12')
          .setPadding('px-0 pt-4')
          .cards
        .menu()
          .setCollapse(2)
          .item('Consultar')
            .setCallback((event: any) => console.log('--- Consultar'))
            .menu
          .item('Atualizar')
            .setCallback((event: any) => console.log('--- Atualizar'))
            .menu
          .item('Apagar', 'fa-solid fa-trash')
            .setCallback((event: any) => console.log('--- Apagar'))
            .menu
          .cards
      .build()
  }
  },
}