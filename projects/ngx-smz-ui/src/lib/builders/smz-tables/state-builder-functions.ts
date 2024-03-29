import { InputConfig } from '../smz-dialogs/dialog-input-conversion';
import { SmzControlTypes } from '../../modules/smz-forms/models/control-types';
import { ContentConvertions } from '../../modules/smz-tables/models/content-convertions';
import { SmzTableColumn } from '../../modules/smz-tables/models/table-column';
import { SmzTableState } from '../../modules/smz-tables/models/table-state';

export namespace StateBuilderFunctions {

  export function createColumnsFromInputControls(_state: SmzTableState, inputs: InputConfig[], children: SmzControlTypes[]): void {

    inputs.forEach(input => {
      const child = children.find(c => c.propertyName === input.propertyName);

      if (child == null) {
        throw Error(`There is no input converted on convertFormFeature for ${input.propertyName}`);
      }

      const converted = ContentConvertions.find(x => `${x.controlType}` === input.controlType.id);

      if (converted == null) {
        throw Error(`One or more controls doensn't have a proper input implementation on the editable table: ${input.propertyName} > controlType=${input.controlType.name}`);
      }

      const column: SmzTableColumn = {
        field: converted.field(input),
        filterField: converted.field(input),
        globalFilterField: converted.field(input),
        globalFilterDataType: 'string',
        globalFilterArrayDataPath: 'name',
        sortField: converted.field(input),
        property: converted.property(input),
        header: input.name,
        headerStyleClass: '',
        content: converted.content(input),
        hasSubTotal: false,
        export: {

        },
        editable: {
          ...converted.editable(child),
        },
        isOrderable: converted.isOrderable,
        filter: {
          isGlobalFilterable: converted.isGlobalFilterable,
          type: converted.filterType,
        },
        isVisible: true,
        width: 'auto',
        actions: [],
        actionsAlignment: 'begin',
        headerActions: [],
        showHeaderActions: false
      };

      _state.columns.push(column);
    });

    // console.log('columns', _state.columns);

  }
}