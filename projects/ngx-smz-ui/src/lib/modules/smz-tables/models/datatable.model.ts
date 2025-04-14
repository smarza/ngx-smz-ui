import { Observable } from 'rxjs';
import { SimpleNamedEntity } from '../../../common/models/simple-named-entity';

export interface TableColumn {
    isVisible: Boolean;
    colgroup: {
        class: string;
    };
    header: {
        label: string;
        field: string;
        isSorted: boolean;
        showFilter: boolean;
        filterMatchMode?: SmzTableFilterMatchMode;
        filterInputType?: SmzTableFilterInputType;
        filterOptions$?: Observable<SimpleNamedEntity[]>;
        filterRemap?: string;
        filterField?: string;
    };

    body: {
        style: string;
    }

    summary?: {
        showTotal: boolean;
    }
    format?: 'currency';

    dataKey?: string;

}

export type SmzTableFilterMatchMode = 'matchAllWords' | 'constains' | 'simplenamed' | 'appDate' | 'object' | 'dateRange' | 'arrayString' | 'arraySimpleNamed';

export type SmzTableFilterInputType = 'inputNumber' | 'inputText' | 'inputSwitch' | 'triStateCheckbox' | 'dropdown' | 'multiSelect' | 'dateRange';