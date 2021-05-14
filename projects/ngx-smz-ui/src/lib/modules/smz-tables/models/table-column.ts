import { SmzContentType, SmzContentTypes } from './content-types';
import { SmzFilterType } from './filter-types';

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

  content: {
    /**
     * Type of data that will be rendered in the cell
     */
    type?: SmzContentType;
    /**
     * Extra data needed for the selected content type
     */
    data?: SmzContentTypes;
  };


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

export interface SmzTableContextColumn extends SmzTableColumn {

}