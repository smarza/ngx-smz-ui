import { DemoKeys } from '../../demos/demo-keys';
import { Store } from '@ngxs/store';
import { GlobalInjector, nameof, namesof, SmzTimelineBuilder, SimpleNamedEntity } from 'ngx-smz-ui';
import { of } from 'rxjs';
import { SmzCardsArchivedDemo, SmzCardsDemo, SmzCardsDemoData } from '../data/cards/cards-data';
import moment from 'moment';

const store = GlobalInjector.instance.get(Store);

export const TimelineDemo: { [key: string]: { code: () => void } } = {
  //
  [DemoKeys.TIMELINE_IMAGE_WITH_DETAILS]: {
    code: () => {
    return new SmzTimelineBuilder<SmzCardsDemoData>()
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
              .transform((date) => 'Sub título aqui')
              .template
            .addTag(namesof<SmzCardsDemoData, SimpleNamedEntity>('type', 'name'))
              .setStyles('px-2 py-1 text-xs bg-green-200 text-surface-600 rounded')
              .template
            .addTag(nameof<SmzCardsDemoData>('isArchived'))
              .setStyles('px-2 py-1 text-xs bg-amber-200 text-surface-600 rounded')
              .addIconConfiguration('fa-solid fa-box-archive', true, 'text-red-500 text-xs', 'Arquivado')
              .addIconConfiguration('fa-solid fa-box-archive', false, 'text-surface-100 text-xs')
              .template
            .addText(nameof<SmzCardsDemoData>('notes'))
              .shorten(60)
              .template
            .template
          .cards
        .view()
          .setAlign('alternate')
          .setLayout('vertical')
          .styleEvent('')
          .styleTimeline('')
          .addGap()
          .timeline
        .marker()
          .style('')
          .setIcon('fa-solid fa-bug')
          .timeline
        .buttons()
          .item('Consultar')
            .setCallback((event: any) => console.log('--- Consultar'))
            .menu
          .timeline
        .menu()
          .item('Atualizar')
            .setCallback((event: any) => console.log('--- Atualizar'))
            .menu
          .separator()
          .item('Apagar', 'fa-solid fa-trash')
            .setCallback((event: any) => console.log('--- Apagar'))
            .menu
          .timeline
      .build()
  }
  },
  //
  [DemoKeys.TIMELINE_INFO_A]: {
    code: () => {
    return new SmzTimelineBuilder<SmzCardsDemoData>()
        .setTitle('Demo Cards | Info A')
        .setSource(of([]))
        .setEmptyMessage('Vazio...')
        .template()
          .infoA()
            .setBulletsStyles('bg-red-500')
            .setVerticalBarStyles('border-red-500')
            .setCardStyles('bg-surface-50')
            .title(nameof<SmzCardsDemoData>('date'), 'Elemento')
              .transform((date) => moment(date).format('lll'))
              .template
            .subTitle(namesof<SmzCardsDemoData, SimpleNamedEntity>('type', 'name'))
              // .enableGlobalFilter()
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
        .view()
          .setAlign('alternate')
          .setLayout('vertical')
          .styleEvent('')
          .styleTimeline('')
          .addGap()
          .timeline
        .marker()
          .style('')
          .setIcon('fa-solid fa-bug')
          .timeline
        .buttons()
          .item('Consultar')
            .setCallback((event: any) => console.log('--- Consultar', event))
            .menu
          .item('Confirmar')
            .askForConfirmation('Atenção', 'Confirma?')
            .setCallback((event: any) => console.log('--- Confirmar', event))
            .menu
          .timeline
        .menu()
          .item('Atualizar')
            .setCallback((event: any) => console.log('--- Atualizar', event))
            .menu
          .separator()
          .item('Apagar', 'fa-solid fa-trash')
            .askForCriticalConfirmation('Atenção', 'Apaga ???')
            .setCallback((event: any) => console.log('--- Apagar', event))
            .menu
          .timeline
      .build()
  }
  },
  //
  [DemoKeys.TIMELINE_WITH_MULTIPLE_SOURCES]: {
    code: () => {
    return new SmzTimelineBuilder<SmzCardsDemoData>()
        .setTitle('Demo Cards | Multiple Sources')
        .sources()
          .addSource(of(SmzCardsDemo), 'Em atividade')
            .setAsDefault()
            .source
          .addSource(of(SmzCardsArchivedDemo), 'Arquivados')
            .source
          .timeline
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
              .transform((date) => 'Sub título aqui')
              .template
            .addTag(namesof<SmzCardsDemoData, SimpleNamedEntity>('type', 'name'))
              .setStyles('px-2 py-1 text-xs bg-green-200 text-surface-600 rounded')
              .template
            .addTag(nameof<SmzCardsDemoData>('isArchived'))
              .setStyles('px-2 py-1 text-xs bg-amber-200 text-surface-600 rounded')
              .addIconConfiguration('fa-solid fa-box-archive', true, 'text-red-500 text-xs', 'Arquivado')
              .addIconConfiguration('fa-solid fa-box-archive', false, 'text-surface-100 text-xs')
              .template
            .addText(nameof<SmzCardsDemoData>('notes'))
              .shorten(60)
              .template
            .template
          .cards
        .view()
          .setAlign('alternate')
          .setLayout('vertical')
          .styleEvent('')
          .styleTimeline('')
          .addGap()
          .timeline
        .marker()
          .style('')
          .setIcon('fa-solid fa-bug')
          .timeline
        .buttons()
          .item('Consultar')
            .setCallback((event: any) => console.log('--- Consultar'))
            .menu
          .timeline
        .menu()
          .item('Atualizar')
            .setCallback((event: any) => console.log('--- Atualizar'))
            .menu
          .separator()
          .item('Apagar', 'fa-solid fa-trash')
            .setCallback((event: any) => console.log('--- Apagar'))
            .menu
          .timeline
      .build()
  }
  },
}