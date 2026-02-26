import { SmzFilterType, SmzMultiTablesBuilder, SmzMultiTablesState, SmzTableBuilder } from '@ngx-smz/core';
import { of } from 'rxjs';

export interface MultiTablesUseCase {
  id: string;
  title: string;
  getConfig: () => SmzMultiTablesState;
  snippet: string;
}

const EMPLOYEES = [
  { name: 'Alice', department: 'Engineering', salary: 8500 },
  { name: 'Bob', department: 'Engineering', salary: 9200 },
  { name: 'Charlie', department: 'Marketing', salary: 7000 },
  { name: 'Diana', department: 'Marketing', salary: 7500 },
  { name: 'Eve', department: 'Sales', salary: 6800 },
];

const PRODUCTS = [
  { name: 'Widget A', category: 'Hardware', price: 29.90 },
  { name: 'Widget B', category: 'Hardware', price: 49.90 },
  { name: 'Service X', category: 'Software', price: 99.00 },
  { name: 'Service Y', category: 'Software', price: 149.00 },
];

const ORDERS = [
  { orderId: 'ORD-001', customer: 'Acme Corp', total: 1250.00, status: 'Delivered' },
  { orderId: 'ORD-002', customer: 'Globex Inc', total: 890.50, status: 'Pending' },
  { orderId: 'ORD-003', customer: 'Initech', total: 3400.00, status: 'Delivered' },
];

function buildBasicMultiTables(): SmzMultiTablesState {
  return new SmzMultiTablesBuilder()
    .tab('Employees')
      .table(
        of(EMPLOYEES),
        new SmzTableBuilder()
          .setTitle('Team Members')
          .enableGlobalFilter()
          .usePagination()
          .setPaginationDefaultRows(10)
          .useStrippedStyle()
          .columns()
            .text('name', 'Name', '14em')
              .columns
            .text('department', 'Department', '10em')
              .setFilter(SmzFilterType.MULTI_SELECT_STRING)
              .columns
            .currency('salary', 'Salary', '10em')
              .columns
            .table
          .build()
      )
      .tab

    .tab('Products')
      .table(
        of(PRODUCTS),
        new SmzTableBuilder()
          .setTitle('Product Catalog')
          .enableGlobalFilter()
          .useStrippedStyle()
          .columns()
            .text('name', 'Name', '14em')
              .columns
            .text('category', 'Category', '10em')
              .setFilter(SmzFilterType.MULTI_SELECT_STRING)
              .columns
            .currency('price', 'Price', '10em')
              .columns
            .table
          .build()
      )
      .tab

    .tab('Orders')
      .table(
        of(ORDERS),
        new SmzTableBuilder()
          .setTitle('Recent Orders')
          .enableGlobalFilter()
          .useStrippedStyle()
          .columns()
            .text('orderId', 'Order ID', '10em')
              .columns
            .text('customer', 'Customer', '14em')
              .columns
            .currency('total', 'Total', '10em')
              .columns
            .text('status', 'Status', '8em')
              .setFilter(SmzFilterType.MULTI_SELECT_STRING)
              .columns
            .table
          .build()
      )
      .tab

    .build();
}

function buildDuplicableTabs(): SmzMultiTablesState {
  return new SmzMultiTablesBuilder()
    .tab('Main')
      .allowDuplication()
      .table(
        of(EMPLOYEES),
        new SmzTableBuilder()
          .setTitle('Duplicable Tab')
          .enableGlobalFilter()
          .enableColumnVisibility()
          .useStrippedStyle()
          .columns()
            .text('name', 'Name', '14em')
              .columns
            .text('department', 'Department', '10em')
              .columns
            .currency('salary', 'Salary', '10em')
              .columns
            .table
          .build()
      )
      .tab

    .tab('Secondary')
      .table(
        of(PRODUCTS),
        new SmzTableBuilder()
          .setTitle('Products')
          .useStrippedStyle()
          .columns()
            .text('name', 'Name', '14em')
              .columns
            .text('category', 'Category', '10em')
              .columns
            .currency('price', 'Price', '10em')
              .columns
            .table
          .build()
      )
      .tab

    .build();
}

// ────────────────────────────────────────────────────────
// Snippets
// ────────────────────────────────────────────────────────

const SNIPPET_BASIC = `new SmzMultiTablesBuilder()
  .tab('Employees')
    .table(
      of(employees),
      new SmzTableBuilder()
        .setTitle('Team Members')
        .enableGlobalFilter()
        .useStrippedStyle()
        .columns()
          .text('name', 'Name', '14em').columns
          .text('department', 'Department', '10em')
            .setFilter(SmzFilterType.MULTI_SELECT_STRING).columns
          .currency('salary', 'Salary', '10em').columns
          .table
        .build()
    )
    .tab
  .tab('Products')
    .table(of(products), productsTableState)
    .tab
  .tab('Orders')
    .table(of(orders), ordersTableState)
    .tab
  .build();`;

const SNIPPET_DUPLICABLE = `// First tab allows duplication.
new SmzMultiTablesBuilder()
  .tab('Main')
    .allowDuplication()
    .table(of(data), tableState)
    .tab
  .tab('Secondary')
    .table(of(data2), tableState2)
    .tab
  .build();`;

export const MULTI_TABLES_USE_CASES: MultiTablesUseCase[] = [
  { id: 'basic', title: 'Basic', getConfig: buildBasicMultiTables, snippet: SNIPPET_BASIC },
  { id: 'duplicable', title: 'Duplicable tabs', getConfig: buildDuplicableTabs, snippet: SNIPPET_DUPLICABLE },
];
