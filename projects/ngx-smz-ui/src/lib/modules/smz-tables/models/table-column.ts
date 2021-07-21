import { SmzFormsValidatorsPreset } from 'ngx-smz-dialogs';
import { SmzContentType, SmzContentTypes } from "./content-types";
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
   * Constrols the visibility of the sort icon the column header
   */
  isOrderable?: boolean;

  /**
   * Width of the column, always use the value and the unit, ie. '100px' or '6em'
   */
  width?: string;

  /**
   * Controls the column visibility. If the column visible is set the false
   * and the isGlobalFilterable is set to true, the column will be created
   * in the DOM, but will not be visible. If both properties are set to false
   * the column won't even be created in the DOM
   */
  isVisible?: boolean;

  /**
   * Cell data template
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
