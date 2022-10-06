import { DemoKeys } from '@demos/demo-keys';
import { Store } from '@ngxs/store';
import { GlobalInjector, nameof, namesof, SmzCardsBuilder, SimpleNamedEntity, SmzCardsTemplate } from 'ngx-smz-ui';
import { of } from 'rxjs';
import { SmzCardsDemo, SmzCardsDemoData } from '../data/cards/cards-data';
import * as moment from 'moment';

const store = GlobalInjector.instance.get(Store);

export const CardsDemo: { [key: string]: { code: () => void } } = {
  //
  [DemoKeys.CARDS_IMAGE_WITH_DETAILS]: {
    code: () => {
    return new SmzCardsBuilder<SmzCardsDemoData>()
        .setTitle('Demo Cards | Image with Details')
        .setSource(of(SmzCardsDemo))
        .template()
          .imageWithDetails()
            .setCardStyles('bg-surface-card rounded-lg shadow-md')
            .setContentStyles('px-3 py-2')
            .image(nameof<SmzCardsDemoData>('imagePath'))
              .setDynamicTitle((item: SmzCardsDemoData) => item.date == null ? '' : moment(item.date).format('l'))
              .setStyles('rounded-b-none')
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
        .buttons()
          .item('Consultar')
            .setCallback((event: any) => console.log('--- Consultar'))
            .menu
          .cards
        .menu()
          .item('Atualizar')
            .setCallback((event: any) => console.log('--- Atualizar'))
            .menu
          .separator()
          .item('Apagar', 'fa-solid fa-trash')
            .setCallback((event: any) => console.log('--- Apagar'))
            .menu
          .cards
      .build()
  }
  },
  //
  [DemoKeys.CARDS_INFO_A]: {
    code: () => {
    return new SmzCardsBuilder<SmzCardsDemoData>()
        .setTitle('Demo Cards | Info A')
        .setSource(of(SmzCardsDemo))
        .template()
          .infoA()
            .setBulletsStyles('bg-red-500')
            .setVerticalBarStyles('border-red-500')
            .setCardStyles('bg-surface-50')
            .title(nameof<SmzCardsDemoData>('date'), 'Elemento')
              .transform((date) => moment(date).format('lll'))
              .template
            .subTitle(namesof<SmzCardsDemoData, SimpleNamedEntity>('type', 'name'))
              .enableGlobalFilter()
              .template
            .addTag(nameof<SmzCardsDemoData>('notes'))
              .transform((date) => null)
              .template
            .addTag(namesof<SmzCardsDemoData, SimpleNamedEntity>('type', 'name'))
              .setStyles('bg-green-200 text-surface-50')
              .template
            .addInfo(nameof<SmzCardsDemoData>('notes'), 'Último', 'bg-blue-500')
              .transform((date) => '6 gotas')
              .template
            .addInfo(nameof<SmzCardsDemoData>('notes'), 'Acumulado', 'bg-green-500')
              .transform((date) => '0.050 gotas')
              .template
            .addInfo(nameof<SmzCardsDemoData>('date'), 'Início')
              .transform((date) => moment(date).format('lll'))
              .hideInGrid()
              .template
            .addInfo(nameof<SmzCardsDemoData>('date'), 'Final')
              .transform((date) => moment(date).format('lll'))
              .hideInGrid()
              .template
            .template
          .cards
        .grid()
          .setLayout('col-12 lg:col-6 xl:col-4')
          .setPadding('p-2')
          .cards
        .list()
          .setLayout('col-12')
          .setPadding('px-0 pt-4')
          .cards
        .buttons()
          .item('Consultar')
            .setCallback((event: any) => console.log('--- Consultar', event))
            .menu
          .item('Confirmar')
            .askForConfirmation('Atenção', 'Confirma?')
            .setCallback((event: any) => console.log('--- Confirmar', event))
            .menu
          .cards
        .menu()
          .item('Atualizar')
            .setCallback((event: any) => console.log('--- Atualizar', event))
            .menu
          .separator()
          .item('Apagar', 'fa-solid fa-trash')
            .askForCriticalConfirmation('Atenção', 'Apaga ???')
            .setCallback((event: any) => console.log('--- Apagar', event))
            .menu
          .cards
      .build()
  }
  },
}