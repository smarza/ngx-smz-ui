import { SmzDialogBuilder, SmzDialogsService } from '@ngx-smz/core';

export interface DialogUseCase {
  id: string;
  title: string;
  description: string;
  open: (service: SmzDialogsService) => void;
  snippet: string;
}

export interface DialogUseCaseSection {
  id: string;
  label: string;
  useCases: DialogUseCase[];
}

// ────────────────────────────────────────────────────────
// Header
// ────────────────────────────────────────────────────────

function openHeaderWithTitle(service: SmzDialogsService): void {
  service.open(
    new SmzDialogBuilder<void>()
      .setTitle('Header With Title Demo')
      .setLayout('EXTRA_SMALL', 'col-12')
      .setLayout('EXTRA_LARGE', 'col-8')
      .build()
  );
}

function openHeaderHidden(service: SmzDialogsService): void {
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
}

function openHeaderWithMaximize(service: SmzDialogsService): void {
  service.open(
    new SmzDialogBuilder<void>()
      .setTitle('Maximize Demo')
      .setLayout('EXTRA_SMALL', 'col-12')
      .setLayout('EXTRA_LARGE', 'col-8')
      .allowMaximize()
      .build()
  );
}

function openHeaderWithMinimize(service: SmzDialogsService): void {
  service.open(
    new SmzDialogBuilder<void>()
      .setTitle('Minimize Demo')
      .setLayout('EXTRA_SMALL', 'col-12')
      .setLayout('EXTRA_LARGE', 'col-8')
      .allowMinimize('DEMO A')
      .build()
  );
}

// ────────────────────────────────────────────────────────
// Controls
// ────────────────────────────────────────────────────────

function openCloseOnEscape(service: SmzDialogsService): void {
  service.open(
    new SmzDialogBuilder<void>()
      .setTitle('Close On Escape')
      .setLayout('EXTRA_SMALL', 'col-12')
      .setLayout('EXTRA_LARGE', 'col-8')
      .closeOnEscape()
      .build()
  );
}

function openConfirmOnEnter(service: SmzDialogsService): void {
  service.open(
    new SmzDialogBuilder<void>()
      .setTitle('Confirm On Enter')
      .setLayout('EXTRA_SMALL', 'col-12')
      .setLayout('EXTRA_LARGE', 'col-8')
      .confirmOnEnter()
      .buttons()
        .confirm()
          .callback(() => console.log('Confirmed via Enter'))
          .buttons
        .dialog
      .build()
  );
}

function openDismissableMask(service: SmzDialogsService): void {
  service.open(
    new SmzDialogBuilder<void>()
      .setTitle('Dismissable Mask')
      .setLayout('EXTRA_SMALL', 'col-12')
      .setLayout('EXTRA_LARGE', 'col-8')
      .dismissableMask()
      .build()
  );
}

function openOpenMaximized(service: SmzDialogsService): void {
  service.open(
    new SmzDialogBuilder<void>()
      .setTitle('Open Maximized')
      .setLayout('EXTRA_SMALL', 'col-12')
      .setLayout('EXTRA_LARGE', 'col-8')
      .openMaximized()
      .build()
  );
}

function openHideRestoreButton(service: SmzDialogsService): void {
  service.open(
    new SmzDialogBuilder<void>()
      .setTitle('Hide Restore Button')
      .setLayout('EXTRA_SMALL', 'col-12')
      .setLayout('EXTRA_LARGE', 'col-8')
      .openMaximized()
      .hideRestoreButton()
      .build()
  );
}

// ────────────────────────────────────────────────────────
// Buttons
// ────────────────────────────────────────────────────────

function openBuiltInButtons(service: SmzDialogsService): void {
  service.open(
    new SmzDialogBuilder<void>()
      .setTitle('Built-in Buttons')
      .setLayout('EXTRA_SMALL', 'col-12')
      .setLayout('EXTRA_LARGE', 'col-8')
      .buttons()
        .cancel()
          .callback(() => console.log('cancel'))
          .buttons
        .ok()
          .callback(() => console.log('ok'))
          .buttons
        .confirm()
          .callback(() => console.log('confirm'))
          .buttons
        .dialog
      .build()
  );
}

function openSaveButton(service: SmzDialogsService): void {
  service.open(
    new SmzDialogBuilder<void>()
      .setTitle('Save Button')
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
}

function openRenamedButtons(service: SmzDialogsService): void {
  service.open(
    new SmzDialogBuilder<void>()
      .setTitle('Renamed Buttons')
      .setLayout('EXTRA_SMALL', 'col-12')
      .setLayout('EXTRA_LARGE', 'col-8')
      .buttons()
        .cancel('NO')
          .callback(() => console.log('NO'))
          .buttons
        .ok('YES')
          .callback(() => console.log('YES'))
          .buttons
        .dialog
      .build()
  );
}

function openStyledButtons(service: SmzDialogsService): void {
  service.open(
    new SmzDialogBuilder<void>()
      .setTitle('Styled Buttons')
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
}

function openTopbarButtons(service: SmzDialogsService): void {
  service.open(
    new SmzDialogBuilder<void>()
      .setTitle('Topbar Buttons')
      .buttons()
        .topbar()
          .setIcon('fa-solid fa-question')
          .setCallback(() => console.log('Help'))
          .setTooltip('Ajuda')
          .buttons
        .topbar()
          .setIcon('fa-solid fa-bug')
          .setCallback(() => console.log('Report'))
          .setTooltip('Reportar Bug')
          .setClass('text-red-500')
          .buttons
        .dialog
      .build()
  );
}

function openCloseDialogButton(service: SmzDialogsService): void {
  service.open(
    new SmzDialogBuilder<void>()
      .setTitle('Close Dialog Button')
      .buttons()
        .custom('CLOSE')
          .closeDialog()
          .buttons
        .dialog
      .build()
  );
}

function openDependsOnValidation(service: SmzDialogsService): void {
  service.open(
    new SmzDialogBuilder<void>()
      .setTitle('Depends On Validation')
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
}

// ────────────────────────────────────────────────────────
// Footer
// ────────────────────────────────────────────────────────

function openHiddenFooter(service: SmzDialogsService): void {
  service.open(
    new SmzDialogBuilder<void>()
      .setTitle('Hidden Footer')
      .setLayout('EXTRA_SMALL', 'col-12')
      .setLayout('EXTRA_LARGE', 'col-8')
      .hideFooter()
      .build()
  );
}

// ────────────────────────────────────────────────────────
// Content
// ────────────────────────────────────────────────────────

function openMessage(service: SmzDialogsService): void {
  service.open(
    new SmzDialogBuilder<void>()
      .setTitle('Message Content')
      .setLayout('EXTRA_SMALL', 'col-12')
      .setLayout('EXTRA_LARGE', 'col-6')
      .message([
        'This is the first line of the message.',
        '',
        'This is the <strong>third line</strong> with HTML support.',
        'And a fourth line for good measure.'
      ])
      .buttons()
        .ok()
          .buttons
        .dialog
      .build()
  );
}

function openMarkdown(service: SmzDialogsService): void {
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
      .setTitle('Dialog with Markdown')
      .setLayout('EXTRA_SMALL', 'col-12')
      .setLayout('EXTRA_LARGE', 'col-8')
      .markdown(markdown)
      .build()
  );
}

function openWithForm(service: SmzDialogsService): void {
  service.open(
    new SmzDialogBuilder<void>()
      .setTitle('Dialog with Form')
      .setLayout('EXTRA_SMALL', 'col-12')
      .setLayout('EXTRA_LARGE', 'col-6')
      .form()
        .group('Personal Info')
          .setLayout('EXTRA_SMALL', 'col-12')
          .text('name', 'Nome')
            .validators().required().input
            .group
          .text('email', 'Email')
            .validators().required().email().input
            .group
          .dropdown('country', 'País', [
            { id: 'BR', name: 'Brazil' },
            { id: 'US', name: 'United States' },
            { id: 'PT', name: 'Portugal' },
          ])
            .validators().required().input
            .group
          .form
        .dialog
      .buttons()
        .confirm()
          .dependsOnValidation()
          .callback((data: any) => console.log('Form data:', data))
          .buttons
        .dialog
      .build()
  );
}

function openWithFormAndCalendar(service: SmzDialogsService): void {
  service.open(
    new SmzDialogBuilder<void>()
      .setTitle('Form with Calendar')
      .setLayout('EXTRA_SMALL', 'col-12')
      .setLayout('EXTRA_LARGE', 'col-6')
      .closeOnEscape()
      .dismissableMask()
      .confirmOnEnter()
      .form()
        .group()
          .calendar('date', 'Agendamento')
            .useDateAndTime()
            .group
          .dropdown('priority', 'Prioridade', [
            { id: '1', name: 'Alta' },
            { id: '2', name: 'Média' },
            { id: '3', name: 'Baixa' },
          ])
            .validators().required().input
            .group
          .form
        .dialog
      .buttons()
        .confirm()
          .dependsOnValidation()
          .callback((data: any) => console.log('Form data:', data))
          .buttons
        .dialog
      .build()
  );
}

function openConditionalDialog(service: SmzDialogsService): void {
  service.open(
    new SmzDialogBuilder<void>()
      .if(true)
        .setTitle('Title inside first if')
        .endIf
      .if(false)
        .setTitle('Title inside second if')
        .endIf
      .setLayout('EXTRA_SMALL', 'col-12')
      .setLayout('EXTRA_LARGE', 'col-8')
      .message(['This dialog title was set conditionally using .if()'])
      .buttons()
        .ok()
          .buttons
        .dialog
      .build()
  );
}

// ────────────────────────────────────────────────────────
// Snippets
// ────────────────────────────────────────────────────────

const SNIPPET_HEADER_TITLE = `new SmzDialogBuilder<void>()
  .setTitle('Header With Title Demo')
  .setLayout('EXTRA_SMALL', 'col-12')
  .setLayout('EXTRA_LARGE', 'col-8')
  .build();`;

const SNIPPET_HEADER_HIDDEN = `new SmzDialogBuilder<void>()
  .hideHeader()
  .buttons()
    .ok().buttons
    .dialog
  .build();`;

const SNIPPET_HEADER_MAXIMIZE = `new SmzDialogBuilder<void>()
  .setTitle('Maximize Demo')
  .allowMaximize()
  .build();`;

const SNIPPET_HEADER_MINIMIZE = `new SmzDialogBuilder<void>()
  .setTitle('Minimize Demo')
  .allowMinimize('DEMO A')
  .build();`;

const SNIPPET_CLOSE_ON_ESCAPE = `new SmzDialogBuilder<void>()
  .setTitle('Close On Escape')
  .closeOnEscape()
  .build();`;

const SNIPPET_CONFIRM_ON_ENTER = `new SmzDialogBuilder<void>()
  .setTitle('Confirm On Enter')
  .confirmOnEnter()
  .buttons()
    .confirm()
      .callback(() => console.log('Confirmed'))
      .buttons
    .dialog
  .build();`;

const SNIPPET_DISMISSABLE_MASK = `new SmzDialogBuilder<void>()
  .setTitle('Dismissable Mask')
  .dismissableMask()
  .build();`;

const SNIPPET_OPEN_MAXIMIZED = `new SmzDialogBuilder<void>()
  .setTitle('Open Maximized')
  .openMaximized()
  .build();`;

const SNIPPET_HIDE_RESTORE = `new SmzDialogBuilder<void>()
  .setTitle('Hide Restore Button')
  .openMaximized()
  .hideRestoreButton()
  .build();`;

const SNIPPET_BUILTIN_BUTTONS = `new SmzDialogBuilder<void>()
  .setTitle('Built-in Buttons')
  .buttons()
    .cancel().callback(() => console.log('cancel')).buttons
    .ok().callback(() => console.log('ok')).buttons
    .confirm().callback(() => console.log('confirm')).buttons
    .dialog
  .build();`;

const SNIPPET_SAVE_BUTTON = `new SmzDialogBuilder<void>()
  .setTitle('Save Button')
  .buttons()
    .cancel().buttons
    .save().buttons
    .dialog
  .build();`;

const SNIPPET_RENAMED_BUTTONS = `// Rename built-in buttons with custom labels.
new SmzDialogBuilder<void>()
  .setTitle('Renamed Buttons')
  .buttons()
    .cancel('NO').buttons
    .ok('YES').buttons
    .dialog
  .build();`;

const SNIPPET_STYLED_BUTTONS = `// Multiple custom buttons with PrimeNG styling classes.
new SmzDialogBuilder<void>()
  .setTitle('Styled Buttons')
  .buttons()
    .custom('OUTLINED DANGER').setClass('p-button-outlined p-button-danger').buttons
    .custom('PRIMARY').setClass('p-button-primary').buttons
    .custom('SUCCESS').setClass('p-button-success').buttons
    .dialog
  .build();`;

const SNIPPET_TOPBAR_BUTTONS = `// Buttons in the dialog header (topbar).
new SmzDialogBuilder<void>()
  .setTitle('Topbar Buttons')
  .buttons()
    .topbar()
      .setIcon('fa-solid fa-question')
      .setCallback(() => console.log('Help'))
      .setTooltip('Ajuda')
      .buttons
    .topbar()
      .setIcon('fa-solid fa-bug')
      .setCallback(() => console.log('Report'))
      .setTooltip('Reportar Bug')
      .setClass('text-red-500')
      .buttons
    .dialog
  .build();`;

const SNIPPET_CLOSE_DIALOG = `new SmzDialogBuilder<void>()
  .setTitle('Close Dialog Button')
  .buttons()
    .custom('CLOSE').closeDialog().buttons
    .dialog
  .build();`;

const SNIPPET_DEPENDS_VALIDATION = `// Button only enabled when form is valid.
new SmzDialogBuilder<void>()
  .setTitle('Depends On Validation')
  .form()
    .group()
      .checkbox('input', 'Is Valid ?', false)
        .validators().required().input
      .group.form
    .dialog
  .buttons()
    .custom('CLOSE IF VALID')
      .dependsOnValidation()
      .closeDialog()
      .buttons
    .dialog
  .build();`;

const SNIPPET_HIDDEN_FOOTER = `new SmzDialogBuilder<void>()
  .setTitle('Hidden Footer')
  .hideFooter()
  .build();`;

const SNIPPET_MESSAGE = `new SmzDialogBuilder<void>()
  .setTitle('Message Content')
  .message([
    'First line of the message.',
    '',
    'Third line with <strong>HTML</strong> support.',
  ])
  .buttons()
    .ok().buttons
    .dialog
  .build();`;

const SNIPPET_MARKDOWN = `const markdown = \`## Markdown __rulez__!
---
### Lists
1. Ordered list
2. Another bullet point
> Blockquote to the max\`;

new SmzDialogBuilder<void>()
  .setTitle('Dialog with Markdown')
  .markdown(markdown)
  .build();`;

const SNIPPET_WITH_FORM = `new SmzDialogBuilder<void>()
  .setTitle('Dialog with Form')
  .form()
    .group('Personal Info')
      .text('name', 'Nome').validators().required().input.group
      .text('email', 'Email').validators().required().email().input.group
      .dropdown('country', 'País', options)
        .validators().required().input.group
      .form
    .dialog
  .buttons()
    .confirm()
      .dependsOnValidation()
      .callback((data) => console.log('Form data:', data))
      .buttons
    .dialog
  .build();`;

const SNIPPET_FORM_CALENDAR = `// Form with calendar, dropdown, and keyboard shortcuts.
new SmzDialogBuilder<void>()
  .setTitle('Form with Calendar')
  .closeOnEscape()
  .dismissableMask()
  .confirmOnEnter()
  .form()
    .group()
      .calendar('date', 'Agendamento').useDateAndTime().group
      .dropdown('priority', 'Prioridade', options)
        .validators().required().input.group
      .form
    .dialog
  .buttons()
    .confirm().dependsOnValidation()
      .callback((data) => console.log(data)).buttons
    .dialog
  .build();`;

const SNIPPET_CONDITIONAL = `// Conditional builder using .if() / .endIf.
new SmzDialogBuilder<void>()
  .if(true)
    .setTitle('Title inside first if')
    .endIf
  .if(false)
    .setTitle('This title will NOT be applied')
    .endIf
  .message(['Title was set conditionally'])
  .build();`;

// ────────────────────────────────────────────────────────
// Sections
// ────────────────────────────────────────────────────────

export const DIALOG_USE_CASE_SECTIONS: DialogUseCaseSection[] = [
  {
    id: 'header',
    label: 'Header',
    useCases: [
      { id: 'header-title', title: 'With title', description: 'Dialog com título padrão.', open: openHeaderWithTitle, snippet: SNIPPET_HEADER_TITLE },
      { id: 'header-hidden', title: 'Hidden header', description: 'Header oculto, apenas botões.', open: openHeaderHidden, snippet: SNIPPET_HEADER_HIDDEN },
      { id: 'header-maximize', title: 'Maximize', description: 'Botão de maximizar no header.', open: openHeaderWithMaximize, snippet: SNIPPET_HEADER_MAXIMIZE },
      { id: 'header-minimize', title: 'Minimize', description: 'Botão de minimizar no header.', open: openHeaderWithMinimize, snippet: SNIPPET_HEADER_MINIMIZE },
    ],
  },
  {
    id: 'controls',
    label: 'Controls',
    useCases: [
      { id: 'close-on-escape', title: 'Close on Escape', description: 'Fecha ao pressionar Escape.', open: openCloseOnEscape, snippet: SNIPPET_CLOSE_ON_ESCAPE },
      { id: 'confirm-on-enter', title: 'Confirm on Enter', description: 'Confirma ao pressionar Enter.', open: openConfirmOnEnter, snippet: SNIPPET_CONFIRM_ON_ENTER },
      { id: 'dismissable-mask', title: 'Dismissable mask', description: 'Fecha ao clicar no overlay.', open: openDismissableMask, snippet: SNIPPET_DISMISSABLE_MASK },
      { id: 'open-maximized', title: 'Open maximized', description: 'Abre já maximizado.', open: openOpenMaximized, snippet: SNIPPET_OPEN_MAXIMIZED },
      { id: 'hide-restore', title: 'Hide restore button', description: 'Maximizado sem botão de restaurar.', open: openHideRestoreButton, snippet: SNIPPET_HIDE_RESTORE },
    ],
  },
  {
    id: 'buttons',
    label: 'Buttons',
    useCases: [
      { id: 'builtin-buttons', title: 'Built-in buttons', description: 'Cancel, OK e Confirm.', open: openBuiltInButtons, snippet: SNIPPET_BUILTIN_BUTTONS },
      { id: 'save-button', title: 'Save button', description: 'Cancel + Save.', open: openSaveButton, snippet: SNIPPET_SAVE_BUTTON },
      { id: 'renamed-buttons', title: 'Renamed buttons', description: 'Botões com label customizado.', open: openRenamedButtons, snippet: SNIPPET_RENAMED_BUTTONS },
      { id: 'styled-buttons', title: 'Styled buttons', description: 'Botões com classes PrimeNG.', open: openStyledButtons, snippet: SNIPPET_STYLED_BUTTONS },
      { id: 'topbar-buttons', title: 'Topbar buttons', description: 'Botões no header do dialog.', open: openTopbarButtons, snippet: SNIPPET_TOPBAR_BUTTONS },
      { id: 'close-dialog', title: 'Close dialog button', description: 'Botão custom que fecha o dialog.', open: openCloseDialogButton, snippet: SNIPPET_CLOSE_DIALOG },
      { id: 'depends-validation', title: 'Depends on validation', description: 'Botão habilitado só quando form válido.', open: openDependsOnValidation, snippet: SNIPPET_DEPENDS_VALIDATION },
    ],
  },
  {
    id: 'footer',
    label: 'Footer',
    useCases: [
      { id: 'hidden-footer', title: 'Hidden footer', description: 'Footer completamente oculto.', open: openHiddenFooter, snippet: SNIPPET_HIDDEN_FOOTER },
    ],
  },
  {
    id: 'content',
    label: 'Content',
    useCases: [
      { id: 'message', title: 'Message', description: 'Conteúdo com linhas de texto/HTML.', open: openMessage, snippet: SNIPPET_MESSAGE },
      { id: 'markdown', title: 'Markdown', description: 'Conteúdo renderizado em Markdown.', open: openMarkdown, snippet: SNIPPET_MARKDOWN },
      { id: 'with-form', title: 'With form', description: 'Dialog com formulário embutido.', open: openWithForm, snippet: SNIPPET_WITH_FORM },
      { id: 'form-calendar', title: 'Form with calendar', description: 'Formulário com calendar e atalhos.', open: openWithFormAndCalendar, snippet: SNIPPET_FORM_CALENDAR },
      { id: 'conditional', title: 'Conditional (.if)', description: 'Título definido condicionalmente.', open: openConditionalDialog, snippet: SNIPPET_CONDITIONAL },
    ],
  },
];
