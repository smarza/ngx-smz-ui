import { DemoKeys } from '@demos/demo-keys';
import { Store } from '@ngxs/store';
import { DemoFeatureSelectors } from '@states/demo/demo.selectors';
import { GlobalInjector, SmzDialogBuilder, SmzDialogsService, SmzFormsResponse, SmzFormViewdata, SmzTableBuilder, ToastActions } from 'ngx-smz-ui';
import { Observable, of } from 'rxjs';
import { DemoFeatureActions } from '../../state/demo/demo.actions';

const service = GlobalInjector.instance.get(SmzDialogsService);
const store = GlobalInjector.instance.get(Store);

export const DialogsDemo: { [key: string]: () => void } = {
  //
  [DemoKeys.DIALOGS_HEADER_WITH_TITLE]: () => {
    service.open(
      new SmzDialogBuilder<void>()
        .setTitle(`Header With Title Demo`)
        .setLayout('EXTRA_SMALL', 'col-12')
        .setLayout('EXTRA_LARGE', 'col-8')
        .allowMinimize('TITLE DEMO')
      .build()
    );
  },
  //
  [DemoKeys.DIALOGS_HEADER_HIDDEN]: () => {
    service.open(
      new SmzDialogBuilder<void>()
        .setLayout('EXTRA_SMALL', 'col-12')
        .setLayout('EXTRA_LARGE', 'col-8')
        .hideHeader()
        .buttons()
          .ok()
            .buttons
          .dialog
      .build()
    );
  },
  //
  [DemoKeys.DIALOGS_HEADER_WITH_MAXIMIZE]: () => {
    service.open(
      new SmzDialogBuilder<void>()
        .setTitle(`Some Title Here`)
        .setLayout('EXTRA_SMALL', 'col-12')
        .setLayout('EXTRA_LARGE', 'col-8')
        .allowMaximize()
      .build()
    );
  },
  //
  [DemoKeys.DIALOGS_HEADER_WITH_MINIMIZE]: () => {
    service.open(
      new SmzDialogBuilder<void>()
        .setTitle(`Minimize Demo`)
        .setLayout('EXTRA_SMALL', 'col-12')
        .setLayout('EXTRA_LARGE', 'col-8')
        .allowMinimize('DEMO A')
      .build()
    );
  },
  //
  [DemoKeys.DIALOGS_CONTROLS_CLOSE_ON_ESCAPE]: () => {
    service.open(
      new SmzDialogBuilder<void>()
        .setTitle(`Some Title Here`)
        .setLayout('EXTRA_SMALL', 'col-12')
        .setLayout('EXTRA_LARGE', 'col-8')
        .closeOnEscape()
      .build()
    );
  },
  //
  [DemoKeys.DIALOGS_CONTROLS_CONFIRM_ON_ENTER]: () => {
    service.open(
      new SmzDialogBuilder<void>()
        .setTitle(`Some Title Here`)
        .setLayout('EXTRA_SMALL', 'col-12')
        .setLayout('EXTRA_LARGE', 'col-8')
        .confirmOnEnter()
        .buttons()
          .confirm()
          .buttons
        .dialog
      .build()
    );
  },
  //
  [DemoKeys.DIALOGS_CONTROLS_DISMISSABLE_MASK]: () => {
    service.open(
      new SmzDialogBuilder<void>()
        .setTitle(`Some Title Here`)
        .setLayout('EXTRA_SMALL', 'col-12')
        .setLayout('EXTRA_LARGE', 'col-8')
        .dismissableMask()
      .build()
    );
  },
  //
  [DemoKeys.DIALOGS_CONTROLS_BASE_Z_INDEX]: () => {
    service.open(
      new SmzDialogBuilder<void>()
      .setTitle('Base z-index sample')
      .setLayout('EXTRA_SMALL', 'col-12')
      .setLayout('SMALL', 'col-12')
      .setLayout('MEDIUM', 'col-6')
      .setLayout('LARGE', 'col-6')
      .setLayout('EXTRA_LARGE', 'col-6')
      // .baseZIndex(500)
      .closeOnEscape()
      .dismissableMask()
      .confirmOnEnter()
        .form()
        .group()
          .calendar('date', 'Agendamento')
            .useDateAndTime()
            .group
        .dropdown('input1', 'I\'m required', [{ id: '1', name: 'Option 1'}, { id: '2', name: 'Option 2'}, { id: '3', name: 'Option 3'}])
              .validators().required()
              .group
          .form
        .dialog
      .build()
    );
  },
  //
  [DemoKeys.DIALOGS_CONTROLS_OPEN_MAXIMIZED]: () => {
    service.open(
      new SmzDialogBuilder<void>()
        .setTitle(`Some Title Here`)
        .setLayout('EXTRA_SMALL', 'col-12')
        .setLayout('EXTRA_LARGE', 'col-8')
        .openMaximized()
      .build()
    );
  },
  //
  [DemoKeys.DIALOGS_CONTROLS_HIDE_RESTORE_BUTTON]: () => {
    service.open(
      new SmzDialogBuilder<void>()
        .setTitle(`Some Title Here`)
        .setLayout('EXTRA_SMALL', 'col-12')
        .setLayout('EXTRA_LARGE', 'col-8')
        .openMaximized()
        .hideRestoreButton()
      .build()
    );
  },
  //
  [DemoKeys.DIALOGS_FOOTER_HIDDEN]: () => {
    service.open(
      new SmzDialogBuilder<void>()
        .setTitle(`Some Title Here`)
        .setLayout('EXTRA_SMALL', 'col-12')
        .setLayout('EXTRA_LARGE', 'col-8')
        .hideFooter()
      .build()
    );
  },
  //
  [DemoKeys.DIALOGS_BUTTONS_BUILT_IN]: () => {
    service.open(
      new SmzDialogBuilder<void>()
        .setTitle(`Some Title Here`)
        .setLayout('EXTRA_SMALL', 'col-12')
        .setLayout('EXTRA_LARGE', 'col-8')
        .buttons()
          .cancel()
            .callback(() => { console.log('cancel'); })
            .buttons
          .ok()
            .callback(() => { console.log('ok'); })
            .buttons
          .confirm()
            .callback(() => { console.log('confirm'); })
            .buttons
        .dialog
      .build()
    );
  },
  //
  [DemoKeys.DIALOGS_BUTTONS_SAVE]: () => {
    service.open(
      new SmzDialogBuilder<void>()
        .setTitle(`Some Title Here`)
        .setLayout('EXTRA_SMALL', 'col-12')
        .setLayout('EXTRA_LARGE', 'col-8')
        .buttons()
          .cancel()
            .buttons
          .save()
            .buttons
        .dialog
      .build()
    );
  },
  //
  [DemoKeys.DIALOGS_BUTTONS_RENAMING]: () => {
    service.open(
      new SmzDialogBuilder<void>()
        .setTitle(`Some Title Here`)
        .setLayout('EXTRA_SMALL', 'col-12')
        .setLayout('EXTRA_LARGE', 'col-8')
        .buttons()
          .cancel('NO')
            .callback(() => { console.log('NO'); })
            .buttons
          .ok('YES')
            .callback(() => { console.log('YES'); })
            .buttons
        .dialog
      .build()
    );
  },
  //
  [DemoKeys.DIALOGS_BUTTONS_STYLING]: () => {
    service.open(
      new SmzDialogBuilder<void>()
        .setTitle(`Some Title Here`)
        .buttons()
          .custom('OUTLINED DANGER')
            .setClass('p-button-outlined p-button-danger')
            .buttons
          .custom('OUTLINED INFO')
            .setClass('p-button-outlined p-button-info')
            .buttons
          .custom('OUTLINED HELP')
            .setClass('p-button-outlined p-button-help')
            .buttons
          .custom('PRIMARY')
            .setClass('p-button-primary')
            .buttons
          .custom('SECONDARY')
            .setClass('p-button-secondary')
            .buttons
          .custom('SUCCESS')
            .setClass('p-button-success')
            .buttons
          .dialog
      .build()
    );
  },
  //
  [DemoKeys.DIALOGS_TOPBAR_BUTTONS]: () => {
    service.open(
      new SmzDialogBuilder<void>()
        .setTitle(`Some Title Here`)
        .buttons()
          .topbar()
            .setIcon('fa-solid fa-question')
            .setCallback(() => { console.log('Help'); })
            .setTooltip('Ajuda')
            .buttons
          .topbar()
            .setIcon('fa-solid fa-bug')
            .setCallback(() => { console.log('Report'); })
            .setTooltip('Reportar Bug')
            .setClass('text-red-500')
            .buttons
          .dialog
      .build()
    );
  },
  //
  [DemoKeys.DIALOGS_BUTTONS_REODERING]: () => {
    service.open(
      new SmzDialogBuilder<void>()
        .setTitle(`Some Title Here`)
        .buttons()
          .showCustomFirst()
          .confirm()
            .buttons
          .custom('CUSTOM FIRST')
            .buttons
          .dialog
      .build()
    );
  },
  //
  [DemoKeys.DIALOGS_BUTTONS_CLOSE_DIALOG]: () => {
    service.open(
      new SmzDialogBuilder<void>()
        .setTitle(`Some Title Here`)
        .buttons()
          .custom('CLOSE')
            .closeDialog()
            .buttons
          .dialog
      .build()
    );
  },
  //
  [DemoKeys.DIALOGS_BUTTONS_DEPENDS_ON_VALIDATION]: () => {
    service.open(
      new SmzDialogBuilder<void>()
        .setTitle(`Some Title Here`)
        .form()
        .group()
          .setLayout('EXTRA_SMALL', 'col-12')
          .checkbox('input', 'Is Valid ?')
            .validators()
            .required()
          .group
        .form
      .dialog
        .buttons()
          .custom('CLOSE IF VALID')
            .dependsOnValidation()
            .closeDialog()
            .buttons
          .dialog
      .build()
    );
  },
  //
  [DemoKeys.DIALOGS_BUTTONS_BLOCK_UI]: () => {
    service.open(
      new SmzDialogBuilder<{ choiceId: Number }>()
        .setTitle(`Some Title Here`)
        .form()
        .group()
          .setLayout('EXTRA_SMALL', 'col-12')
          .radioGroup('choice', 'Testing...', [{ id: 0, name: 'Failure'}, { id: 1, name: 'Success'}])
          .validators().required()
          .group
        .form
      .dialog
        .buttons()
          .custom('BLOCK')
            .blockUi(DemoFeatureActions.BlockUiDemoSuccess, DemoFeatureActions.BlockUiDemo)
            .dependsOnValidation()
            .callback(data => { ExecuteBlockUiDemo(data.choiceId)})
            .closeDialog()
            .buttons
          .dialog
      .build()
    );
  },
  //
  [DemoKeys.DIALOGS_FROM_UI_DEFINITION_CREATE]: () => {
    service.open(
      new SmzDialogBuilder<void>()
        .setTitle(`Create form from ui definition`)
        .setLayout('EXTRA_SMALL', 'col-12')
        .setLayout('LARGE', 'col-4')
        .setLayout('EXTRA_LARGE', 'col-3')
        .fromUiDefinition('entity')
        .dialog
        .buttons()
          .confirm()
            .dependsOnValidation()
            .buttons
          .dialog
      .build()
    );
  },
  //
  [DemoKeys.DIALOGS_FROM_UI_DEFINITION_UPDATE]: () => {
    service.open(
      new SmzDialogBuilder<void>()
        .setTitle(`Update form from ui definition`)
        .setLayout('EXTRA_SMALL', 'col-12')
        .setLayout('LARGE', 'col-4')
        .setLayout('EXTRA_LARGE', 'col-3')
        .fromUiDefinition('entity')
          .forEntity({
            name: 'Name',
            company: 'Company',
            country: {
              name: 'Brazil',
              id: '55e08b38-cec6-4063-acd0-25747f31dc59'
            }
          })
        .dialog
        .buttons()
          .confirm()
            .dependsOnValidation()
            .buttons
          .dialog
      .build()
    );
  },
  //
  [DemoKeys.DIALOGS_IF]: () => {
    service.open(
      new SmzDialogBuilder<void>()
        .if(true)
          .setTitle(`Title inside first if`)
          .endIf
        .if(false)
          .setTitle(`Title inside second if`)
          .endIf
        .setLayout('EXTRA_SMALL', 'col-12')
        .setLayout('EXTRA_LARGE', 'col-8')
      .build()
    );
  },
  //
  [DemoKeys.DIALOGS_WITH_FORM]: () => {
    service.open(
      new SmzDialogBuilder<void>()
        .setTitle(`Form`)
        .setLayout('EXTRA_SMALL', 'col-12')
        .setLayout('EXTRA_LARGE', 'col-8')
        .form()
        .showMultipleErrorsMessages()
        .group('Chave correta: access')
          .textButton('key', 'Chave', '',
            (response: SmzFormsResponse<any>, utils: SmzFormViewdata): Observable<{ isValid: boolean, messages?: string[] }> => {
              console.log('callback data...', response);

              if (response.data.key === 'access') {
                utils.updateInputValue('name', 'user.name');
                utils.updateInputValue('email', 'user@email.com');
                utils.updateInputValue('sector', 'user.sector');
                utils.updateInputValue('identifier', 'user.identifier');
                utils.updateInputValue('isContracted', true);
                store.dispatch(new ToastActions.Success('Chave válida'));
                return of({ isValid: true });
              }
              else {
                utils.updateInputValue('name', '');
                utils.updateInputValue('email', '');
                utils.updateInputValue('sector', '');
                utils.updateInputValue('identifier', '');
                utils.updateInputValue('isContracted', null);
                store.dispatch(new ToastActions.Error('Chave Inválida'));
                return of({ isValid: false, messages: ['Chave Inválida'] });
              }

            })
            .useLabel('Buscar')
            .validators()
              .required()
            .group
          .form

        .group('Preenchimento automático')
          .text('name', 'Nome')
            .disable()
            .validators()
              .required()
            .group
          .text('email', 'Email')
            .disable()
            .validators()
              .required()
              .email()
            .group
          .text('sector', 'Gerência')
            .disable()
            .validators()
              .required()
            .group

          // OCULTOS
          .text('identifier', 'Identificador')
            .disable()
            .hide()
            .validators()
              .required()
            .group
          .switch('isContracted', 'IsContracted')
            .disable()
            .hide()
            .group

          .form
          .dialog
      .build()
    );
  },
    //
    [DemoKeys.DIALOGS_WITH_FOCUS_FORM]: () => {
      service.open(
        new SmzDialogBuilder<void>()
          .setTitle(`Form`)
          .setLayout('EXTRA_SMALL', 'col-12')
          .setLayout('EXTRA_LARGE', 'col-8')
          .disableAutoFocus()
          .form()
            .group()
              .dropdown('plate', 'Chapa', [])
                .validators().required()
                .group
              .list('input1', 'I\'m not required', [1.1, 2, 3.1235])
                .useFractionNumberInput('Ponto', 3)
                .setLimitCount(4)
                .useDialogEditMode()
                .allowOnlyUniqueData()
                .buttons().all().list
                .group
              .form
              .dialog
        .build()
      );
    },
  //
  [DemoKeys.DIALOGS_WITH_TABLE_SELECTION]: () => {
    service.open(
      new SmzDialogBuilder<void>()
        .setTitle(`Form`)
        .setLayout('EXTRA_SMALL', 'col-12')
        .setLayout('EXTRA_LARGE', 'col-8')
        .table(store.select(DemoFeatureSelectors.all), new SmzTableBuilder()
          .setTitle('Selecione pelo menos um para validar o form')
          .setEmptyFeedbackMessage('Nenhum histórico encontrado')
          .setEmptyFeedbackImage('')
          .enableGlobalFilter()
          .useStrippedStyle()
          .allowDefaultMultiSelection()
          .setSelectionAsRequired()
          .setMultiSelectionCallback((selection: any[]) => {
            console.log('setMultiSelectionCallback', selection);
          })
          .setSize('small')
          .menu()
            .item('Logar')
              .setCallback((item: any): void => console.log(item))
              .menu
            .table
          .columns()
            .text('company', 'Código', '16em')
              .disableFilter()
              .columns
            .text('name', 'Nome')
              .disableFilter()
              .columns
            .table
          .build()
        )
      .buttons()
        .confirm()
          .dependsOnValidation()
          .buttons
        .dialog
      .build()
    );
  },
  //
  [DemoKeys.DIALOGS_WITH_MARKDOWN]: () => {

    const markdown = `## Markdown __rulez__!
---

### Syntax highlight
\`\`\`typescript
const language = 'typescript';
\`\`\`

### Lists
1. Ordered list
2. Another bullet point
    - Unordered list
    - Another unordered bullet

### Blockquote
> Blockquote to the max`;

    service.open(
      new SmzDialogBuilder<void>()
        .setTitle(`Dialog with Markdown`)
        .setLayout('EXTRA_SMALL', 'col-12')
        .setLayout('EXTRA_LARGE', 'col-8')
        .markdown(markdown)
      .build()
    );
  },
  //
  [DemoKeys.DIALOGS_HELP_CUSTOM_BUTTON]: () => {
    service.open(
      new SmzDialogBuilder<void>()
        .setLayout('EXTRA_SMALL', 'col-12')
        .setLayout('EXTRA_LARGE', 'col-8')
        .buttons()
          .help()
            .addSourceFromCustomData('<html><body><b>Teste</b></body></html>')
          .buttons
        .dialog
      .build()
    );
  },
  //
  [DemoKeys.DIALOGS_HELP_ASSETS_BUTTON]: () => {
    service.open(
      new SmzDialogBuilder<void>()
        .setLayout('EXTRA_SMALL', 'col-12')
        .setLayout('EXTRA_LARGE', 'col-8')
        .buttons()
          .help()
            .addSourceFromAssets('help/role-claims/index.html')
            .setTitle('Help')
            .setTooltip('Help')
          .buttons
        .dialog
      .build()
    );
  },
}

function ExecuteBlockUiDemo(value: Number): void {
    setTimeout(() => {
      store.dispatch(new DemoFeatureActions.BlockUiDemo(value));
    }, 2000);
}