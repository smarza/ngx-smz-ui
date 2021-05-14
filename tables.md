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

## Basic use
  Insert the `smz-ui-table` in the html and bind the `state` property to your state object in the code.

  ```html
  <smz-ui-table [items]="my-data" [state]="tableState">
  ```

  ```typescript
  export class ExampleComponent implements OnInit {
    ...
    public tableState: SmzTableState;

    constructor() {
    this.tableState = SmzTableState = {
       columns: [
        ...
      ],
    };
  }
  ```

## Caption area

It's the area above the table header, in which the Global Filter is located. Thia area can be customized through the `caption` in `SmzTableState`. Following is the configuration object for that section:

```typescript
caption?: {
  /**
   * Controls de visibility of the entire caption area
   */
  isVisible?: boolean;
  /**
   * Text of the title presented in the caption area
   */
  title?: string;
  /**
   * Controls if the toolbar contents will be aligned to the left or to the right
   */
  toolbarAlignment?: "start" | "end";
  /**
   * Allows the end user to manually filter which columns are visible or not
   */
  columnVisibility?: {
    /**
     * Controls the visibility of the inputs for this feature
     */
    showButton: boolean;
  };
  /**
   * Options for the global filter
   */
  globalFilter?: {
    /**
     * Controsl wheter the global filter is visible or not
     */
    isVisible: boolean;
  };
  /**
   * Allows the end user to manually clear table filters
   */
  clearFilters?: {
    /**
     * Controls whether the clear filter button should be visible or not
     */
    isButtonVisible?: boolean;
    /**
     * Label of the button
     */
    label?: string;
    /**
     * callback to be called when the Clear Filter button is clicked
     */
    callback?: () => void;
  };
  /**
   * Allows the user to control the behavior of the row selection
   */
  rowSelection: {
    /**
     * Controls the visibility of the button that alternates between
     * no selection and multi selection
     */
    isButtonVisible: boolean;
    /**
     * Label of the button
     */
    label?: string;
    /**
     * Width of the column that will host the checkboxes for each row,
     * indicating which isones are selected
     */
    columnWidth?: string;
    /**
     * This callback is executed when you enable/disable the selection
     * This can be used, for instance, in the case you want to open a
     * side bar when the multi selection is activated
     */
    callback?: () => void;
    /**
     * Controls whether the multi selection is enabled or not
     * Use this when you want to control this through the code instead
     * of letting the user activate it with the dedicated button
     */
    isEnabled: boolean;
  };
};
```


## Empty feedback

Controls the behavior of the empty feedback for th user, when the table has no data.
If only the `message` property is used, the table will show a simple text message with it.
If the other properties are used, the feedback will be more complete.


```typescript
  /**
   * Controls the behavior of the empty feedback
   */
  emptyFeedback?: {
    /**
     * Message displayed when the table has no data
     */
    message?: string;
    /**
     * Extra information to be shown below the main message
     */
    extraInfo?: string;
    /**
     * Controls the behavior the opnional action button. If nothing
     * is specified, no button is shown
     */
    actionButton?: {
      /**
       * Button label
       */
      label?: string;
      /**
       * Callback to be executed on the button is clicked
       */
      callback?: () => void;
    }
    image?: string;
  };
```

### Example

![image](https://user-images.githubusercontent.com/10734059/118314361-6a9d0180-b4ca-11eb-83a5-f6464e0ccaf0.png)

```typescript
this.emptyTableState = {
  emptyFeedback: {
    message: 'No itens to display',
    extraInfo: 'The database is empty, if you like, you could use the button bellow to start creating new items',
    image: 'assets/images/tables/empty.svg',
    actionButton: {
      label: 'New Foo',
      callback: () => { console.log('create new foo') }
    },
  },
  columns: [
    ...
  ],
};
```
## Pagination

Controls the behavior of the pagination of the table

```typescript
pagination?: {
  /**
   * If the pagination area is visible or not
   */
  isVisible?: boolean;
  /**
   * How many rows of data will be displayed in the table by default
   */
  rows?: number;
  /**
   * Options to be displayed in the page size dropdown
   */
  rowsPerPageOptions?: number[];
  /**
   * Configurations for the page report summary, that displays the current
   * page number, maximum number of the pages, and so on
   */
  pageReport?: {
    /**
     * Text template, i.e: Showing items {first} to {last} from a total of {totalRecords}
     */
    template?: string;
    /**
     * Controls whether the summary is visible or not
     */
    isVisible?: boolean;
  }
};
```


## Sort


## Menu

## Actions

The options for this section controls the behavior of the actions column of the table.

This column can have a meno to open/close the popup menu and/or other extra action buttons.

Ideally you set only the menu or the custom actions area to be visible, since they both use the same column and also have intersecting functionality.

The menu is defined in the code and the

```typescript
actions?: {
  /**
   * Configuration of the popup menu of the rows
   */
  menu?: {
    /**
     * Controls the visibility of the button menu of the rows
     */
    isVisible: boolean;
    /**
     * Items for the popup menu
     */
    items: SmzMenuItem[];
  };

  /**
   * Custom actions for all rows
   */
  customActions?: {
    /**
     * Controls the visibility of the custom action buttons
     */
    isVisible: boolean;
    /**
     * Width of the column containing the custom actions
     */
    columnWidth: string;
  };

  /**
   * Interaction behaviors for the rows
   */
  rowBehavior?: {
    /**
     * Controls if the rows are clickable or not
     */
    isClickable?: boolean;
    /**
     * Callback to be executed when the row is clicked
     */
    clickCallback?: (event) => void;
    /**
     * Controls hover effect on the rows
     */
    hoverable?: boolean;
  };
};
```

## Columns










# Templates

### Toolbar

The toolbar is an area between the caption area and the table itself:

![image](https://user-images.githubusercontent.com/10734059/118309717-0aa35c80-b4c4-11eb-933d-9542098af84a.png)



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