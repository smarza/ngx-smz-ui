import { SmzFilterType, SmzTableBuilder, SmzTableState } from '@ngx-smz/core';

export interface TableUseCase {
  id: string;
  title: string;
  getConfig: () => SmzTableState;
  getData: () => any[];
  snippet: string;
}

interface SampleProduct {
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  date: Date;
  active: boolean;
}

const SAMPLE_PRODUCTS: SampleProduct[] = [
  { name: 'Notebook Pro', category: 'Electronics', price: 4599.90, stock: 12, rating: 4.5, date: new Date(2024, 0, 15), active: true },
  { name: 'Wireless Mouse', category: 'Accessories', price: 129.90, stock: 85, rating: 4.2, date: new Date(2024, 1, 20), active: true },
  { name: 'Mechanical Keyboard', category: 'Accessories', price: 349.90, stock: 34, rating: 4.8, date: new Date(2024, 2, 10), active: true },
  { name: 'Monitor 27"', category: 'Electronics', price: 2199.00, stock: 8, rating: 4.6, date: new Date(2024, 3, 5), active: false },
  { name: 'USB-C Hub', category: 'Accessories', price: 189.90, stock: 120, rating: 3.9, date: new Date(2024, 4, 12), active: true },
  { name: 'Webcam HD', category: 'Electronics', price: 299.90, stock: 45, rating: 4.1, date: new Date(2024, 5, 8), active: true },
  { name: 'Headset Gamer', category: 'Audio', price: 459.90, stock: 22, rating: 4.7, date: new Date(2024, 6, 1), active: false },
  { name: 'Desk Lamp', category: 'Office', price: 89.90, stock: 60, rating: 3.5, date: new Date(2024, 7, 18), active: true },
  { name: 'SSD 1TB', category: 'Storage', price: 549.90, stock: 30, rating: 4.9, date: new Date(2024, 8, 25), active: true },
  { name: 'Standing Desk', category: 'Office', price: 1899.00, stock: 5, rating: 4.3, date: new Date(2024, 9, 3), active: true },
  { name: 'Bluetooth Speaker', category: 'Audio', price: 199.90, stock: 50, rating: 4.0, date: new Date(2024, 10, 14), active: false },
  { name: 'External HDD 2TB', category: 'Storage', price: 389.90, stock: 18, rating: 4.4, date: new Date(2024, 11, 22), active: true },
];

function buildBasicTable(): SmzTableState {
  return new SmzTableBuilder()
    .setTitle('Basic Table')
    .enableGlobalFilter()
    .enableClearFilters()
    .usePagination()
    .setPaginationDefaultRows(10)
    .useStrippedStyle()
    .columns()
      .text('name', 'Product', '16em')
        .columns

      .text('category', 'Category', '10em')
        .setFilter(SmzFilterType.MULTI_SELECT_STRING)
        .columns

      .text('price', 'Price', '8em')
        .columns

      .text('stock', 'Stock', '6em')
        .columns

      .table
    .build();
}

function buildColumnsWithFilterTable(): SmzTableState {
  return new SmzTableBuilder()
    .setTitle('Columns with Filters')
    .enableGlobalFilter()
    .enableClearFilters()
    .enableColumnVisibility()
    .usePagination()
    .setPaginationDefaultRows(10)
    .useStrippedStyle()
    .columns()
      .text('name', 'Product', '16em')
        .columns

      .text('category', 'Category', '10em')
        .setFilter(SmzFilterType.MULTI_SELECT_STRING)
        .columns

      .currency('price', 'Price', '10em')
        .columns

      .text('stock', 'Stock', '6em')
        .setFilter(SmzFilterType.NUMERIC)
        .columns

      .date('date', 'Date', '10em')
        .columns

      .table
    .build();
}

function buildDataTransformTable(): SmzTableState {
  return new SmzTableBuilder()
    .setTitle('Data Transform')
    .enableGlobalFilter()
    .enableClearFilters()
    .usePagination()
    .setPaginationDefaultRows(10)
    .useStrippedStyle()
    .columns()
      .text('name', 'Product', '16em')
        .columns

      .dataTransform('price', 'Formatted Price', (price: number) => `R$ ${price.toFixed(2)}`, '10em')
        .columns

      .dataTransform('stock', 'Availability', (stock: number) => stock > 20 ? 'In Stock' : 'Low Stock', '10em')
        .setFilter(SmzFilterType.MULTI_SELECT_STRING)
        .columns

      .dataTransform('rating', 'Rating', (rating: number) => `${'★'.repeat(Math.round(rating))}${'☆'.repeat(5 - Math.round(rating))}`, '10em')
        .columns

      .table
    .build();
}

function buildMenuActionsTable(): SmzTableState {
  return new SmzTableBuilder()
    .setTitle('Menu Actions')
    .enableGlobalFilter()
    .usePagination()
    .setPaginationDefaultRows(10)
    .useStrippedStyle()
    .menu()
      .item('View Details')
        .setCallback((event: any) => console.log('View:', event))
        .setIcon('fa-solid fa-eye')
        .menu

      .item('Edit')
        .setCallback((event: any) => console.log('Edit:', event))
        .setIcon('fa-solid fa-pencil')
        .menu

      .item('Delete')
        .setCallback((event: any) => console.log('Delete:', event))
        .setIcon('fa-solid fa-trash')
        .menu

      .table
    .columns()
      .text('name', 'Product', '16em')
        .columns

      .text('category', 'Category', '10em')
        .columns

      .currency('price', 'Price', '8em')
        .columns

      .table
    .build();
}

function buildMultiSelectionTable(): SmzTableState {
  return new SmzTableBuilder()
    .setTitle('Multi Selection')
    .enableGlobalFilter()
    .enableClearFilters()
    .usePagination()
    .setPaginationDefaultRows(10)
    .useStrippedStyle()
    .allowDefaultMultiSelection()
    .setMultiSelectionCallback((selection: any[]) => {
      console.log('Selected items:', selection);
    })
    .columns()
      .text('name', 'Product', '16em')
        .columns

      .text('category', 'Category', '10em')
        .setFilter(SmzFilterType.MULTI_SELECT_STRING)
        .columns

      .currency('price', 'Price', '10em')
        .columns

      .table
    .build();
}

function buildGridStyleTable(): SmzTableState {
  return new SmzTableBuilder()
    .setTitle('Grid Style')
    .enableGlobalFilter()
    .enableClearFilters()
    .enableColumnVisibility()
    .usePagination()
    .setPaginationDefaultRows(10)
    .useGridStyle()
    .useStrippedStyle()
    .setCustomInitialSorting({ field: 'price', order: -1 })
    .columns()
      .text('name', 'Product', '16em')
        .columns

      .text('category', 'Category', '10em')
        .setFilter(SmzFilterType.MULTI_SELECT_STRING)
        .columns

      .currency('price', 'Price', '10em')
        .columns

      .text('stock', 'Stock', '6em')
        .columns

      .date('date', 'Date', '10em')
        .columns

      .table
    .build();
}

function buildSizeSmallTable(): SmzTableState {
  return new SmzTableBuilder()
    .setTitle('Size: Small')
    .enableGlobalFilter()
    .usePagination()
    .setPaginationDefaultRows(10)
    .useGridStyle()
    .useStrippedStyle()
    .setSize('small')
    .columns()
      .text('name', 'Product', '16em')
        .columns

      .text('category', 'Category', '10em')
        .columns

      .currency('price', 'Price', '8em')
        .columns

      .text('stock', 'Stock', '6em')
        .columns

      .table
    .build();
}

function buildSizeLargeTable(): SmzTableState {
  return new SmzTableBuilder()
    .setTitle('Size: Large')
    .enableGlobalFilter()
    .usePagination()
    .setPaginationDefaultRows(10)
    .useGridStyle()
    .useStrippedStyle()
    .setSize('large')
    .columns()
      .text('name', 'Product', '16em')
        .columns

      .text('category', 'Category', '10em')
        .columns

      .currency('price', 'Price', '8em')
        .columns

      .text('stock', 'Stock', '6em')
        .columns

      .table
    .build();
}

function buildConditionalColumnsTable(): SmzTableState {
  const showRating = true;
  const showDate = false;

  return new SmzTableBuilder()
    .setTitle('Conditional Columns')
    .enableGlobalFilter()
    .enableClearFilters()
    .usePagination()
    .setPaginationDefaultRows(10)
    .useStrippedStyle()
    .columns()
      .text('name', 'Product', '16em')
        .columns

      .text('category', 'Category', '10em')
        .columns

      .if(showRating)
        .text('rating', 'Rating', '6em')
          .columns
        .endIf

      .if(showDate)
        .date('date', 'Date', '10em')
          .columns
        .endIf

      .currency('price', 'Price', '8em')
        .columns

      .table
    .build();
}

function buildEmptyFeedbackTable(): SmzTableState {
  return new SmzTableBuilder()
    .setTitle('Empty State Feedback')
    .enableGlobalFilter()
    .setEmptyFeedbackMessage('No products found')
    .setEmptyFeedbackExtraInfo('Try adjusting your search or add new products.')
    .addEmptyFeedbackButton('Reload', () => console.log('Reload clicked'))
    .useStrippedStyle()
    .columns()
      .text('name', 'Product', '16em')
        .columns

      .text('category', 'Category', '10em')
        .columns

      .currency('price', 'Price', '8em')
        .columns

      .table
    .build();
}

function buildEstimatedWidthTable(): SmzTableState {
  return new SmzTableBuilder()
    .setTitle('Estimated Column Width')
    .enableGlobalFilter()
    .enableClearFilters()
    .usePagination()
    .setPaginationDefaultRows(10)
    .useEstimatedColWidth(200)
    .useStrippedStyle()
    .columns()
      .text('name', 'Product', 'auto')
        .columns

      .text('category', 'Category', 'auto')
        .setFilter(SmzFilterType.MULTI_SELECT_STRING)
        .columns

      .dataTransform('price', 'Price Info', (price: number) => `R$ ${price.toFixed(2)} (${price > 500 ? 'Premium' : 'Standard'})`, 'auto')
        .columns

      .text('stock', 'Stock', '80px')
        .columns

      .table
    .build();
}

// ────────────────────────────────────────────────────────
// Snippets
// ────────────────────────────────────────────────────────

const SNIPPET_BASIC = `new SmzTableBuilder()
  .setTitle('Basic Table')
  .enableGlobalFilter()
  .enableClearFilters()
  .usePagination()
  .setPaginationDefaultRows(10)
  .useStrippedStyle()
  .columns()
    .text('name', 'Product', '16em')
      .columns
    .text('category', 'Category', '10em')
      .setFilter(SmzFilterType.MULTI_SELECT_STRING)
      .columns
    .text('price', 'Price', '8em')
      .columns
    .text('stock', 'Stock', '6em')
      .columns
    .table
  .build();`;

const SNIPPET_COLUMNS_WITH_FILTER = `new SmzTableBuilder()
  .setTitle('Columns with Filters')
  .enableGlobalFilter()
  .enableClearFilters()
  .enableColumnVisibility()
  .usePagination()
  .setPaginationDefaultRows(10)
  .useStrippedStyle()
  .columns()
    .text('name', 'Product', '16em')
      .columns
    .text('category', 'Category', '10em')
      .setFilter(SmzFilterType.MULTI_SELECT_STRING)
      .columns
    .currency('price', 'Price', '10em')
      .columns
    .text('stock', 'Stock', '6em')
      .setFilter(SmzFilterType.NUMERIC)
      .columns
    .date('date', 'Date', '10em')
      .columns
    .table
  .build();`;

const SNIPPET_DATA_TRANSFORM = `// Customize column content using dataTransform.
new SmzTableBuilder()
  .setTitle('Data Transform')
  .enableGlobalFilter()
  .usePagination()
  .useStrippedStyle()
  .columns()
    .text('name', 'Product', '16em')
      .columns
    .dataTransform('price', 'Formatted Price',
      (price: number) => \`R$ \${price.toFixed(2)}\`, '10em')
      .columns
    .dataTransform('stock', 'Availability',
      (stock: number) => stock > 20 ? 'In Stock' : 'Low Stock', '10em')
      .setFilter(SmzFilterType.MULTI_SELECT_STRING)
      .columns
    .dataTransform('rating', 'Rating',
      (rating: number) => '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating)), '10em')
      .columns
    .table
  .build();`;

const SNIPPET_MENU_ACTIONS = `// Row context menu with icons and callbacks.
new SmzTableBuilder()
  .setTitle('Menu Actions')
  .enableGlobalFilter()
  .usePagination()
  .useStrippedStyle()
  .menu()
    .item('View Details')
      .setCallback((event) => console.log('View:', event))
      .setIcon('fa-solid fa-eye')
      .menu
    .item('Edit')
      .setCallback((event) => console.log('Edit:', event))
      .setIcon('fa-solid fa-pencil')
      .menu
    .item('Delete')
      .setCallback((event) => console.log('Delete:', event))
      .setIcon('fa-solid fa-trash')
      .menu
    .table
  .columns()
    .text('name', 'Product', '16em').columns
    .text('category', 'Category', '10em').columns
    .currency('price', 'Price', '8em').columns
    .table
  .build();`;

const SNIPPET_MULTI_SELECTION = `// Checkbox selection with callback.
new SmzTableBuilder()
  .setTitle('Multi Selection')
  .enableGlobalFilter()
  .usePagination()
  .useStrippedStyle()
  .allowDefaultMultiSelection()
  .setMultiSelectionCallback((selection) => {
    console.log('Selected items:', selection);
  })
  .columns()
    .text('name', 'Product', '16em').columns
    .text('category', 'Category', '10em')
      .setFilter(SmzFilterType.MULTI_SELECT_STRING).columns
    .currency('price', 'Price', '10em').columns
    .table
  .build();`;

const SNIPPET_GRID_STYLE = `// Grid lines, sorted by price descending, column visibility toggle.
new SmzTableBuilder()
  .setTitle('Grid Style')
  .enableGlobalFilter()
  .enableClearFilters()
  .enableColumnVisibility()
  .usePagination()
  .useGridStyle()
  .useStrippedStyle()
  .setCustomInitialSorting({ field: 'price', order: -1 })
  .columns()
    .text('name', 'Product', '16em').columns
    .text('category', 'Category', '10em')
      .setFilter(SmzFilterType.MULTI_SELECT_STRING).columns
    .currency('price', 'Price', '10em').columns
    .text('stock', 'Stock', '6em').columns
    .date('date', 'Date', '10em').columns
    .table
  .build();`;

const SNIPPET_SIZE_SMALL = `// Dense layout using setSize('small').
new SmzTableBuilder()
  .setTitle('Size: Small')
  .usePagination()
  .useGridStyle()
  .useStrippedStyle()
  .setSize('small')
  .columns()
    .text('name', 'Product', '16em').columns
    .text('category', 'Category', '10em').columns
    .currency('price', 'Price', '8em').columns
    .text('stock', 'Stock', '6em').columns
    .table
  .build();`;

const SNIPPET_SIZE_LARGE = `// Spacious layout using setSize('large').
new SmzTableBuilder()
  .setTitle('Size: Large')
  .usePagination()
  .useGridStyle()
  .useStrippedStyle()
  .setSize('large')
  .columns()
    .text('name', 'Product', '16em').columns
    .text('category', 'Category', '10em').columns
    .currency('price', 'Price', '8em').columns
    .text('stock', 'Stock', '6em').columns
    .table
  .build();`;

const SNIPPET_CONDITIONAL_COLUMNS = `// Show or hide columns based on runtime conditions.
const showRating = true;
const showDate = false;

new SmzTableBuilder()
  .setTitle('Conditional Columns')
  .usePagination()
  .useStrippedStyle()
  .columns()
    .text('name', 'Product', '16em').columns
    .text('category', 'Category', '10em').columns
    .if(showRating)
      .text('rating', 'Rating', '6em').columns
      .endIf
    .if(showDate)
      .date('date', 'Date', '10em').columns
      .endIf
    .currency('price', 'Price', '8em').columns
    .table
  .build();`;

const SNIPPET_EMPTY_FEEDBACK = `// Custom message, extra info, and action button for empty state.
new SmzTableBuilder()
  .setTitle('Empty State Feedback')
  .setEmptyFeedbackMessage('No products found')
  .setEmptyFeedbackExtraInfo('Try adjusting your search or add new products.')
  .addEmptyFeedbackButton('Reload', () => console.log('Reload clicked'))
  .useStrippedStyle()
  .columns()
    .text('name', 'Product', '16em').columns
    .text('category', 'Category', '10em').columns
    .currency('price', 'Price', '8em').columns
    .table
  .build();`;

const SNIPPET_ESTIMATED_WIDTH = `// Auto-estimate column widths with a max cap.
new SmzTableBuilder()
  .setTitle('Estimated Column Width')
  .enableGlobalFilter()
  .usePagination()
  .useEstimatedColWidth(200)
  .useStrippedStyle()
  .columns()
    .text('name', 'Product', 'auto').columns
    .text('category', 'Category', 'auto')
      .setFilter(SmzFilterType.MULTI_SELECT_STRING).columns
    .dataTransform('price', 'Price Info',
      (price: number) => \`R$ \${price.toFixed(2)} (\${price > 500 ? 'Premium' : 'Standard'})\`, 'auto')
      .columns
    .text('stock', 'Stock', '80px').columns
    .table
  .build();`;

export const TABLE_USE_CASES: TableUseCase[] = [
  {
    id: 'basic',
    title: 'Basic',
    getConfig: buildBasicTable,
    getData: () => SAMPLE_PRODUCTS,
    snippet: SNIPPET_BASIC,
  },
  {
    id: 'columns-with-filter',
    title: 'Columns with filters',
    getConfig: buildColumnsWithFilterTable,
    getData: () => SAMPLE_PRODUCTS,
    snippet: SNIPPET_COLUMNS_WITH_FILTER,
  },
  {
    id: 'data-transform',
    title: 'Data transform',
    getConfig: buildDataTransformTable,
    getData: () => SAMPLE_PRODUCTS,
    snippet: SNIPPET_DATA_TRANSFORM,
  },
  {
    id: 'menu-actions',
    title: 'Menu actions',
    getConfig: buildMenuActionsTable,
    getData: () => SAMPLE_PRODUCTS,
    snippet: SNIPPET_MENU_ACTIONS,
  },
  {
    id: 'multi-selection',
    title: 'Multi selection',
    getConfig: buildMultiSelectionTable,
    getData: () => SAMPLE_PRODUCTS,
    snippet: SNIPPET_MULTI_SELECTION,
  },
  {
    id: 'grid-style',
    title: 'Grid style',
    getConfig: buildGridStyleTable,
    getData: () => SAMPLE_PRODUCTS,
    snippet: SNIPPET_GRID_STYLE,
  },
  {
    id: 'size-small',
    title: 'Size: Small',
    getConfig: buildSizeSmallTable,
    getData: () => SAMPLE_PRODUCTS,
    snippet: SNIPPET_SIZE_SMALL,
  },
  {
    id: 'size-large',
    title: 'Size: Large',
    getConfig: buildSizeLargeTable,
    getData: () => SAMPLE_PRODUCTS,
    snippet: SNIPPET_SIZE_LARGE,
  },
  {
    id: 'conditional-columns',
    title: 'Conditional columns',
    getConfig: buildConditionalColumnsTable,
    getData: () => SAMPLE_PRODUCTS,
    snippet: SNIPPET_CONDITIONAL_COLUMNS,
  },
  {
    id: 'empty-feedback',
    title: 'Empty state feedback',
    getConfig: buildEmptyFeedbackTable,
    getData: () => [],
    snippet: SNIPPET_EMPTY_FEEDBACK,
  },
  {
    id: 'estimated-width',
    title: 'Estimated column width',
    getConfig: buildEstimatedWidthTable,
    getData: () => SAMPLE_PRODUCTS,
    snippet: SNIPPET_ESTIMATED_WIDTH,
  },
];
