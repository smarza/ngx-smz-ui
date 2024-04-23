import { DemoKeys } from '@demos/demo-keys';
import { nameof, namesof, SmzCardsBuilder, SimpleNamedEntity, SimpleEntity } from 'ngx-smz-ui';
import { BehaviorSubject, of } from 'rxjs';
import { SmzCardsArchivedDemo, SmzCardsDemo, SmzCardsDemoData } from '../data/cards/cards-data';
import moment from 'moment';
import { SmzCardsFlipCardDemo, SmzCardsFlipCardDemo2, SmzCardsFlipCardDemo3, SmzCardsFlipCardDemoData } from '../data/cards/flip-card-data';
import { FrontCardComponent } from '@components/cards/front-card.component';
import { BackCardComponent } from '@components/cards/back-card.component';
import { SmzCardComplexityData } from '../data/cards/flip-card-complexity';
import { ComplexityFrontCardComponent } from '@components/complexity/complexity-front-card.component';
import { ComplexityBackCardComponent } from '@components/complexity/complexity-back-card.component';

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
              .transform((item: SmzCardsDemoData, content) => {
                if (!item.showAsImage) {
                  content.maximize = false;
                  content.useServerPath = false;

                  content.transform.override = {
                    dataPath: 'assets/logo-documento.png'
                  };
                }

                return content;
              })
              .template
            .title(nameof<SmzCardsDemoData>('date'))
              .transform((date) => moment(date).format('lll'))
              .template
            .subTitle(namesof<SmzCardsDemoData, SimpleNamedEntity>('type', 'name'))
              .transform((date) => 'Sub título aqui')
              .template
            .addTag(namesof<SmzCardsDemoData, SimpleNamedEntity>('type', 'name'))
              .setStyles('px-2 py-1 text-xs bg-green-200 text-surface-600 rounded')
              .enableGlobalFilter()
              .template
            .addTag(nameof<SmzCardsDemoData>('isArchived'))
              .setStyles('px-2 py-1 text-xs bg-amber-200 text-surface-600 rounded')
              .addIconConfiguration('fa-solid fa-box-archive', true, 'text-red-500 text-xs', 'Arquivado')
              .addIconConfiguration('fa-solid fa-box-archive', false, 'text-surface-100 text-xs')
              .template
            .addText(nameof<SmzCardsDemoData>('notes'))
              .shorten(60)
              .enableGlobalFilter()
              .template
            // .addComponent(DemoInjectable1Component)
            //   .addInput('title', namesof<SmzCardsDemoData, SimpleNamedEntity>('type', 'name'))
            //   .addInput('subTitle', nameof<SmzCardsDemoData>('imagePath'))
            //   .template
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
          .item('Apagar Enabled', 'fa-solid fa-trash')
            .setCallback((event: any) => console.log('--- Apagar'))
            .setActivationRule(() => false)
            .menu
          .item('Apagar Disabled', 'fa-solid fa-trash')
            .setCallback((event: any) => console.log('--- Apagar'))
            .setActivationRule(() => true)
            .menu
          .cards
        .menu()
          .item('Atualizar')
            .setCallback((event: any) => console.log('--- Atualizar'))
            .menu
          .separator()
          .item('Apagar Enabled', 'fa-solid fa-trash')
            .setCallback((event: any) => console.log('--- Apagar'))
            .setActivationRule(() => false)
            .menu
          .item('Apagar Disabled', 'fa-solid fa-trash')
            .setCallback((event: any) => console.log('--- Apagar'))
            .setActivationRule(() => true)
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
  //
  [DemoKeys.CARDS_WITH_MULTIPLE_SOURCES]: {
    code: () => {
    return new SmzCardsBuilder<SmzCardsDemoData>()
        .setTitle('Demo Cards | Multiple Sources')
        .sources()
          .addSource(of(SmzCardsDemo), 'Em atividade')
            .setAsDefault()
            .source
          .addSource(of(SmzCardsArchivedDemo), 'Arquivados')
            .source
          .cards
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
  [DemoKeys.CARDS_FLIP_CARD_IMAGE]: {
    code: () => {

      const data$ = new BehaviorSubject<SmzCardsFlipCardDemoData[]>(SmzCardsFlipCardDemo2);

      setTimeout(() => {
        data$.next(SmzCardsFlipCardDemo3);
      }, 5000);

    return new SmzCardsBuilder<SmzCardsFlipCardDemoData>()
        .setTitle('Demo Cards | Flip Card | Image')
        // .debugMode()
        .setSource(data$)
        .setDataViewContainerStyles('justify-around ')
        .template()
          .flipCard()
            .setCardSize('160px', '240px')
            .setCardStyles('')
            .setContentStyles('')
            .setButtonsLocation('back')
            .setMenuLocation('back')
            // .useDataModelStatus('isSelected')
            .useStatusPersistence()
            .front()
              .image(nameof<SmzCardsFlipCardDemoData>('frontImage'))
                .setStyles('object-cover rounded-lg border-0 shadow-md')
                .disableMaximize()
                .template
              .front
            .back()
              .image(nameof<SmzCardsFlipCardDemoData>('backImage'))
                .setStyles('object-cover rounded-lg border-0 shadow-md')
                .disableMaximize()
                .template
              .back
            .template
          .cards
        .grid()
          .setLayout('')
          .setPadding('p-2')
          .cards
        .list()
          .setLayout('col-12')
          .setPadding('px-0 pt-4')
          .cards
        .buttons()
          .setStyleClass('p-button-sm bg-white text-black border-0')
          .item('Consultar')
            .setCallback((event: any) => console.log('--- Consultar'))
            .menu
          .cards
        .menu()
          .setStyleClass('p-button-sm rounded-full p-0 m-0 h-7 w-7 border-0 bg-white text-black')
          .item('Atualizar')
            .setCallback((event: any) => console.log('--- Atualizar'))
            .menu
          .separator()
          .item('Apagar Enabled', 'fa-solid fa-trash')
            .setCallback((event: any) => console.log('--- Apagar'))
            .setActivationRule(() => false)
            .menu
          .item('Apagar Disabled', 'fa-solid fa-trash')
            .setCallback((event: any) => console.log('--- Apagar'))
            .setActivationRule(() => true)
            .menu
          .cards
      .build()
  }
  },
  //
  [DemoKeys.CARDS_FLIP_CARD_COMPONENT]: {
    code: () => {

    const data$ = new BehaviorSubject<SmzCardsFlipCardDemoData[]>(SmzCardsFlipCardDemo2);

    // setTimeout(() => {
    //   data$.next(SmzCardsFlipCardDemo3);
    // }, 5000);

    return new SmzCardsBuilder<SmzCardsFlipCardDemoData>()
        .setTitle('Demo Cards | Flip Card | Component')
        // .debugMode()
        .setSource(data$)
        .template()
          .flipCard()
            .setCardSize('160px', '240px')
            .setCardStyles('')
            .setContentStyles('')
            .setButtonsLocation('back')
            .setMenuLocation('back')
            .enableAtLeastOneSelectedBehavior()
            .front()
              .component(FrontCardComponent)
                .addDataToInput('data')
                .addInput('isSelectable', true)
                .template
              .front
            .back()
              .component(BackCardComponent)
                .addDataToInput('data')
                .addContextToInput('context')
                .template
              .back
            .template
          .cards
        .grid()
          .setLayout('')
          .setPadding('p-2')
          .cards
        .list()
          .setLayout('col-12')
          .setPadding('px-0 pt-4')
          .cards
      .build()
  }
  },
  //
  [DemoKeys.CARDS_FLIP_CARD_HTML]: {
    code: () => {

    return new SmzCardsBuilder<SmzCardsFlipCardDemoData>()
        .setTitle('Demo Cards | Flip Card | Html')
        // .debugMode()
        .setSource(of(SmzCardsFlipCardDemo))
        .template()
          .flipCard()
            .setCardSize('160px', '240px')
            .setCardStyles('')
            .setContentStyles('')
            .setButtonsLocation('back')
            .setMenuLocation('back')
            .setFlipCounts(1)
            .useDataModelStatus('isSelected')
            .onChange((changes) => { console.log('onChange', changes); })
            .front()
              .html('<div class="w-full h-full bg-teal-600 rounded-lg shadow-lg"></div>')
              .front
            .back()
              .html('<div class="w-full h-full bg-purple-600 rounded-lg shadow-lg"></div>')
              .back
            .template
          .cards
        .grid()
          .setLayout('')
          .setPadding('p-2')
          .cards
        .list()
          .setLayout('col-12')
          .setPadding('px-0 pt-4')
          .cards
      .build()
  }
  },
  //
  [DemoKeys.CARDS_FLIP_COMPLEXITY]: {
    code: () => {
    return new SmzCardsBuilder<SimpleEntity<Number>>()
        .hideHeader()
        .hidePaginator()
        .setSource(of(SmzCardComplexityData))
        .template()
          .flipCard()
            .setCardSize('160px', '240px')
            .setCardStyles('')
            .setContentStyles('')
            .setToggleBehavior(1)
            .if(true)
              .applyData([{ key: 13, status: 'back' }, { key: 3, status: 'back' }])
              .endIf
            .front()
              .component(ComplexityFrontCardComponent)
                .addDataToInput('data')
                .template
              .front
            .back()
              .component(ComplexityBackCardComponent)
                .addDataToInput('data')
                .template
              .back
            .template
          .cards
        .grid()
          .setLayout('')
          .setPadding('p-2')
          .cards
      .build()
  }
  },
  //
  [DemoKeys.CARDS_FLIP_ONLY_FRONT]: {
    code: () => {
    return new SmzCardsBuilder<SmzCardsFlipCardDemoData>()
        .setTitle('Demo Cards | Flip Card | Html')
        // .debugMode()
        .setSource(of(SmzCardsFlipCardDemo))
        .template()
          .flipCard()
            .setCardSize('160px', '240px')
            .setCardStyles('')
            .setContentStyles('')
            .setButtonsLocation('back')
            .setMenuLocation('back')
            .onChange((changes) => { console.log('onChange', changes); })
            .front()
              .html('<div class="w-full h-full bg-teal-600 rounded-lg shadow-lg"></div>')
              .front
            .template
          .cards
        .grid()
          .setLayout('')
          .setPadding('p-2')
          .cards
        .list()
          .setLayout('col-12')
          .setPadding('px-0 pt-4')
          .cards
      .build()
  }
  },
  //
  [DemoKeys.CARDS_RAW]: {
    code: () => {
    return new SmzCardsBuilder<SmzCardsDemoData>()
        .setTitle('Demo Cards | Raw')
        // .debugMode()
        .setSource(of(SmzCardsDemo))
        .template()
          .raw()
            .setGrid(BackCardComponent)
              .addDataToInput('data')
              .template
            .setList(FrontCardComponent)
              .addDataToInput('data')
              .addInput('isSelectable', true)
              .template
            .template
          .cards
        .grid()
          .setLayout('')
          .setPadding('p-2')
          .cards
        .list()
          .setLayout('col-12')
          .setPadding('px-0 pt-4')
          .cards
      .build()
  }
  },
}