import { SmzTreeBuilder, SmzTreeState } from '@ngx-smz/core';

export interface TreeUseCase {
  id: string;
  title: string;
  getConfig: () => SmzTreeState;
  getData: () => any[];
  snippet: string;
}

const FLAT_DATA = [
  { id: '1', name: 'Engineering' },
  { id: '2', name: 'Marketing' },
  { id: '3', name: 'Sales' },
  { id: '4', name: 'Operations' },
  { id: '5', name: 'Finance' },
];

const GROUPABLE_DATA = [
  { id: '1', name: 'Alice', company: 'Acme Corp', country: { id: 'BR', name: 'Brazil' } },
  { id: '2', name: 'Bob', company: 'Acme Corp', country: { id: 'BR', name: 'Brazil' } },
  { id: '3', name: 'Charlie', company: 'Globex Inc', country: { id: 'BR', name: 'Brazil' } },
  { id: '4', name: 'Diana', company: 'Globex Inc', country: { id: 'US', name: 'USA' } },
  { id: '5', name: 'Eve', company: 'Initech', country: { id: 'US', name: 'USA' } },
  { id: '6', name: 'Frank', company: 'Initech', country: { id: 'PT', name: 'Portugal' } },
  { id: '7', name: 'Grace', company: 'Umbrella', country: { id: 'PT', name: 'Portugal' } },
];

function buildFlatTree(): SmzTreeState {
  return new SmzTreeBuilder()
    .setTitle('Flat Tree')
    .dataSource()
      .flat('id', 'name')
      .tree
    .enableFilter()
    .build();
}

function buildFlatTreeWithRoot(): SmzTreeState {
  return new SmzTreeBuilder()
    .setTitle('Flat Tree with Root')
    .dataSource()
      .flatWithRoot('Departments', 'id', 'name', { expanded: true })
      .tree
    .enableFilter()
    .build();
}

function buildCheckboxTree(): SmzTreeState {
  return new SmzTreeBuilder()
    .setTitle('Checkbox Selection')
    .setSelection('checkbox')
    .dataSource()
      .flatWithRoot('Select Items', 'id', 'name', { expanded: true })
      .tree
    .enableFilter()
    .build();
}

function buildGroupedTree(): SmzTreeState {
  return new SmzTreeBuilder()
    .setTitle('Grouped by Country > Company')
    .setSelection('checkbox')
    .dataSource()
      .grouping({
        endNode: {
          keyPropertyValue: 'id',
          labelProperty: 'name',
          type: 'person',
          nodeOverrides: { selectable: true },
        },
        group: {
          keyPropertyValue: 'country.id',
          keyPropertyData: 'country',
          labelProperty: 'country.name',
          type: 'country',
          nodeOverrides: { selectable: true },
          group: {
            keyPropertyValue: 'company',
            keyPropertyData: 'company',
            labelProperty: 'company',
            type: 'company',
            nodeOverrides: { selectable: false },
            group: null,
          },
        },
      })
      .tree
    .enableFilter()
    .toolbar('rounded-outlined')
      .setAlignment('end')
      .useTreeExpandButtons()
      .tree
    .build();
}

function buildToolbarTree(): SmzTreeState {
  return new SmzTreeBuilder()
    .setTitle('Tree with Toolbar')
    .dataSource()
      .flatWithRoot('Items', 'id', 'name', { expanded: true })
      .tree
    .enableFilter()
    .toolbar('rounded-outlined')
      .setAlignment('end')
      .useTreeExpandButtons()
      .buttons()
        .button('', 'fa-solid fa-print')
          .setCallback(() => console.log('Print'))
          .setTooltip('Print tree')
          .setColor('info')
          .buttons
        .button('', 'fa-solid fa-download')
          .setCallback(() => console.log('Download'))
          .setTooltip('Download data')
          .setColor('success')
          .buttons
        .toolbar
      .tree
    .build();
}

function buildEmptyTree(): SmzTreeState {
  return new SmzTreeBuilder()
    .setTitle('Empty Feedback')
    .emptyFeedback()
      .setMessage('No items found.')
      .setButtonLabel('Reload')
      .setButtonCallback(() => console.log('Reload'))
      .tree
    .dataSource()
      .flat('id', 'name')
      .tree
    .build();
}

// ────────────────────────────────────────────────────────
// Snippets
// ────────────────────────────────────────────────────────

const SNIPPET_FLAT = `new SmzTreeBuilder()
  .setTitle('Flat Tree')
  .dataSource()
    .flat('id', 'name')
    .tree
  .enableFilter()
  .build();`;

const SNIPPET_FLAT_ROOT = `new SmzTreeBuilder()
  .setTitle('Flat Tree with Root')
  .dataSource()
    .flatWithRoot('Departments', 'id', 'name', { expanded: true })
    .tree
  .enableFilter()
  .build();`;

const SNIPPET_CHECKBOX = `new SmzTreeBuilder()
  .setTitle('Checkbox Selection')
  .setSelection('checkbox')
  .dataSource()
    .flatWithRoot('Select Items', 'id', 'name', { expanded: true })
    .tree
  .enableFilter()
  .build();`;

const SNIPPET_GROUPED = `// Group data by country, then by company.
new SmzTreeBuilder()
  .setTitle('Grouped by Country > Company')
  .setSelection('checkbox')
  .dataSource()
    .grouping({
      endNode: {
        keyPropertyValue: 'id',
        labelProperty: 'name',
        type: 'person',
        nodeOverrides: { selectable: true },
      },
      group: {
        keyPropertyValue: 'country.id',
        keyPropertyData: 'country',
        labelProperty: 'country.name',
        type: 'country',
        nodeOverrides: { selectable: true },
        group: {
          keyPropertyValue: 'company',
          keyPropertyData: 'company',
          labelProperty: 'company',
          type: 'company',
          nodeOverrides: { selectable: false },
          group: null,
        },
      },
    })
    .tree
  .enableFilter()
  .toolbar('rounded-outlined')
    .setAlignment('end')
    .useTreeExpandButtons()
    .tree
  .build();`;

const SNIPPET_TOOLBAR = `new SmzTreeBuilder()
  .setTitle('Tree with Toolbar')
  .dataSource()
    .flatWithRoot('Items', 'id', 'name', { expanded: true })
    .tree
  .enableFilter()
  .toolbar('rounded-outlined')
    .setAlignment('end')
    .useTreeExpandButtons()
    .buttons()
      .button('', 'fa-solid fa-print')
        .setCallback(() => console.log('Print'))
        .setTooltip('Print tree')
        .setColor('info')
        .buttons
      .button('', 'fa-solid fa-download')
        .setCallback(() => console.log('Download'))
        .setTooltip('Download data')
        .setColor('success')
        .buttons
      .toolbar
    .tree
  .build();`;

const SNIPPET_EMPTY = `new SmzTreeBuilder()
  .setTitle('Empty Feedback')
  .emptyFeedback()
    .setMessage('No items found.')
    .setButtonLabel('Reload')
    .setButtonCallback(() => console.log('Reload'))
    .tree
  .dataSource()
    .flat('id', 'name')
    .tree
  .build();`;

export const TREE_USE_CASES: TreeUseCase[] = [
  { id: 'flat', title: 'Flat', getConfig: buildFlatTree, getData: () => FLAT_DATA, snippet: SNIPPET_FLAT },
  { id: 'flat-root', title: 'Flat with root', getConfig: buildFlatTreeWithRoot, getData: () => FLAT_DATA, snippet: SNIPPET_FLAT_ROOT },
  { id: 'checkbox', title: 'Checkbox selection', getConfig: buildCheckboxTree, getData: () => FLAT_DATA, snippet: SNIPPET_CHECKBOX },
  { id: 'grouped', title: 'Grouped', getConfig: buildGroupedTree, getData: () => GROUPABLE_DATA, snippet: SNIPPET_GROUPED },
  { id: 'toolbar', title: 'Toolbar', getConfig: buildToolbarTree, getData: () => FLAT_DATA, snippet: SNIPPET_TOOLBAR },
  { id: 'empty', title: 'Empty feedback', getConfig: buildEmptyTree, getData: () => [], snippet: SNIPPET_EMPTY },
];
