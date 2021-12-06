import { DemoKeys } from '@demos/demo-keys';
import { Store } from '@ngxs/store';
import { GlobalInjector, SmzDialogBuilder, SmzDialogsService } from 'ngx-smz-ui';
import { DemoFeatureActions } from '../../state/demo/demo.actions';

const service = GlobalInjector.instance.get(SmzDialogsService);
const store = GlobalInjector.instance.get(Store);

export const DialogsDemo: { [key: string]: () => void } = {
  //
  [DemoKeys.DIALOGS_HEADER_WITH_TITLE]: () => {
    service.open(
      new SmzDialogBuilder<void>()
        .setTitle(`Some Title Here`)
        .setLayout('EXTRA_SMALL', 'col-12')
        .setLayout('EXTRA_LARGE', 'col-8')
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
        .setTitle(`Some Title Here`)
        .setLayout('EXTRA_SMALL', 'col-12')
        .setLayout('EXTRA_LARGE', 'col-8')
        .baseZIndex(-1)
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
}

function ExecuteBlockUiDemo(value: Number): void {
    setTimeout(() => {
      store.dispatch(new DemoFeatureActions.BlockUiDemo(value));
    }, 2000);
}