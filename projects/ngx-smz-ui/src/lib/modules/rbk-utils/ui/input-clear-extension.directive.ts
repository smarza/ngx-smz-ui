import { Directive, Input, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { TreeTable } from 'primeng/treetable';
import { Table } from 'primeng/table';
import { takeWhile } from 'rxjs/operators';

@Directive({
    selector: '[rbkInputClearExtension]'
})
export class InputClearExtensionDirective implements OnInit, OnDestroy {
    @Input() public rbkInputClearExtension: { table: TreeTable | Table, component: any };
    private isDirectiveActive = true;

    constructor() {

    }
    public ngOnInit(): void {
        const event: EventEmitter<void> = this.rbkInputClearExtension.table['clearEvent'];

        event.pipe(takeWhile(() => this.isDirectiveActive)).subscribe(() => {
            this.clear();
        });
    }
    public clear(): void {
        const component = this.rbkInputClearExtension.component;

        // INPUTS
        if (component.localName != null && component.localName === 'input') {
            component.value = '';
        }
        // MULTI-SELECTS
        else if (component['value'] != null && Array.isArray(component['value'])) {
            while (component['value']?.length > 0) {
                component['value'].pop();
            }

            component['valuesAsString'] = component['defaultLabel'];
        }
        // DROPDOWNS
        else if (component['value'] != null) {

            component['selectedOption'] = null;
            component['value'] = null;

        }
    }

    public ngOnDestroy(): void {
        this.isDirectiveActive = false;
    }
}

