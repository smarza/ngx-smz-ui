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
        filterMatchMode?: 'matchAllWords' | 'constains' | 'simplenamed' | 'appDate' | 'object' | 'dateRange' | 'arrayString' | 'arraySimpleNamed';
        filterInputType?: 'inputNumber' | 'inputText' | 'inputSwitch' | 'triStateCheckbox' | 'dropdown' | 'multiSelect' | 'dateRange';
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