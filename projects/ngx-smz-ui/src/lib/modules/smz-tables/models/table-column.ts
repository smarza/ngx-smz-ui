import { SmzFormsValidatorsPreset } from '../../smz-forms/models/controls';
import { SmzContentType, SmzContentTypes, SmzExportableContentSource, SmzExportableContentType } from "./content-types";
import { SmzEditableType, SmzEditableTypes } from "./editable-types";
import { SmzFilterType } from "./filter-types";

export interface SmzTableColumn {
  /**
   * Full property name path, nested properties can be used, i.e. person.name
   */
  field: string;
  /**
   * Property name path that will be used to create filters
   * It can be different from field in some complex cases like when field is an object and you need to provide other property to be the filter.
   */
  filterField: string;
  /**
   * Property name path that will be used in global search
   * It can be different from field in some complex cases like when field is an object and you need to provide other property to the global search input.
   */
  globalFilterField: string;
  /**
  * Define if the global filter need to convert cell data from array to searchable string data.
  */
  globalFilterDataType: 'string' | 'array';
  /**
  * Define how global filter will create the searchable string data for array cells.
  * Default is set to SimpleNamedEntity, so the property name is going to be used as searchable string data.
  */
  globalFilterArrayDataPath: string;
  /**
   * Property name path that will be used to sort
   * It can be different from field in some complex cases like when field is an object and you need to provide other property to be the sort value.
   */
  sortField: string;
  /**
   * Property name, this is an identifier and has to be unique.
   */
  property: string;
  /**
   * Title of the column
   */
  header: string;
  /**
   * Style class for header containers
   */
  headerStyleClass: string;
  /**
   * Constrols the visibility of the sort icon the column header
   */
  isOrderable?: boolean;
  hasSubTotal: boolean;
  export: {
    /**
     * Constrols the visibility of the column on exports
     */
    isExportable?: boolean;
    /**
     * Type of data that will be exported to the excel file
     */
    exportAs?: SmzExportableContentType;

    dataCallback?: (data: any, row: any, index: number) => string;
    isMultilined?: boolean;
    newLineSeparator?: string;
    dataFormat?: string;
    header?: string;
  }

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
   * Set the isFrozen attribute to true, and this will bring
   * the column in the locked columns group positioned on the left in the table.
   */
  isFrozen?: boolean;

  /**
   * Cell data template
   */
  content?: {
    /**
     * Type of data that will be rendered in the cell
     */
    type: SmzContentType;
    /**
     * Styles Classes that will be inserted in the smz-table-content div of the cell
     */
    contentStyleClass: string;
    /**
     * Styles Classes that will be inserted in the main div of the cell
     */
    styleClass: string;
    /**
     * Extra data needed for the selected content type
     */
    data?: SmzContentTypes;
    /**
     * The object that will be applied to the ngStyle of the column
     */
    ngStyle: { [style: string]: any } | null;
    /**
     * Callback to get tooltip of the cell
     */
    tooltip?: (item: any) => string;

  };

  /**
   * Cell editable template
   */
  editable?: {
    /**
     * Property of the object
     */
    property: string;
    /**
    * Type of editable input that will be rendered in the cell
    */
    type: SmzEditableType;
    /**
     * Extra data needed for the selected editable type
     */
    data?: SmzEditableTypes;
    /**
     * Validators for the form input.
     */
    validatorsPreset: SmzFormsValidatorsPreset;
    /**
     * Default value for creation form.
     */
    defaultCreationValue: any;
  };

  /**
   *  Filter behavior
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
    /**
     * Controls whether the field should be filterable using the global filter
     */
    showTime?: boolean;
  };
  /**
   *  Actions are inserted in each cell of the content rows
   *  The row item will be sent along with the callback.
   */
  actions: SmzTableContentAction[];
  actionsAlignment?: 'begin' | 'end';

  /**
   *  Header Actions are inserted in the header of the table
   *  The col object will be sent along with the callback.
   */
  headerActions: SmzTableContentAction[];
  showHeaderActions: boolean;
}

export interface SmzTableContentAction {
  icon: string;
  tooltip: (item: any) => string;
  styleClass: string;
  condition: (item: any) => boolean;
  callback: (item: any) => void;
}

export interface SmzTableCaptionButton {
  label: string;
  icon: string;
  tooltip: () => string;
  styleClass: string;
  visibilityCondition: () => boolean;
  activationCondition: () => boolean;
  callback: () => void;
  claimsWithAccess: string;
}

export interface SmzTableContextColumn extends SmzTableColumn { }


export interface SmzTableEditableColumn {
  /**
   * Property of the object
   */
  property: string;
  /**
  * Type of editable input that will be rendered in the cell
  */
  type: SmzEditableType;
  /**
 * Extra data needed for the selected editable type
 */
  data?: SmzEditableTypes;
  /**
   * Validators for the form input.
   */
  validatorsPreset: SmzFormsValidatorsPreset;
  /**
   * Default value for creation form.
   */
  defaultCreationValue: any;
}
