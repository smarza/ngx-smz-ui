import { DemoKeys } from '@demos/demo-keys';
import { DemoInjectable5Component } from '@features/home/components/demo-injectable/demo-injectable-5.component';
import { Store } from '@ngxs/store';
import { DemoFeatureSelectors } from '@states/demo/demo.selectors';
import { getFormInputFromDialog, GlobalInjector, SimpleNamedEntity, SmzClipboardService, SmzDialog, SmzDialogBuilder, SmzDialogsService, SmzFileControl, SmzForm, SmzFormsResponse, SmzFormViewdata, SmzTableBuilder, ToastActions } from 'ngx-smz-ui';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { DemoFeatureActions } from '../../state/demo/demo.actions';
import { UntypedFormGroup } from '@angular/forms';

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
  [DemoKeys.DIALOGS_COMPONENT_FORM]: () => {
    service.open(
      new SmzDialogBuilder<any>()
        .debugMode()
        .setTitle(`Header With Title Demo`)
        .setLayout('EXTRA_SMALL', 'col-12')
        .setLayout('EXTRA_LARGE', 'col-8')
        .postProcessResponse((data: any, config: SmzDialog<any>): any => {
          const fileInput = getFormInputFromDialog<SmzFileControl>('file', config);
          const base64 = fileInput.base64;
          return { ...data, file: base64 };
        })
        .form()
          .group()
            .text('name', 'Nome')
              .validators().required().input
              .group
            .calendar('date', 'Agendamento')
              .useDateAndTime()
              .group
          .dropdown('input1', 'I\'m required', [{ id: '1', name: 'Option 1'}, { id: '2', name: 'Option 2'}, { id: '3', name: 'Option 3'}])
              // .validators().required()
              .group
          .file('file', 'Confirmação')
              .useGlobalLoader()
              .useBinaryFormat()
              .validators().required().input
              .group
            .form
            .dialog
        .component(DemoInjectable5Component)
          .dialog
        .buttons()
          .confirm()
            .callback((data) => { console.log('OK', data) })
            .buttons
        .dialog
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
              .validators().required().input
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
            .callback(() => {
              const clipboard = GlobalInjector.instance.get(SmzClipboardService);

              clipboard.readFromClipboard()
                .then(text => {
                  console.log('>>>> Texto da área de transferência:', text);
                })
                .catch(err => {
                  console.error('Erro ao ler a área de transferência:', err);
                });
             })
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
          .checkbox('input', 'Is Valid ?', false)
            .validators().required().input
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
          .validators().required().input
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
        // .debugMode()
        .setTitle(`Create form from ui definition`)
        .setLayout('EXTRA_SMALL', 'col-12')
        .setLayout('LARGE', 'col-4')
        .setLayout('EXTRA_LARGE', 'col-3')
        .fromUiDefinition('attachment')
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
        .fromUiDefinition('attachment')
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
            .validators().required().input
            .group
            .multiselect('role', 'Perfil', [
              { id: "1", name: "teste 1" },
              { id: "2", name: "teste 2" },
              { id: "3", name: "teste 3" },
              { id: "4", name: "teste 4" }
            ])
              .setLayout('EXTRA_SMALL', 'col-12')
              .setLayout('EXTRA_LARGE', 'col-12')
              .validators().required().input
              .group
          .form

        .group('Preenchimento automático')
          .text('name', 'Nome')
            .disable()
            .validators().required().input
            .group
          .text('email', 'Email')
            .disable()
            .validators().required().email().input
            .group
          .text('sector', 'Gerência')
            .disable()
            .validators().required().input
            .group

          // OCULTOS
          .text('identifier', 'Identificador')
            .disable()
            .hide()
            .validators().required().input
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
  [DemoKeys.DIALOGS_WITH_MULTIPLE_FORMS]: () => {
    service.open(
      new SmzDialogBuilder<void>()
        .setTitle(`Form`)
        .setLayout('EXTRA_SMALL', 'col-12')
        .setLayout('EXTRA_LARGE', 'col-8')
        .form()
          .showMultipleErrorsMessages()
          .group('Grupo de Controle', 'control')
            .dropdown('plant', 'Planta', [{ id: 'id', name: 'Opção 1'}])
              .showClear()
              .validators().required().input
              .addGroupReaction('groupName', (plant: SimpleNamedEntity) => {
                if (plant == null) {
                  return false;
                }
                else {
                  return true;
                }
              })
              .group
            .form
          .dialog

        .form()
          .group('Grupo controlado', 'groupName')
            .hide()
            .text('name', 'Nome')
              .validators().required().input
              .group
            .text('email', 'Email')
              .validators().required().email().input
              .group
            .text('sector', 'Gerência')
              .validators().required().input
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
              .validators().required().input
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
  //
  [DemoKeys.DIALOGS_WITH_CUSTOM_FORM_VALIDATION]: () => {
    const validationMessage = new BehaviorSubject<string[]>([]);
    service.open(
      new SmzDialogBuilder<void>()
        .setTitle(`Dialog with Custom Form Validation`)
        .setLayout('EXTRA_SMALL', 'col-12')
        .setLayout('LARGE', 'col-4')
        .setLayout('EXTRA_LARGE', 'col-3')
        .messageFromSubject(validationMessage)
        .form()
          .setCustomValidator(runFormBoundingBoxValidator(validationMessage))
          .runCustomFunctionsOnLoad()
          .group('X')
            .number('boundingBoxMinX', 'Min')
              .setFraction(1,12)
              .setLayout('LARGE', 'col-6')
              .setLayout('MEDIUM', 'col-6')
              .setLayout('SMALL', 'col-12')
              .setLayout('EXTRA_SMALL', 'col-12')
              .group
            .number('boundingBoxMaxX', 'Max')
              .setFraction(1,12)
              .setLayout('LARGE', 'col-6')
              .setLayout('MEDIUM', 'col-6')
              .setLayout('SMALL', 'col-12')
              .setLayout('EXTRA_SMALL', 'col-12')
              .group
            .form
          .group('Y')
            .number('boundingBoxMinY', 'Min')
              .setFraction(1,12)
              .setLayout('LARGE', 'col-6')
              .setLayout('MEDIUM', 'col-6')
              .setLayout('SMALL', 'col-12')
              .setLayout('EXTRA_SMALL', 'col-12')
              .group
            .number('boundingBoxMaxY', 'Max')
              .setFraction(1,12)
              .setLayout('LARGE', 'col-6')
              .setLayout('MEDIUM', 'col-6')
              .setLayout('SMALL', 'col-12')
              .setLayout('EXTRA_SMALL', 'col-12')
              .group
            .form
          .group('Z')
            .number('boundingBoxMinZ', 'Min')
              .setFraction(1,12)
              .setLayout('LARGE', 'col-6')
              .setLayout('MEDIUM', 'col-6')
              .setLayout('SMALL', 'col-12')
              .setLayout('EXTRA_SMALL', 'col-12')
              .group
            .number('boundingBoxMaxZ', 'Max')
              .setFraction(1,12)
              .setLayout('LARGE', 'col-6')
              .setLayout('MEDIUM', 'col-6')
              .setLayout('SMALL', 'col-12')
              .setLayout('EXTRA_SMALL', 'col-12')
              .group
            .form
          .dialog
        .buttons()
          .confirm()
            .dependsOnValidation()
            .callback(() => console.log('Button Pressed'))
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

function runFormBoundingBoxValidator(validationMessage: BehaviorSubject<string[]>): (data: SmzFormsResponse<any>, formGroup: UntypedFormGroup) => boolean {
  return (data: SmzFormsResponse<any>, formGroup: UntypedFormGroup) => {
    console.log(data);
    const controls = formGroup.controls;

    const thereIsAtLeastOneValue = Object.values(controls).some(ctrl => ctrl.value !== null && ctrl.value !== undefined);

    if (thereIsAtLeastOneValue) {
      const allControlsMustHaveValue = Object.values(controls).every(ctrl => ctrl.value !== null && ctrl.value !== undefined);

      if (allControlsMustHaveValue) {
        console.log('OK');
        validationMessage.next([]);
        return true;
      }
      else {
        console.log('ERROR');
        validationMessage.next(['<div class="text-red-500">Mensagem de erro aqui</div>']);
        return false;
      }
    }

    console.log('OKok');
    validationMessage.next([]);
    return true;
  };
}