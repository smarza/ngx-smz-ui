import { InputConfig } from 'ngx-rbk-utils';
import { SmzControlTypes } from 'ngx-smz-dialogs';
import { ContentConvertions } from '../models/content-convertions';
import { SmzTableColumn } from '../models/table-column';
import { SmzTableState } from '../models/table-state';

export namespace StateBuilderFunctions {

  export function createColumnsFromInputControls(_state: SmzTableState, inputs: InputConfig[], children: SmzControlTypes[]): void {

    // console.log('children', children);

    inputs.forEach(input => {

      const child = children.find(c => c.propertyName === input.propertyName);
      const converted = ContentConvertions.find(x => `${x.controlType}` === input.controlType.id);

      if (converted == null) {
        throw Error(`One or more controls are no compactable: ${input.propertyName} > controlType=${input.controlType.name}`);
      }

      const column: SmzTableColumn = {
        field: converted.field(input),
        property: converted.property(input),
        header: input.name,
        content: converted.content(input),
        editable: {
          ...converted.editable(child),
        },
        isOrderable: converted.isOrderable,
        filter: {
          isGlobalFilterable: converted.isGlobalFilterable,
          type: converted.filterType,
        },
        isVisible: true,
        width: 'auto'
      };

      _state.columns.push(column);
    });

  }
}