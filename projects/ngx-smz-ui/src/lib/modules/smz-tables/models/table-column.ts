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
  };

  actions: SmzTableContentAction[];
}

export interface SmzTableContentAction {
  icon: string;
  styleClass: string;
  condition: (item: any) => boolean;
  callback: (item: any) => void;
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
