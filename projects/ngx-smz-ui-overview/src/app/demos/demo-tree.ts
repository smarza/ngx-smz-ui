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
import { IconsDemo } from './functions/icons-demo';
import { CommentsDemo } from './functions/comments-demo';
import { CardsDemo } from './functions/cards-demo';
import { TimelineDemo } from './functions/timeline-demo';
import { UiGuidesDemo } from './functions/ui-guides-demo';
import { MultiTablesDemo } from './functions/multi-tables-demo';

export const TreeDemoData: DemoTreeNode[] = [
  {
    label: 'Charts',
    type: 'Category',
    children: [
      {
        label: 'From model', icon: 'fa-solid fa-code', type: 'Demo',
        demoType: 'chart',
        notes: '',
        data: ChartsDemo[DemoKeys.CHARTS_FROM_MODEL],
        key: DemoKeys.CHARTS_FROM_MODEL.toString()
      },
      {
        label: 'Combo', icon: 'fa-solid fa-code', type: 'Demo',
        demoType: 'chart',
        notes: '',
        data: ChartsDemo[DemoKeys.CHARTS_COMBO],
        key: DemoKeys.CHARTS_COMBO.toString()
      },
      {
        label: 'Line Bar', icon: 'fa-solid fa-code', type: 'Demo',
        demoType: 'chart',
        notes: '',
        data: ChartsDemo[DemoKeys.CHARTS_LINE_BAR],
        key: DemoKeys.CHARTS_LINE_BAR.toString()
      },
      {
        label: 'Rounded Bar', icon: 'fa-solid fa-code', type: 'Demo',
        demoType: 'chart',
        notes: '',
        data: ChartsDemo[DemoKeys.CHARTS_ROUNDED_BAR],
        key: DemoKeys.CHARTS_ROUNDED_BAR.toString()
      },
      {
        label: 'Stacked Bar', icon: 'fa-solid fa-code', type: 'Demo',
        demoType: 'chart',
        notes: '',
        data: ChartsDemo[DemoKeys.CHARTS_STACKED_BAR],
        key: DemoKeys.CHARTS_STACKED_BAR.toString()
      },
      {
        label: 'Vertical Bar', icon: 'fa-solid fa-code', type: 'Demo',
        demoType: 'chart',
        notes: '',
        data: ChartsDemo[DemoKeys.CHARTS_VERTICAL_BAR],
        key: DemoKeys.CHARTS_VERTICAL_BAR.toString()
      },
      {
        label: 'Bar', icon: 'fa-solid fa-code', type: 'Demo',
        demoType: 'chart',
        notes: '',
        data: ChartsDemo[DemoKeys.CHARTS_BAR],
        key: DemoKeys.CHARTS_BAR.toString()
      },
      {
        label: 'Dougnut', icon: 'fa-solid fa-code', type: 'Demo',
        demoType: 'chart',
        notes: '',
        data: ChartsDemo[DemoKeys.CHARTS_DOUGNUT],
        key: DemoKeys.CHARTS_DOUGNUT.toString()
      },
      {
        label: 'Pie', icon: 'fa-solid fa-code', type: 'Demo',
        demoType: 'chart',
        notes: '',
        data: ChartsDemo[DemoKeys.CHARTS_PIE],
        key: DemoKeys.CHARTS_PIE.toString()
      },
      {
        label: 'Polar Area', icon: 'fa-solid fa-code', type: 'Demo',
        demoType: 'chart',
        notes: '',
        data: ChartsDemo[DemoKeys.CHARTS_POLAR_AREA],
        key: DemoKeys.CHARTS_POLAR_AREA.toString()
      },
      {
        label: 'Color Pallete', icon: 'fa-solid fa-code', type: 'Demo',
        demoType: 'chart',
        notes: '',
        data: ChartsDemo[DemoKeys.CHARTS_COLOR_PALLETE],
        key: DemoKeys.CHARTS_COLOR_PALLETE.toString()
      },
      {
        label: 'Sprint 1', icon: 'fa-solid fa-code', type: 'Demo',
        demoType: 'chart',
        notes: '',
        data: ChartsDemo[DemoKeys.CHARTS_SPRINTS_1],
        key: DemoKeys.CHARTS_SPRINTS_1.toString()
      },
      {
        label: 'Sprint 2', icon: 'fa-solid fa-code', type: 'Demo',
        demoType: 'chart',
        notes: '',
        data: ChartsDemo[DemoKeys.CHARTS_SPRINTS_2],
        key: DemoKeys.CHARTS_SPRINTS_2.toString()
      },
    ]
  },
  {
    label: 'Menu',
    type: 'Category',
    children: [
      {
        label: 'Menu If True', icon: 'fa-solid fa-code', type: 'Demo',
        demoType: 'menu',
        notes: 'kkkk',
        data: MenusDemo[DemoKeys.MENU_IF_TRUE],
        key: DemoKeys.MENU_IF_TRUE.toString()
      },
      {
        label: 'Menu If False', icon: 'fa-solid fa-code', type: 'Demo',
        demoType: 'menu',
        notes: '',
        data: MenusDemo[DemoKeys.MENU_IF_FALSE],
        key: DemoKeys.MENU_IF_FALSE.toString()
      },
    ]
  },
  {
    label: 'Icons',
    type: 'Category',
    children: [
      {
        label: 'Font Awesome 5 to 6', icon: 'fa-solid fa-code', type: 'Demo',
        demoType: 'icons',
        notes: 'kkkk',
        data: IconsDemo[DemoKeys.ICONS_FONTAWESOME_6],
        key: DemoKeys.ICONS_FONTAWESOME_6.toString()
      },
      {
        label: 'Font Awesome 6 Spin', icon: 'fa-solid fa-code', type: 'Demo',
        demoType: 'icons',
        notes: 'kkkk',
        data: IconsDemo[DemoKeys.ICONS_FONTAWESOME_6_SPIN],
        key: DemoKeys.ICONS_FONTAWESOME_6_SPIN.toString()
      },
    ]
  },
  // {
  //   label: 'Components',
  //   type: 'Category',
  //   children: [
  //     {
  //       label: 'Inputs', icon: 'fa-solid fa-code', type: 'Demo',
  //       demoType: 'dialog',
  //       notes: '',
  //       data: null
  //     },
  //     {
  //       label: 'Outputs', icon: 'fa-solid fa-code', type: 'Demo',
  //       demoType: 'dialog',
  //       notes: '',
  //       data: null
  //     },
  //     {
  //       label: 'Error Messages', icon: 'fa-solid fa-code', type: 'Demo',
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
            label: 'Create', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'dialog',
            notes: '',
            data: DialogsDemo[DemoKeys.DIALOGS_FROM_UI_DEFINITION_CREATE],
            key: DemoKeys.DIALOGS_FROM_UI_DEFINITION_CREATE.toString()
          },
          {
            label: 'Update', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'dialog',
            notes: '',
            data: DialogsDemo[DemoKeys.DIALOGS_FROM_UI_DEFINITION_UPDATE],
            key: DemoKeys.DIALOGS_FROM_UI_DEFINITION_UPDATE.toString()
          },
        ]
      },
      {
        label: 'Header', type: 'SubCategory',
        children: [
          {
            label: 'With Title', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'dialog',
            data: DialogsDemo[DemoKeys.DIALOGS_HEADER_WITH_TITLE],
            key: DemoKeys.DIALOGS_HEADER_WITH_TITLE.toString()
          },
          {
            label: 'Hidden Header', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'dialog',
            notes: 'The dialog header should be hidden',
            data: DialogsDemo[DemoKeys.DIALOGS_HEADER_HIDDEN],
            key: DemoKeys.DIALOGS_HEADER_HIDDEN.toString()
          },
          {
            label: 'With Maximize', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'dialog',
            data: DialogsDemo[DemoKeys.DIALOGS_HEADER_WITH_MAXIMIZE],
            key: DemoKeys.DIALOGS_HEADER_WITH_MAXIMIZE.toString()
          },
          {
            label: 'With Minimize', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'dialog',
            data: DialogsDemo[DemoKeys.DIALOGS_HEADER_WITH_MINIMIZE],
            key: DemoKeys.DIALOGS_HEADER_WITH_MINIMIZE.toString()
          },
        ]
      },
      {
        label: 'Controls', type: 'SubCategory',
        children: [
          {
            label: 'Close on Escape', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'dialog',
            notes: 'Press escape to close the dialog',
            data: DialogsDemo[DemoKeys.DIALOGS_CONTROLS_CLOSE_ON_ESCAPE],
            key: DemoKeys.DIALOGS_CONTROLS_CLOSE_ON_ESCAPE.toString()
          },
          {
            label: 'Confirm on Enter', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'dialog',
            notes: 'Press enter to confirm the dialog',
            data: DialogsDemo[DemoKeys.DIALOGS_CONTROLS_CONFIRM_ON_ENTER],
            key: DemoKeys.DIALOGS_CONTROLS_CONFIRM_ON_ENTER.toString()
          },
          {
            label: 'Dismissable Mask', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'dialog',
            notes: 'Click outside to close the dialog',
            data: DialogsDemo[DemoKeys.DIALOGS_CONTROLS_DISMISSABLE_MASK],
            key: DemoKeys.DIALOGS_CONTROLS_DISMISSABLE_MASK.toString()
          },
          {
            label: 'Base z-index', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'dialog',
            notes: 'The dialog will appear behind the frames',
            data: DialogsDemo[DemoKeys.DIALOGS_CONTROLS_BASE_Z_INDEX],
            key: DemoKeys.DIALOGS_CONTROLS_BASE_Z_INDEX.toString()
          },
          {
            label: 'Open Maximided', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'dialog',
            notes: 'Press enter to confirm the dialog',
            data: DialogsDemo[DemoKeys.DIALOGS_CONTROLS_OPEN_MAXIMIZED],
            key: DemoKeys.DIALOGS_CONTROLS_OPEN_MAXIMIZED.toString()
          },
          {
            label: 'Open Maximided Blocking Restore', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'dialog',
            notes: 'Press enter to confirm the dialog',
            data: DialogsDemo[DemoKeys.DIALOGS_CONTROLS_HIDE_RESTORE_BUTTON],
            key: DemoKeys.DIALOGS_CONTROLS_HIDE_RESTORE_BUTTON.toString()
          },
        ]
      },
      {
        label: 'Data', type: 'SubCategory',
        children: [
          {
            label: 'Test', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'dialog',
            data: DialogsDemo[DemoKeys.DIALOGS_FOOTER_HIDDEN],
            key: DemoKeys.DIALOGS_FOOTER_HIDDEN.toString()
          },
        ]
      },
      {
        label: 'Buttons', type: 'SubCategory',
        children: [
          {
            label: 'Built-in Buttons', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'dialog',
            notes: 'By default, the built-in buttons visibility follows the configuration provided on the app module.',
            data: DialogsDemo[DemoKeys.DIALOGS_BUTTONS_BUILT_IN],
            key: DemoKeys.DIALOGS_BUTTONS_BUILT_IN.toString()
          },
          {
            label: 'Renaming Buttons', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'dialog',
            notes: 'The CANCEL and OK buttons should be renamed to NO and YES.',
            data: DialogsDemo[DemoKeys.DIALOGS_BUTTONS_RENAMING],
            key: DemoKeys.DIALOGS_BUTTONS_RENAMING.toString()
          },
          {
            label: 'Styling Buttons', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'dialog',
            notes: 'Some styling samples.',
            data: DialogsDemo[DemoKeys.DIALOGS_BUTTONS_STYLING],
            key: DemoKeys.DIALOGS_BUTTONS_STYLING.toString()
          },
          {
            label: 'Custom Buttons', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'dialog',
            notes: 'Create unlimited buttons with custom buttons.',
            data: DialogsDemo[DemoKeys.DIALOGS_BUTTONS_STYLING],
            key: DemoKeys.DIALOGS_BUTTONS_STYLING.toString()
          },
          {
            label: 'Reordering Custom Buttons', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'dialog',
            notes: 'By default, all custom buttons are placed at the right side of the built-in buttons.',
            data: DialogsDemo[DemoKeys.DIALOGS_BUTTONS_REODERING],
            key: DemoKeys.DIALOGS_BUTTONS_REODERING.toString()
          },
          {
            label: 'Close Dialog', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'dialog',
            notes: 'By default, custom buttons doesn\'t close the dialog.',
            data: DialogsDemo[DemoKeys.DIALOGS_BUTTONS_CLOSE_DIALOG],
            key: DemoKeys.DIALOGS_BUTTONS_CLOSE_DIALOG.toString()
          },
          {
            label: 'Depends On Validation', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'dialog',
            notes: 'By default, custom buttons are clickable even if the content is not valid.',
            data: DialogsDemo[DemoKeys.DIALOGS_BUTTONS_DEPENDS_ON_VALIDATION],
            key: DemoKeys.DIALOGS_BUTTONS_DEPENDS_ON_VALIDATION.toString()
          },
          {
            label: 'Topbar Buttons', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'dialog',
            notes: 'Create unlimited topbar buttons.',
            data: DialogsDemo[DemoKeys.DIALOGS_TOPBAR_BUTTONS],
            key: DemoKeys.DIALOGS_TOPBAR_BUTTONS.toString()
          },
          {
            label: 'Block Ui', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'dialog',
            notes: 'Block Ui is a featured that customize an specific button to block the ui until an success or failure action is dispatched.',
            data: DialogsDemo[DemoKeys.DIALOGS_BUTTONS_BLOCK_UI],
            key: DemoKeys.DIALOGS_BUTTONS_BLOCK_UI.toString()
          },
          {
            label: 'Help Button custom', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'dialog',
            notes: 'Help button on the topbar showing custom html content',
            data: DialogsDemo[DemoKeys.DIALOGS_HELP_CUSTOM_BUTTON],
            key: DemoKeys.DIALOGS_HELP_CUSTOM_BUTTON.toString()
          },
          {
            label: 'Help Button assets', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'dialog',
            notes: 'Help button on the topbar showing html content from assets folder',
            data: DialogsDemo[DemoKeys.DIALOGS_HELP_ASSETS_BUTTON],
            key: DemoKeys.DIALOGS_HELP_ASSETS_BUTTON.toString()
          },
        ]
      },
      {
        label: 'Footer', type: 'SubCategory',
        children: [
          {
            label: 'Hidden Footer', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'dialog',
            notes: 'The dialog footer should be hidden',
            data: DialogsDemo[DemoKeys.DIALOGS_FOOTER_HIDDEN],
            key: DemoKeys.DIALOGS_FOOTER_HIDDEN.toString()
          },
        ]
      },
      {
        label: 'Conditionals', type: 'SubCategory',
        children: [
          {
            label: 'If Title', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'dialog',
            data: DialogsDemo[DemoKeys.DIALOGS_IF],
            key: DemoKeys.DIALOGS_IF.toString()
          },
        ]
      },
      {
        label: 'Dialog With Forms', type: 'SubCategory',
        children: [
          {
            label: 'Validation', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'dialog',
            data: DialogsDemo[DemoKeys.DIALOGS_WITH_FORM],
            key: DemoKeys.DIALOGS_WITH_FORM.toString()
          },
        ]
      },
      {
        label: 'Dialog With Multiple Forms', type: 'SubCategory',
        children: [
          {
            label: 'Validation', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'dialog',
            data: DialogsDemo[DemoKeys.DIALOGS_WITH_MULTIPLE_FORMS],
            key: DemoKeys.DIALOGS_WITH_MULTIPLE_FORMS.toString()
          },
        ]
      },
      {
        label: 'Dialog With Auto Focus Forms', type: 'SubCategory',
        children: [
          {
            label: 'Validation', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'dialog',
            data: DialogsDemo[DemoKeys.DIALOGS_WITH_FOCUS_FORM],
            key: DemoKeys.DIALOGS_WITH_FOCUS_FORM.toString()
          },
        ]
      },
      {
        label: 'Dialog With Markdown', type: 'SubCategory',
        children: [
          {
            label: 'Sample', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'dialog',
            data: DialogsDemo[DemoKeys.DIALOGS_WITH_MARKDOWN],
            key: DemoKeys.DIALOGS_WITH_MARKDOWN.toString()
          },
        ]
      },
      {
        label: 'Dialog With Tables', type: 'SubCategory',
        children: [
          {
            label: 'Validating Selection', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'dialog',
            data: DialogsDemo[DemoKeys.DIALOGS_WITH_TABLE_SELECTION],
            key: DemoKeys.DIALOGS_WITH_TABLE_SELECTION.toString()
          },
        ]
      },
      {
        label: 'Component and Form', icon: 'fa-solid fa-code', type: 'Demo',
        demoType: 'dialog',
        data: DialogsDemo[DemoKeys.DIALOGS_COMPONENT_FORM],
        key: DemoKeys.DIALOGS_COMPONENT_FORM.toString()
      },
    ]
  },
  {
    label: 'Documents',
    type: 'Category',
    expanded: false,
    children: [
      {
        label: 'HTML2PDF Demo', icon: 'fa-solid fa-code', type: 'Demo',
        demoType: 'document',
        notes: '',
        data: DocumentsDemo[DemoKeys.DOCUMENTS_DEMO_HTML2PDF],
        key: DemoKeys.DOCUMENTS_DEMO_HTML2PDF.toString()
      },
      {
        label: 'JSPDF Demo', icon: 'fa-solid fa-code', type: 'Demo',
        demoType: 'document',
        notes: '',
        data: DocumentsDemo[DemoKeys.DOCUMENTS_DEMO_JSPDF],
        key: DemoKeys.DOCUMENTS_DEMO_JSPDF.toString()
      },
      {
        label: 'Demo 1', icon: 'fa-solid fa-code', type: 'Demo',
        demoType: 'document',
        notes: '',
        data: DocumentsDemo[DemoKeys.DOCUMENTS_DEMO_1],
        key: DemoKeys.DOCUMENTS_DEMO_1.toString()
      },
      {
        label: 'Demo em Debug', icon: 'fa-solid fa-code', type: 'Demo',
        demoType: 'document',
        notes: '',
        data: DocumentsDemo[DemoKeys.DOCUMENTS_DEMO_2],
        key: DemoKeys.DOCUMENTS_DEMO_2.toString()
      },
      {
        label: 'Landscape With Page Breaks', icon: 'fa-solid fa-code', type: 'Demo',
        demoType: 'document',
        notes: '',
        data: DocumentsDemo[DemoKeys.DOCUMENTS_DEMO_3],
        key: DemoKeys.DOCUMENTS_DEMO_3.toString()
      },
      {
        label: 'Document With For and If', icon: 'fa-solid fa-code', type: 'Demo',
        demoType: 'document',
        notes: '',
        data: DocumentsDemo[DemoKeys.DOCUMENTS_DEMO_FLUENT_UTILITIES],
        key: DemoKeys.DOCUMENTS_DEMO_FLUENT_UTILITIES.toString()
      },
      {
        label: 'Injecting Components', icon: 'fa-solid fa-code', type: 'Demo',
        demoType: 'document',
        notes: '',
        data: DocumentsDemo[DemoKeys.DOCUMENTS_INJECTABLES],
        key: DemoKeys.DOCUMENTS_INJECTABLES.toString()
      },
      {
        label: 'Multiple Pages', icon: 'fa-solid fa-code', type: 'Demo',
        demoType: 'document',
        notes: '',
        data: DocumentsDemo[DemoKeys.DOCUMENTS_PAGES],
        key: DemoKeys.DOCUMENTS_PAGES.toString()
      },
    ]
  },
  {
    label: 'Comments',
    type: 'Category',
    expanded: false,
    children: [
      {
        label: 'Section', icon: 'fa-solid fa-code', type: 'Demo',
        demoType: 'comments',
        notes: '',
        data: CommentsDemo[DemoKeys.COMMENTS_SECTION],
        key: DemoKeys.COMMENTS_SECTION.toString()
      },
    ]
  },
  {
    label: 'Ui Guides',
    type: 'Category',
    expanded: false,
    children: [
      {
        label: 'Section', icon: 'fa-solid fa-code', type: 'Demo',
        demoType: 'ui-guide',
        notes: '',
        data: UiGuidesDemo[DemoKeys.UI_GUIDE_OVERVIEW],
        key: DemoKeys.UI_GUIDE_OVERVIEW.toString()
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
            label: 'Create', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_FROM_UI_DEFINITION_CREATE],
            key: DemoKeys.FORMS_FROM_UI_DEFINITION_CREATE.toString()
          },
          {
            label: 'Update', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_FROM_UI_DEFINITION_UPDATE],
            key: DemoKeys.FORMS_FROM_UI_DEFINITION_UPDATE.toString()
          },
        ]
      },
      {
        label: 'Misc', type: 'SubCategory',
        children: [
          {
            label: 'Apply Data', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_WITH_APPLY_DATA],
            key: DemoKeys.FORMS_WITH_APPLY_DATA.toString()
          },
        ]
      },
      {
        label: 'Behaviors', type: 'SubCategory',
        children: [
          {
            label: 'Data Dependency', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_BEHAVIORS_DATA_DEPENDENCY],
            key: DemoKeys.FORMS_BEHAVIORS_DATA_DEPENDENCY.toString()
          },
          {
            label: 'Multiple Groups', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_MULTIPLE_GROUPS],
            key: DemoKeys.FORMS_MULTIPLE_GROUPS.toString()
          },
          {
            label: 'Visibility Condition', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_BEHAVIORS_VISIBILITY_CONDITION],
            key: DemoKeys.FORMS_BEHAVIORS_VISIBILITY_CONDITION.toString()
          },
        ]
      },
      {
        label: 'Inputs', type: 'SubCategory',
        children: [
          {
            label: 'All Inputs', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_ALL_INPUTS],
            key: DemoKeys.FORMS_ALL_INPUTS.toString()
          },
          {
            label: 'All Inputs Disabled', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_ALL_INPUTS_DISABLED],
            key: DemoKeys.FORMS_ALL_INPUTS_DISABLED.toString()
          },
          {
            label: 'Calendar', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_CALENDAR],
            key: DemoKeys.FORMS_INPUT_CALENDAR.toString()
          },
          {
            label: 'Checkbox', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_CHECKBOX],
            key: DemoKeys.FORMS_INPUT_CHECKBOX.toString()
          },
          {
            label: 'Checkbox Group', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_CHECKBOX_GROUP],
            key: DemoKeys.FORMS_INPUT_CHECKBOX_GROUP.toString()
          },
          {
            label: 'Content Mask', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_CONTENT_MASK],
            key: DemoKeys.FORMS_INPUT_CONTENT_MASK.toString()
          },
          {
            label: 'Dropdown', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_DROPDOWN],
            key: DemoKeys.FORMS_INPUT_DROPDOWN.toString()
          },
          {
            label: 'Linked Dropdown', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_LINKED_DROPDOWN],
            key: DemoKeys.FORMS_INPUT_LINKED_DROPDOWN.toString()
          },
          {
            label: 'Multiselect', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_MULTISELECT],
            key: DemoKeys.FORMS_INPUT_MULTISELECT.toString()
          },
          {
            label: 'Linked Multiselect', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_LINKED_MULTISELECT],
            key: DemoKeys.FORMS_INPUT_LINKED_MULTISELECT.toString()
          },
          {
            label: 'Color Picker', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_COLOR_PICKER],
            key: DemoKeys.FORMS_INPUT_COLOR_PICKER.toString()
          },
          {
            label: 'Currency', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_CURRENCY],
            key: DemoKeys.FORMS_INPUT_CURRENCY.toString()
          },
          {
            label: 'Number', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_NUMBER],
            key: DemoKeys.FORMS_INPUT_NUMBER.toString()
          },
          {
            label: 'Radio Group', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_RADIO_GROUP],
            key: DemoKeys.FORMS_INPUT_RADIO_GROUP.toString()
          },
          {
            label: 'Switch', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_SWITCH],
            key: DemoKeys.FORMS_INPUT_SWITCH.toString()
          },
          {
            label: 'Text Area', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_TEXT_AREA],
            key: DemoKeys.FORMS_INPUT_TEXT_AREA.toString()
          },
          {
            label: 'Tag Area', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_TAG_AREA],
            key: DemoKeys.FORMS_INPUT_TAG_AREA.toString()
          },
          {
            label: 'Autocomplete Tag Area', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_AUTOCOMPLETE_TAG_AREA],
            key: DemoKeys.FORMS_INPUT_AUTOCOMPLETE_TAG_AREA.toString()
          },
          {
            label: 'Text', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_TEXT],
            key: DemoKeys.FORMS_INPUT_TEXT.toString()
          },
          {
            label: 'Text Button', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_TEXT_BUTTON],
            key: DemoKeys.FORMS_INPUT_TEXT_BUTTON.toString()
          },
          {
            label: 'File', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_FILE],
            key: DemoKeys.FORMS_INPUT_FILE.toString()
          },
          {
            label: 'List With Dialog Crud', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_LIST_DIALOG_CRUD],
            key: DemoKeys.FORMS_INPUT_LIST_DIALOG_CRUD.toString()
          },
          {
            label: 'List With Inline Crud', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_LIST_INLINE_CRUD],
            key: DemoKeys.FORMS_INPUT_LIST_INLINE_CRUD.toString()
          },
          {
            label: 'List With Batch Crud', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_LIST_BATCH_CRUD],
            key: DemoKeys.FORMS_INPUT_LIST_BATCH_CRUD.toString()
          },
          {
            label: 'List With Numbers', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_LIST_NUMBER],
            key: DemoKeys.FORMS_INPUT_LIST_NUMBER.toString()
          },
          {
            label: 'List With Fraction Numbers', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_LIST_FRACTION_NUMBER],
            key: DemoKeys.FORMS_INPUT_LIST_FRACTION_NUMBER.toString()
          },
          {
            label: 'Mask', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_MASK],
            key: DemoKeys.FORMS_INPUT_MASK.toString()
          },
          {
            label: 'Password', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_PASSWORD],
            key: DemoKeys.FORMS_INPUT_PASSWORD.toString()
          },
          {
            label: 'Password With Confirmation', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_PASSWORD_WITH_CONFIRMATION],
            key: DemoKeys.FORMS_INPUT_PASSWORD_WITH_CONFIRMATION.toString()
          },
          {
            label: 'Tree With Single Selection', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_TREE_SINGLE_SELECTION],
            key: DemoKeys.FORMS_INPUT_TREE_SINGLE_SELECTION.toString()
          },
          {
            label: 'Tree With Multiple Selection', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_TREE_MULTIPLE_SELECTION],
            key: DemoKeys.FORMS_INPUT_TREE_MULTIPLE_SELECTION.toString()
          },
          {
            label: 'Tree With Checkbox Selection', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_TREE_CHECKBOX_SELECTION],
            key: DemoKeys.FORMS_INPUT_TREE_CHECKBOX_SELECTION.toString()
          },
          {
            label: 'Tree With Dependency', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_TREE_CHECKBOX_SELECTION_WITH_DEPENDENCY],
            key: DemoKeys.FORMS_INPUT_TREE_CHECKBOX_SELECTION_WITH_DEPENDENCY.toString()
          },
          {
            label: 'Tree Selection Utilities', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_TREE_SELECTION_UTILITIES],
            key: DemoKeys.FORMS_INPUT_TREE_SELECTION_UTILITIES.toString()
          },
          {
            label: 'Tree Property Based', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: FormsDemo[DemoKeys.FORMS_INPUT_TREE_PROPERTY_BASED],
            key: DemoKeys.FORMS_INPUT_TREE_PROPERTY_BASED.toString()
          },
        ]
      },
      {
        label: 'Validators', type: 'SubCategory',
        children: [
          {
            label: 'Custom Validator', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'form',
            notes: '',
            data: ValidatorsDemo[DemoKeys.VALIDATORS_CUSTOM],
            key: DemoKeys.VALIDATORS_CUSTOM.toString()
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
        label: 'Layouts',
        type: 'Category',
        children: [
          {
            label: 'Vanila', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'table',
            notes: '',
            data: TablesDemo[DemoKeys.TABLE_LAYOUT_VANILA],
            key: DemoKeys.TABLE_LAYOUT_VANILA.toString()
          },
          {
            label: 'Estimating', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'table',
            notes: '',
            data: TablesDemo[DemoKeys.TABLE_LAYOUT_ESTIMATING],
            key: DemoKeys.TABLE_LAYOUT_ESTIMATING.toString()
          },
          {
            label: 'Estimating With Max Width', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'table',
            notes: '',
            data: TablesDemo[DemoKeys.TABLE_LAYOUT_ESTIMATING_WITH_MAX_WIDTH],
            key: DemoKeys.TABLE_LAYOUT_ESTIMATING_WITH_MAX_WIDTH.toString()
          },
        ]
      },
      {
        label: 'Sizes',
        type: 'Category',
        children: [
          {
            label: 'Size: Extra Small', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'table',
            notes: '',
            data: TablesDemo[DemoKeys.TABLE_LAYOUT_SIZE_EXTRA_SMALL],
            key: DemoKeys.TABLE_LAYOUT_SIZE_EXTRA_SMALL.toString()
          },
          {
            label: 'Size: Small', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'table',
            notes: '',
            data: TablesDemo[DemoKeys.TABLE_LAYOUT_SIZE_SMALL],
            key: DemoKeys.TABLE_LAYOUT_SIZE_SMALL.toString()
          },
          {
            label: 'Size: Regular', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'table',
            notes: '',
            data: TablesDemo[DemoKeys.TABLE_LAYOUT_SIZE_REGULAR],
            key: DemoKeys.TABLE_LAYOUT_SIZE_REGULAR.toString()
          },
          {
            label: 'Size: Large', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'table',
            notes: '',
            data: TablesDemo[DemoKeys.TABLE_LAYOUT_SIZE_LARGE],
            key: DemoKeys.TABLE_LAYOUT_SIZE_LARGE.toString()
          },
        ]
      },
      {
        label: 'Menu Actions',
        type: 'Category',
        children: [
          {
            label: 'Dynamic Menu', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'table',
            notes: '',
            data: TablesDemo[DemoKeys.TABLE_DYNAMIC_MENU],
            key: DemoKeys.TABLE_DYNAMIC_MENU.toString()
          },
          {
            label: 'Overlay Menu', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'table',
            notes: '',
            data: TablesDemo[DemoKeys.TABLE_MENU_OVERLAY],
            key: DemoKeys.TABLE_MENU_OVERLAY.toString()
          },
          {
            label: 'Inline Menu', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'table',
            notes: '',
            data: TablesDemo[DemoKeys.TABLE_MENU_INLINE],
            key: DemoKeys.TABLE_MENU_INLINE.toString()
          },
        ]
      },
      {
        label: 'Ui Definitions', icon: 'fa-solid fa-code', type: 'Demo',
        demoType: 'table',
        notes: '',
        data: TablesDemo[DemoKeys.TABLE_UI_DEFINITIONS],
        key: DemoKeys.TABLE_UI_DEFINITIONS.toString()
      },
      {
        label: 'Basic', icon: 'fa-solid fa-code', type: 'Demo',
        demoType: 'table',
        notes: '',
        data: TablesDemo[DemoKeys.TABLE_BASIC],
        key: DemoKeys.TABLE_BASIC.toString()
      },
      {
        label: 'Estimative Width', icon: 'fa-solid fa-code', type: 'Demo',
        demoType: 'table',
        notes: '',
        data: TablesDemo[DemoKeys.TABLE_ESTIMATIVE_WIDTH],
        key: DemoKeys.TABLE_ESTIMATIVE_WIDTH.toString()
      },
      {
        label: 'Conditional Columns', icon: 'fa-solid fa-code', type: 'Demo',
        demoType: 'table',
        notes: '',
        data: TablesDemo[DemoKeys.TABLE_IF],
        key: DemoKeys.TABLE_IF.toString()
      },
      {
        label: 'Filters: Array', icon: 'fa-solid fa-code', type: 'Demo',
        demoType: 'table',
        notes: '',
        data: TablesDemo[DemoKeys.TABLE_ARRAY_FILTER],
        key: DemoKeys.TABLE_ARRAY_FILTER.toString()
      },
      {
        label: 'Row Expansion', icon: 'fa-solid fa-code', type: 'Demo',
        demoType: 'table',
        notes: '',
        data: TablesDemo[DemoKeys.TABLE_ROW_EXPANSION],
        key: DemoKeys.TABLE_ROW_EXPANSION.toString()
      },
      {
        label: 'Auto Sized Columns', icon: 'fa-solid fa-code', type: 'Demo',
        demoType: 'table',
        notes: '',
        data: TablesDemo[DemoKeys.TABLE_AUTO_SIZED_COLUMNS],
        key: DemoKeys.TABLE_AUTO_SIZED_COLUMNS.toString()
      },
      {
        label: 'Multi-languages', icon: 'fa-solid fa-code', type: 'Demo',
        demoType: 'table',
        notes: '',
        data: TablesDemo[DemoKeys.TABLE_MULTI_LANGUAGES],
        key: DemoKeys.TABLE_MULTI_LANGUAGES.toString()
      },
      {
        label: 'Multi-selection', icon: 'fa-solid fa-code', type: 'Demo',
        demoType: 'table',
        notes: '',
        data: TablesDemo[DemoKeys.TABLE_MULTI_SELECTION],
        key: DemoKeys.TABLE_MULTI_SELECTION.toString()
      },
      {
        label: 'Export PDF', icon: 'fa-solid fa-code', type: 'Demo',
        demoType: 'table',
        notes: '',
        data: TablesDemo[DemoKeys.TABLE_EXPORT_PDF],
        key: DemoKeys.TABLE_EXPORT_PDF.toString()
      },
      {
        label: 'Export EXCEL', icon: 'fa-solid fa-code', type: 'Demo',
        demoType: 'table',
        notes: '',
        data: TablesDemo[DemoKeys.TABLE_EXPORT_EXCEL],
        key: DemoKeys.TABLE_EXPORT_EXCEL.toString()
      },
      {
        label: 'Editable', icon: 'fa-solid fa-code', type: 'Demo',
        demoType: 'table',
        notes: '',
        data: TablesDemo[DemoKeys.TABLE_EDITABLE],
        key: DemoKeys.TABLE_EDITABLE.toString()
      },
      {
        label: 'Amostragens de Corrosão', icon: 'fa-solid fa-code', type: 'Demo',
        demoType: 'table',
        notes: '',
        data: TablesDemo[DemoKeys.TABLE_EDITABLE_PARTIAL],
        key: DemoKeys.TABLE_EDITABLE_PARTIAL.toString()
      },
      {
        label: 'Filter Persistence', icon: 'fa-solid fa-code', type: 'Demo',
        demoType: 'table',
        notes: '',
        data: TablesDemo[DemoKeys.TABLE_VIEWPORT_PERSISTENCE],
        key: DemoKeys.TABLE_VIEWPORT_PERSISTENCE.toString()
      },
    ]
  },
  {
    label: 'Multi Tables',
    type: 'Category',
    children: [
      {
        label: 'Basic', icon: 'fa-solid fa-code', type: 'Demo',
        demoType: 'multi-tables',
        notes: '',
        data: MultiTablesDemo[DemoKeys.MULTI_TABLES_BASIC],
        key: DemoKeys.MULTI_TABLES_BASIC.toString()
      },
    ]
  },
  {
    label: 'Trees',
    type: 'Category',
    expanded: false,
    children: [
      {
        label: 'Demo', icon: 'fa-solid fa-code', type: 'Demo',
        demoType: 'tree',
        notes: '',
        data: TreesDemo[DemoKeys.TREE_DEMO_1],
        key: DemoKeys.TREE_DEMO_1.toString()
      },
      {
        label: 'Source data',
        type: 'Category',
        expanded: false,
        children: [
          {
            label: 'Nested Array', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'tree',
            notes: '',
            data: TreesDemo[DemoKeys.TREE_DATA_TRANSFORM_USING_NESTED],
            key: DemoKeys.TREE_DATA_TRANSFORM_USING_NESTED.toString()
          },
          {
            label: 'Group Array', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'tree',
            notes: '',
            data: TreesDemo[DemoKeys.TREE_DATA_TRANSFORM_USING_GROUPS],
            key: DemoKeys.TREE_DATA_TRANSFORM_USING_GROUPS.toString()
          },
          {
            label: 'Flat Array', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'tree',
            notes: '',
            data: TreesDemo[DemoKeys.TREE_DATA_TRANSFORM_USING_FLAT_ARRAYS],
            key: DemoKeys.TREE_DATA_TRANSFORM_USING_FLAT_ARRAYS.toString()
          },
          {
            label: 'Flat Array With Root', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'tree',
            notes: '',
            data: TreesDemo[DemoKeys.TREE_DATA_TRANSFORM_USING_FLAT_ARRAYS_WITH_ROOT],
            key: DemoKeys.TREE_DATA_TRANSFORM_USING_FLAT_ARRAYS_WITH_ROOT.toString()
          },
        ]
      },
    ]
  },
  {
    label: 'Cards',
    type: 'Category',
    expanded: false,
    children: [
      {
        label: 'Templates',
        type: 'Category',
        expanded: false,
        children: [
          {
            label: 'Image with Details', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'cards',
            notes: '',
            data: CardsDemo[DemoKeys.CARDS_IMAGE_WITH_DETAILS],
            key: DemoKeys.CARDS_IMAGE_WITH_DETAILS.toString()
          },
          {
            label: 'Info A', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'cards',
            notes: '',
            data: CardsDemo[DemoKeys.CARDS_INFO_A],
            key: DemoKeys.CARDS_INFO_A.toString()
          },
          {
            label: 'Flip Card | Image', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'cards',
            notes: '',
            data: CardsDemo[DemoKeys.CARDS_FLIP_CARD_IMAGE],
            key: DemoKeys.CARDS_FLIP_CARD_IMAGE.toString()
          },
          {
            label: 'Flip Card | Component', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'cards',
            notes: '',
            data: CardsDemo[DemoKeys.CARDS_FLIP_CARD_COMPONENT],
            key: DemoKeys.CARDS_FLIP_CARD_COMPONENT.toString()
          },
          {
            label: 'Flip Card | Html', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'cards',
            notes: '',
            data: CardsDemo[DemoKeys.CARDS_FLIP_CARD_HTML],
            key: DemoKeys.CARDS_FLIP_CARD_HTML.toString()
          },
        ]
      },
      {
        label: 'Features',
        type: 'Category',
        expanded: false,
        children: [
          {
            label: 'Multiple Sources', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'cards',
            notes: '',
            data: CardsDemo[DemoKeys.CARDS_WITH_MULTIPLE_SOURCES],
            key: DemoKeys.CARDS_WITH_MULTIPLE_SOURCES.toString()
          },
          {
            label: 'Árvore de Complexidade (GCAB)', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'cards',
            notes: '',
            data: CardsDemo[DemoKeys.CARDS_FLIP_COMPLEXITY],
            key: DemoKeys.CARDS_FLIP_COMPLEXITY.toString()
          },
          {
            label: 'Only Front Card', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'cards',
            notes: '',
            data: CardsDemo[DemoKeys.CARDS_FLIP_ONLY_FRONT],
            key: DemoKeys.CARDS_FLIP_ONLY_FRONT.toString()
          },
          {
            label: 'Raw Template', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'cards',
            notes: '',
            data: CardsDemo[DemoKeys.CARDS_RAW],
            key: DemoKeys.CARDS_RAW.toString()
          },
        ]
      },
    ]
  },
    {
    label: 'Timeline',
    type: 'Category',
    expanded: false,
    children: [
      {
        label: 'Templates',
        type: 'Category',
        expanded: false,
        children: [
          {
            label: 'Image with Details', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'timeline',
            notes: '',
            data: TimelineDemo[DemoKeys.TIMELINE_IMAGE_WITH_DETAILS],
            key: DemoKeys.TIMELINE_IMAGE_WITH_DETAILS.toString()
          },
          {
            label: 'Info A', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'timeline',
            notes: '',
            data: TimelineDemo[DemoKeys.TIMELINE_INFO_A],
            key: DemoKeys.TIMELINE_INFO_A.toString()
          },
        ]
      },
      {
        label: 'Features',
        type: 'Category',
        expanded: false,
        children: [
          {
            label: 'Multiple Sources', icon: 'fa-solid fa-code', type: 'Demo',
            demoType: 'timeline',
            notes: '',
            data: TimelineDemo[DemoKeys.TIMELINE_WITH_MULTIPLE_SOURCES],
            key: DemoKeys.TIMELINE_WITH_MULTIPLE_SOURCES.toString()
          },
        ]
      },
    ]
  },
];