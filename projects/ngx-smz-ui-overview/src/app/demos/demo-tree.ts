import { DemoTreeNode } from '@models/demo';
import { DemoKeys } from './demo-keys';
import { DialogsDemo } from './functions/dialogs-demo';
import { FormsDemo } from './functions/forms-demo';
import { TablesDemo } from './functions/tables-demo';
import { ValidatorsDemo } from './functions/validators-demo';
import { ChartsDemo } from './functions/charts-demo';
import { DocumentsDemo } from './functions/documents-demo';
import { TreesDemo } from './functions/trees-demo';
import { MenusDemo } from './functions/menus-demo';

export const TreeDemoData: DemoTreeNode[] = [
  {
    label: 'Charts',
    type: 'Category',
    children: [
      {
        label: 'Vertical Bar', icon: 'fas fa-code', type: 'Demo',
        demoType: 'chart',
        notes: '',
        data: ChartsDemo[DemoKeys.CHARTS_VERTICAL_BAR]
      },
    ]
  },
  {
    label: 'Menu',
    type: 'Category',
    children: [
      {
        label: 'Menu If True', icon: 'fas fa-code', type: 'Demo',
        demoType: 'menu',
        notes: 'kkkk',
        data: MenusDemo[DemoKeys.MENU_IF_TRUE]
      },
      {
        label: 'Menu If False', icon: 'fas fa-code', type: 'Demo',
        demoType: 'menu',
        notes: '',
        data: MenusDemo[DemoKeys.MENU_IF_FALSE]
      },
    ]
  },
  // {
  //   label: 'Components',
  //   type: 'Category',
  //   children: [
  //     {
  //       label: 'Inputs', icon: 'fas fa-code', type: 'Demo',
  //       demoType: 'dialog',
  //       notes: '',
  //       data: null
  //     },
  //     {
  //       label: 'Outputs', icon: 'fas fa-code', type: 'Demo',
  //       demoType: 'dialog',
  //       notes: '',
  //       data: null
  //     },
  //     {
  //       label: 'Error Messages', icon: 'fas fa-code', type: 'Demo',
  //       demoType: 'dialog',
  //       notes: '',
  //       data: null
  //     },
  //   ]
  // },
  {
    label: 'Dialogs',
    type: 'Category',
    children: [
      {
        label: 'Ui Definitions', type: 'SubCategory',
        children: [
          {
            label: 'Create', icon: 'fas fa-code', type: 'Demo',
            demoType: 'dialog',
            notes: '',
            data: DialogsDemo[DemoKeys.DIALOGS_FROM_UI_DEFINITION_CREATE]
          },
          {
            label: 'Update', icon: 'fas fa-code', type: 'Demo',
            demoType: 'dialog',
            notes: '',
            data: DialogsDemo[DemoKeys.DIALOGS_FROM_UI_DEFINITION_UPDATE]
          },
        ]
      },
      {
        label: 'Header', type: 'SubCategory',
        children: [
          {
            label: 'With Title', icon: 'fas fa-code', type: 'Demo',
            demoType: 'dialog',
            data: DialogsDemo[DemoKeys.DIALOGS_HEADER_WITH_TITLE]
          },
          {
            label: 'Hidden Header', icon: 'fas fa-code', type: 'Demo',
            demoType: 'dialog',
            notes: 'The dialog header should be hidden',
            data: DialogsDemo[DemoKeys.DIALOGS_HEADER_HIDDEN]
          },
          {
            label: 'With Maximize', icon: 'fas fa-code', type: 'Demo',
            demoType: 'dialog',
            data: DialogsDemo[DemoKeys.DIALOGS_HEADER_WITH_MAXIMIZE]
          },
        ]
      },
      {
        label: 'Controls', type: 'SubCategory',
        children: [
          {
            label: 'Close on Escape', icon: 'fas fa-code', type: 'Demo',
            demoType: 'dialog',
            notes: 'Press escape to close the dialog',
            data: DialogsDemo[DemoKeys.DIALOGS_CONTROLS_CLOSE_ON_ESCAPE]
          },
          {
            label: 'Confirm on Enter', icon: 'fas fa-code', type: 'Demo',
            demoType: 'dialog',
            notes: 'Press enter to confirm the dialog',
            data: DialogsDemo[DemoKeys.DIALOGS_CONTROLS_CONFIRM_ON_ENTER]
          },
          {
            label: 'Dismissable Mask', icon: 'fas fa-code', type: 'Demo',
            demoType: 'dialog',
            notes: 'Click outside to close the dialog',
            data: DialogsDemo[DemoKeys.DIALOGS_CONTROLS_DISMISSABLE_MASK]
          },
          {
            label: 'Base z-index', icon: 'fas fa-code', type: 'Demo',
            demoType: 'dialog',
            notes: 'The dialog will appear behind the frames',
            data: DialogsDemo[DemoKeys.DIALOGS_CONTROLS_BASE_Z_INDEX]
          },
        ]
      },
      {
        label: 'Data', type: 'SubCategory',
        children: [
          {
            label: 'Test', icon: 'fas fa-code', type: 'Demo',
            demoType: 'dialog',
            data: DialogsDemo[DemoKeys.DIALOGS_FOOTER_HIDDEN]
          },
        ]
      },
      {
        label: 'Buttons', type: 'SubCategory',
        children: [
          {
            label: 'Built-in Buttons', icon: 'fas fa-code', type: 'Demo',
            demoType: 'dialog',
            notes: 'By default, the built-in buttons visibility follows the configuration provided on the app module.',
            data: DialogsDemo[DemoKeys.DIALOGS_BUTTONS_BUILT_IN]
          },
          {
            label: 'Renaming Buttons', icon: 'fas fa-code', type: 'Demo',
            demoType: 'dialog',
            notes: 'The CANCEL and OK buttons should be renamed to NO and YES.',
            data: DialogsDemo[DemoKeys.DIALOGS_BUTTONS_RENAMING]
          },
          {
            label: 'Styling Buttons', icon: 'fas fa-code', type: 'Demo',
            demoType: 'dialog',
            notes: 'Some styling samples.',
            data: DialogsDemo[DemoKeys.DIALOGS_BUTTONS_STYLING]
          },
          {
            label: 'Custom Buttons', icon: 'fas fa-code', type: 'Demo',
            demoType: 'dialog',
            notes: 'Create unlimited buttons with custom buttons.',
            data: DialogsDemo[DemoKeys.DIALOGS_BUTTONS_STYLING]
          },
          {
            label: 'Reordering Custom Buttons', icon: 'fas fa-code', type: 'Demo',
            demoType: 'dialog',
            notes: 'By default, all custom buttons are placed at the right side of the built-in buttons.',
            data: DialogsDemo[DemoKeys.DIALOGS_BUTTONS_REODERING]
          },
          {
            label: 'Close Dialog', icon: 'fas fa-code', type: 'Demo',
            demoType: 'dialog',
            notes: 'By default, custom buttons doesn\'t close the dialog.',
            data: DialogsDemo[DemoKeys.DIALOGS_BUTTONS_CLOSE_DIALOG]
          },
          {
            label: 'Depends On Validation', icon: 'fas fa-code', type: 'Demo',
            demoType: 'dialog',
            notes: 'By default, custom buttons are clickable even if the content is not valid.',
            data: DialogsDemo[DemoKeys.DIALOGS_BUTTONS_DEPENDS_ON_VALIDATION]
          },
          {
            label: 'Block Ui', icon: 'fas fa-code', type: 'Demo',
            demoType: 'dialog',
            notes: 'Block Ui is a featured that customize an specific button to block the ui until an success or failure action is dispatched.',
            data: DialogsDemo[DemoKeys.DIALOGS_BUTTONS_BLOCK_UI]
          },
        ]
      },
      {
        label: 'Footer', type: 'SubCategory',
        children: [
          {
            label: 'Hidden Footer', icon: 'fas fa-code', type: 'Demo',
            demoType: 'dialog',
            notes: 'The dialog footer should be hidden',
            data: DialogsDemo[DemoKeys.DIALOGS_FOOTER_HIDDEN]
          },
        ]
      },
      {
        label: 'Conditionals', type: 'SubCategory',
        children: [
          {
            label: 'If Title', icon: 'fas fa-code', type: 'Demo',
            demoType: 'dialog',
            data: DialogsDemo[DemoKeys.DIALOGS_IF]
          },
        ]
      },
    ]
  },
  {
    label: 'Documents',
    type: 'Category',
    expanded: false,
    children: [
      {
        label: 'Demo', icon: 'fas fa-code', type: 'Demo',
        demoType: 'document',
        notes: '',
        data: DocumentsDemo[DemoKeys.DOCUMENTS_DEMO_1]
      },
      {
        label: 'Demo em Debug', icon: 'fas fa-code', type: 'Demo',
        demoType: 'document',
        notes: '',
        data: DocumentsDemo[DemoKeys.DOCUMENTS_DEMO_2]
      },
    ]
  },
  {
    label: 'Forms',
    type: 'Category',
    children: [
      {
        label: 'Ui Definitions', type: 'SubCategory',
        children: [
          {
            label: 'Create', icon: 'fas fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_FROM_UI_DEFINITION_CREATE]
          },
          {
            label: 'Update', icon: 'fas fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_FROM_UI_DEFINITION_UPDATE]
          },
        ]
      },
      {
        label: 'Behaviors', type: 'SubCategory',
        children: []
      },
      {
        label: 'Inputs', type: 'SubCategory',
        children: [
          {
            label: 'Calendar', icon: 'fas fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_CALENDAR]
          },
          {
            label: 'Checkbox', icon: 'fas fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_CHECKBOX]
          },
          {
            label: 'Checkbox Group', icon: 'fas fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_CHECKBOX_GROUP]
          },
          {
            label: 'Content Mask', icon: 'fas fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_CONTENT_MASK]
          },
          {
            label: 'Dropdown', icon: 'fas fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_DROPDOWN]
          },
          {
            label: 'Linked Dropdown', icon: 'fas fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_LINKED_DROPDOWN]
          },
          {
            label: 'Multiselect', icon: 'fas fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_MULTISELECT]
          },
          {
            label: 'Linked Multiselect', icon: 'fas fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_LINKED_MULTISELECT]
          },
          {
            label: 'Color Picker', icon: 'fas fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_COLOR_PICKER]
          },
          {
            label: 'Currency', icon: 'fas fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_CURRENCY]
          },
          {
            label: 'Number', icon: 'fas fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_NUMBER]
          },
          {
            label: 'Radio Group', icon: 'fas fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_RADIO_GROUP]
          },
          {
            label: 'Switch', icon: 'fas fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_SWITCH]
          },
          {
            label: 'Text Area', icon: 'fas fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_TEXT_AREA]
          },
          {
            label: 'Tag Area', icon: 'fas fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_TAG_AREA]
          },
          {
            label: 'Text', icon: 'fas fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_TEXT]
          },
          {
            label: 'File', icon: 'fas fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_FILE]
          },
          {
            label: 'List With Dialog Crud', icon: 'fas fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_LIST_DIALOG_CRUD]
          },
          {
            label: 'List With Inline Crud', icon: 'fas fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_LIST_INLINE_CRUD]
          },
          {
            label: 'Mask', icon: 'fas fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_MASK]
          },
          {
            label: 'Password', icon: 'fas fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_PASSWORD]
          },
          {
            label: 'Password With Confirmation', icon: 'fas fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_PASSWORD_WITH_CONFIRMATION]
          },
        ]
      },
      {
        label: 'Validators', type: 'SubCategory',
        children: [
          {
            label: 'Custom Validator', icon: 'fas fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: ValidatorsDemo[DemoKeys.VALIDATORS_CUSTOM]
          },
        ]
      },
    ]
  },
  {
    label: 'Tables',
    type: 'Category',
    children: [
      {
        label: 'Ui Definitions', icon: 'fas fa-code', type: 'Demo',
        demoType: 'table',
        notes: '',
        data: TablesDemo[DemoKeys.TABLE_UI_DEFINITIONS]
      },
      {
        label: 'Basic', icon: 'fas fa-code', type: 'Demo',
        demoType: 'table',
        notes: '',
        data: TablesDemo[DemoKeys.TABLE_BASIC]
      },
      {
        label: 'Conditional Columns', icon: 'fas fa-code', type: 'Demo',
        demoType: 'table',
        notes: '',
        data: TablesDemo[DemoKeys.TABLE_IF]
      },
      {
        label: 'Filters: Array', icon: 'fas fa-code', type: 'Demo',
        demoType: 'table',
        notes: '',
        data: TablesDemo[DemoKeys.TABLE_ARRAY_FILTER]
      },
    ]
  },
  {
    label: 'Trees',
    type: 'Category',
    expanded: false,
    children: [
      {
        label: 'Demo', icon: 'fas fa-code', type: 'Demo',
        demoType: 'tree',
        notes: '',
        data: TreesDemo[DemoKeys.TREE_DEMO_1]
      },
    ]
  },
];