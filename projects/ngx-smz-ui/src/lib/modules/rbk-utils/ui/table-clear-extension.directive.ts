import { Directive, Input, NgModule, OnInit, EventEmitter, OnDestroy } from '@angular/core';

@Directive({
    selector: '[rbkTableClearExtension]'
})
export class TableClearExtensionDirective implements OnInit {
    @Input() public rbkTableClearExtension: any;

    constructor() {

    }
    public ngOnInit(): void {
        this.rbkTableClearExtension['clear'] = () => this.clear();
        this.rbkTableClearExtension['clearEvent'] = new EventEmitter();
    }
    public clear(): void {
        this.clearFilters();
        this.rbkTableClearExtension['clearEvent'].emit();
    }
    private clearFilters(): void {
        const filters = Object.keys(this.rbkTableClearExtension.filters);

        for (const filter of filters) {
            this.rbkTableClearExtension.filter('', filter, this.rbkTableClearExtension.filters[filter].matchMode);
        }
    }

}
