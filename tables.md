# Tables

The `smz-ui-table` is an extension of the `p-table` from `PrimeNG`.

![image](https://user-images.githubusercontent.com/10734059/117876206-78a81380-b279-11eb-8bf9-a9bac0c0ce2f.png)

It's a full featured table containing:

* [Toggleable multi selection](##multi-selection)
* [Customizable caption lane](##caption-customization)
* [User customizable column visilibity](##user-customizable-column-visilibity)
* [Custom menus and actions](##custom-menus-and-actions)
* [Multiple cell data templates](##multiple-cell-data-templates)
* [Original `p-table` exposure](##original-`p-table`-exposure)


# Getting started

## Import

* Import table styles, in your `styles.scss`:

  ```scss
  @import "~ngx-smz-ui/resources/assets/scss/smz-tables.scss";
  ```

* Import the `NgxSmzTablesModule`:

  ```typescript
  import { NgxSmzTablesModule } from 'ngx-smz-ui';
  ```

## Basic usage

  ```html
  <smz-ui-table [items]="my-data" [config]="config">
  ```

  ```typescript
  export class ExampleComponent implements OnInit {
    ...
    public tableState: SmzTableState;

    constructor() {
      this.tableState = {
        currentPageReportTemplate: 'Mostrando {first} a {last} de {totalRecords} itens',
        isSelectable: true,
        rowHover: true,
        rows: 5,
        rowsPerPageOptions: [5, 10, 50, 100, 500],
        showActions: true,
        showCaption: true,
        showCurrentPageReport: true,
        showGlobalFilter: true,
        showPaginator: true,
        showClearFilter: true,
        title: 'Permissões de Trabalho',
        useCustomActions: false,
        customActionWidth: '5em',
        menu: [
          { label: 'Editar', icon: 'pi pi-fw pi-plus', command: (event) => this.test(event) },
          { separator: true },
          { label: 'Apagar', icon: 'pi pi-fw pi-download', command: (event) => this.test(event) },
        ],
        columns: [
          {
            field: 'number',
            header: 'Número',
          },
          {
            field: 'plant.name',
            header: 'Planta',
          },
          {
            field: 'campaign.name',
            header: 'Campanha',
          },
          {
            field: 'description',
            header: 'Descrição',
          },
          {
            contentType: SmzContentType.CALENDAR,
            field: 'date',
            header: 'Data',
          },
        ]
      };
    }
  ```

# 3. Advanced Use

* To customize the cell content or the action cell, add the pTemplate="content" or pTemplate="actions" tag in the HTML of your component.

    ```html
      <smz-ui-table [items]="items$ | async" [config]="config" [loading]="loading" (selectionChange)="test($event)">

        <!-- CONTEÚDOS COM OVERRIDE -->
        <ng-template pTemplate="content" let-item let-col="col">

          <ng-container [ngSwitch]="col.field">
            <ng-container *ngSwitchCase="'description'">
              >> {{ item.description }}
            </ng-container>

            <ng-container *ngSwitchCase="'price'">
              -- {{ item.price }}
            </ng-container>
          </ng-container>

        </ng-template>

        <!-- AÇÕES PERSONALIZADAS -->
        <ng-template pTemplate="actions" let-item>
          <button pButton type="button" class="p-button-secondary" icon="pi pi-cog" (click)="test(item)"></button>
        </ng-template>

      </smz-ui-table>
    ```

* In the component, add the configuration for the table component.
The custom content is going to be called just to the columns with contentData.useTemplate set to true.

    ```typescript
    export class ExampleComponent implements OnInit {
      ...
      public config: SmzTableConfig;

      constructor() {
        this.config = {
          currentPageReportTemplate: 'Mostrando {first} a {last} de {totalRecords} itens',
          isSelectable: true,
          rowHover: true,
          rows: 5,
          rowsPerPageOptions: [5, 10, 50, 100, 500],
          showActions: true,
          showCaption: true,
          showCurrentPageReport: true,
          showGlobalFilter: true,
          showPaginator: true,
          showClearFilter: true,
          title: 'Permissões de Trabalho',
          useCustomActions: false,
          customActionWidth: '5em',
          menu: [
            { label: 'Editar', icon: 'pi pi-fw pi-plus', command: (event) => this.test(event) },
            { separator: true },
            { label: 'Apagar', icon: 'pi pi-fw pi-download', command: (event) => this.test(event) },
          ],
          columns: [
            {
              contentType: SmzContentType.ICON,
              contentData: { useTemplate: false, matches: [ { icon: 'fas fa-check', class: 'green-text darken-3', value: true }, { icon: 'fas fa-times', class: 'red-text darken-2', value: false } ] },
              field: 'isActive',
              filterType: SmzFilterType.BOOLEAN,
              header: 'Situação',
              isGlobalFilterable: false,
              isOrderable: false,
              showFilter: true,
              width: '8em',
              isVisible: true,
            },
            {
              contentType: SmzContentType.TEXT,
              contentData: { useTemplate: false },
              field: 'number',
              filterType: SmzFilterType.TEXT,
              header: 'Número',
              isGlobalFilterable: true,
              isOrderable: false,
              showFilter: true,
              width: '8em',
              isVisible: true,
            },
            {
              contentType: SmzContentType.TEXT,
              contentData: { useTemplate: false },
              field: 'plant.name',
              filterType: SmzFilterType.DROPDOWN,
              header: 'Planta',
              isGlobalFilterable: true,
              isOrderable: true,
              showFilter: true,
              width: '8em',
              isVisible: true,
            },
            {
              contentType: SmzContentType.TEXT,
              contentData: { useTemplate: false },
              field: 'campaign.name',
              filterType: SmzFilterType.MULTI_SELECT,
              header: 'Campanha',
              isGlobalFilterable: true,
              isOrderable: true,
              showFilter: true,
              isVisible: true,
            },
            {
              contentType: SmzContentType.TEXT,
              contentData: { useTemplate: false },
              field: 'description',
              filterType: SmzFilterType.TEXT,
              header: 'Descrição',
              isGlobalFilterable: true,
              isOrderable: true,
              showFilter: true,
              isVisible: true,
            },
            {
              contentType: SmzContentType.CURRENCY,
              contentData: { useTemplate: true },
              field: 'price',
              filterType: SmzFilterType.CURRENCY,
              header: 'Preço',
              isGlobalFilterable: true,
              isOrderable: true,
              showFilter: true,
              width: '8em',
              isVisible: true,
            },
            {
              contentType: SmzContentType.CALENDAR,
              contentData: { useTemplate: false, format: 'shortDate' },
              field: 'date',
              filterType: SmzFilterType.DATE,
              header: 'Data',
              isGlobalFilterable: true,
              isOrderable: true,
              showFilter: true,
              width: '8em',
              isVisible: true,
            },
          ]
        };
      }
    ```

# 4. Contents

* To use the icon generation of the table, you have to provide some conditional configurations as below.

    ```typescript
      this.config = {
        ...
        columns: [
          {
            contentType: SmzContentType.ICON,
            contentData: {
              useTemplate: false,
              matches: [
                  { icon: 'fas fa-check', class: 'green-text darken-3', value: true },
                  { icon: 'fas fa-times', class: 'red-text darken-2', value: false }
                ] },
            header: 'Situação',
          },
    ```





## Toggleable multi selection

## Customizable caption lane
## User customizable column visilibity
## Custom menus and actions
## Multiple cell data templates
## Original `p-table` exposure