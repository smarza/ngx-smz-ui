# Tables

The `smz-ui-table` is an extension of the `p-table` from `PrimeNG`.

![image](https://user-images.githubusercontent.com/10734059/117876206-78a81380-b279-11eb-8bf9-a9bac0c0ce2f.png)

It's a full featured table containing:

* [Toggleable multi selection](##caption-area)
* [Customizable caption lane](##caption-area)
* [User customizable column visilibity](##caption-area)
* [Custom menus and actions](##custom-action-buttons)
* [Multiple cell data templates](###-column-types)


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
    showDropdownSelector: boolean;
    /**
     * Individual buttons that controls the visibility of each column
     */
    showColumnHideButton: boolean;
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
When the `columnVisibility` is enbaled a dropdown will be shown in the caption area allowing the user to show or hide any column in the table:

![image](https://user-images.githubusercontent.com/10734059/118338045-9381be80-b4eb-11eb-85ff-601f3278b65a.png)
## Empty feedback

Controls the behavior of the empty feedback for the user, when the table has no data.
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
     * Controls the behavior the optional action button. If nothing
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

Controls the initial sorting of the table. This object is sent directly to PrimeNG. Please refer to the `p-table` [documentation](https://www.primefaces.org/primeng/showcase/#/table/sort)

## Styles

Represents all the customizable styles of the table

```typescript
  styles?: {
    /**
     * Use striped to add zebra-striping to the row's styles
     */
    striped?: boolean
    /**
     * Use showGrid to add borders between cells
     */
    showGrid?: boolean;
    /**
     * Use size to specify the size and spacing between rows
     */
     size?: 'small' | 'regular' | 'large';
};
```

## Viewport behavior

This section controls the viewport state of the table.

The `viewport` property controls the behavior when there is no data loaded yet, showing a table skeleton when there is no data available yet.

For this to work, you need to have a `width` set for each columns. The width property will be handled by the [Columns](##columns).

Keep in mind that `resizableColumns` feature automatically enables the horizontal scroll of the viewport.

```typescript
/**
* Viewport Behavior of the table
*/
viewport?: {
  /**
  * when specifies, enables horizontal and/or vertical scrolling
  */
  scrollable: boolean;
  /**
  * height of the scroll viewport in fixed pixels or the "flex" keyword for a dynamic size.
  */
  scrollHeight: 'flex' | string;
  /**
  * when enabled, columns can be resized using drag and drop.
  */
  resizableColumns: boolean;
  /**
  * defines whether the overall table width should change on column resize, valid values are "fit" and "expand".
  */
  columnResizeMode: 'fit' | 'expand';
};
```

## Initial behavior

This section controls the initial state of the table.

The `skeleton` property controls the behavior when there is no data loaded yet, showing a table skeleton when there is no data available yet.

For this to work, you need to have a `null` initial value for the `items` property. While the value is `null`, the skeleton will be visible. When the data arrives from the API the skeleton will be exhanged by the actual data. In the case there are no items to display, the data must arrive as an empty array, and then it will be handled by the [Empty feedback behavior](##empty-feedback).

```typescript
initialState?:{
  /**
   * Setup behavior when the data is still not loaded, i.e. the `items`
   * property is null. This is different from the case when there is no
   * data to display, i.e. the data came as an empty array from the API
   */
  skeleton?: {
    /**
     * enables or disables the skeleton behavior
     */
    isEnabled?: boolean;
    /**
     * How many rows to display in while in the skeleton state
     */
    rows?: number;
  };
};
```
## Actions

The options for this section controls the behavior of the actions column of the table.

This column can have a menu to open/close the popup menu and/or other extra action buttons.

Ideally you set only the menu or the custom actions area to be visible, since they both use the same column and also have intersecting functionality.

The menu is defined in the code and the contents are defined in the HTML template, see [Custom action buttons](##custom-action-buttons)

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

> TODO: Explain the new menu behavior
## Columns

This section is where you setup the table columns. It's an array of the following interface:

```typescript
export interface SmzTableColumn {
  /**
   * Property name, nested properties can be used, i.e. person.name
   */
  field: string;

  /**
   * Title of the column
   */
  header: string;

  /**
   * Constrols the visibility of the sort icon the column header
   */
  isOrderable?: boolean;

  /**
   * Width of the column, always use the value and the unit, ie. '100px' or '6em'.
   * Use auto for equal column sizes
   * Fit will guess the size of each column base on the header characters.
   */
  width?: string | 'auto' | 'fit';

  /**
   * Controls the column visibility. If the column visible is set the false
   * and the isGlobalFilterable is set to true, the column will be created
   * in the DOM, but will not be visible. If both properties are set to false
   * the column won't even be created in the DOM
   */
  isVisible?: boolean;

  /**
   * Cell configuration
   */
  content?: {
    /**
     * Type of data that will be rendered in the cell
     */
    type: SmzContentType;
    /**
     * Extra data needed for the selected content type
     */
    data?: SmzContentTypes;
  };

  /**
   * Filter behavior
   */
  filter: {
    /**
     * Filter template type
     */
    type?: SmzFilterType; // TODO: criar um none
    /**
     * Controls whether the field should be filterable using the global filter
     */
    isGlobalFilterable?: boolean;
  };

}
```
### Column types

For column data templates, these are the values that can be set in the `content.type` property, some of them require an extra data, which is passed through the `content.data` property.

#### SmzContentType.TEXT
It's the default template when none is specified. It renders the cell contents as is, without any changes.
#### SmzContentType.CALENDAR
Formats any `Date` column accordingly to the following values passed in the `content.data`

* short: 02/03/2021 10:35
* shortDate: 02/03/2021
* medium: 2 de mar. de 2021 10:35:49
* mediumDate: 2 de mar. de 2021
* long: 20 de abril de 2021 10:35:49 GMT-3
* longDate: 2 de março de 2021
* shortTime: 10:35

Usage example:

```typescript
...
content: {
  type: SmzContentType.CALENDAR,
  data: { format: 'shortDate' }
},
...
```
#### SmzContentType.CURRENCY
Formats the value as currency, using R$
#### SmzContentType.ICON
This template can be used to render icons based on user defined rules:
```typescript
...
content: {
  type: SmzContentType.ICON,
  data: { matches: [
    { icon: 'fas fa-check', class: 'green-text darken-3', value: true, tooltip: 'My tooltip 1' },
    { icon: 'fas fa-times', class: 'red-text darken-2', value: false, tooltip: 'My tooltip 2' }
  ] }
},
...
```
In the above sample, the rules are defined in the `matches` property. Each entry can set the icon, class and tooltip for the icon. The `value` property informs the value in the original data item that should be converted in the icon.
#### SmzContentType.CUSTOM
When none of the above templates are enough, you can create your own by setting the `content.type` to `CUSTOM`. This way you can create your own template in the HTML template. See the [Cell templates](##cell-templates) section for more details.
# Templates
## Toolbar

The toolbar is an area between the caption area and the table itself:

![image](https://user-images.githubusercontent.com/10734059/118309717-0aa35c80-b4c4-11eb-933d-9542098af84a.png)


```html
<smz-ui-table [items]="items$ | async" [state]="tableState">

  ...

  <ng-template pTemplate="toolbar" let-table>
    <button pButton pRipple type="button" icon="pi pi-check" class="p-button-rounded p-button-text"></button>
    <button pButton pRipple type="button" icon="pi pi-bookmark" class="p-button-rounded p-button-secondary p-button-text"></button>
    <button pButton pRipple type="button" icon="pi pi-filter" class="p-button-rounded p-button-text p-button-plain"></button>
  </ng-template>

</smz-ui-table>
```

The context of this area, can be accessed by using `let-primeTable` in the `ng-template` tag, and the original `p-table` component is in it.

## Custom action buttons
These are controls to be displayed in the last column of the table. They must be enabled in the [state object](##actions), and buttons should be added in the HTML template:

```html
<ng-template pTemplate="actions" let-item>
  <button pButton type="button" class="p-button-secondary" icon="pi pi-check" (click)="test(item)"></button>
</ng-template>
```

The context of this area, can be accessed by using `let-item` in the `ng-template` tag, and the original data item is in it.

The extra action controls will be inserted between the title and the native table inputs:

![image](https://user-images.githubusercontent.com/10734059/118338346-4e11c100-b4ec-11eb-8089-d87520e35316.png)

## Cell templates

Each cell can use some of the basic pre defined data templates, or have it's own customized template. For that you need to set the `content.type` to `true`. Then in the HTML template create a `ngSwitchCase` for each column you want to customize:

```html
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
```
The context of this area, can be accessed by using `let-item` in the `ng-template` tag, and the original data item is in it.

## Caption area

Besides the features that you can enable through the table state object in the code, you can also add extra controls in the caption area, by setting a template for it:

```html
<ng-template pTemplate="caption" let-primeTable>
  <button pButton type="button" class="p-button-secondary" icon="pi pi-cog"></button>
  <button pButton type="button" class="p-button-secondary" icon="pi pi-user"></button>
</ng-template>
```
The extra controls are inserted on the right of the global filter.

The context of this area, can be accessed by using `let-primeTable` in the `ng-template` tag, and the original `p-table` component is in it.

The column state object can also be acessed from the context, by using `let-col` in the `ng-template` tag.
























