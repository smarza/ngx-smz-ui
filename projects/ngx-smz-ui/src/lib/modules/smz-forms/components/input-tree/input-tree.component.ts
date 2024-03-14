import { Component, Input, OnInit } from '@angular/core';
import { SmzFormsBehaviorsConfig } from '../../models/behaviors';
import { SmzTreeControl } from '../../models/control-types';
import { Observable, of, tap } from 'rxjs';
import { TreeNode } from 'primeng/api';
import { SmzFormsDropdownService } from '../../services/smz-forms-dropdown.service';
import { CONTROL_FUNCTIONS } from '../../models/control-type-functions';
import { getFirstElement } from '../../../../common/utils/utils';

@Component({
    selector: 'smz-input-tree',
    templateUrl: './input-tree.component.html',
})
export class InputTreeComponent implements OnInit
{
    @Input() public input: SmzTreeControl<any>;
    @Input() public formId: string;
    @Input() public control: any;
    @Input() public behaviors: SmzFormsBehaviorsConfig;
    public nodes$: Observable<TreeNode[]>;
    constructor(public service: SmzFormsDropdownService)
    {
    }

    public ngOnInit(): void
    {
        if (this.input.dependsOn != null) {
            // Com dependencia: se registrar no serviço que ouve outros eventos
            this.service.registryObserver(this.input, this.formId);
        }

        this.service.registryDependsOnData(this.input, this.formId);
    }

    public ngAfterViewInit(): void {
        if (this.input.dependsOn != null) {
            // Com dependencia: ouvir mudanças no serviço de dropdown
            this.nodes$ = this.service.observers[this.formId + this.input.propertyName]?.options
                .pipe(
                    tap((nodes) => {
                        this.input.currentNodes = nodes;
                        setTimeout(() => {
                            CONTROL_FUNCTIONS[this.input.type].applyDefaultValue(this.control, this.input);
                        }, 0);
                    })
                );
        }
        else {
            // Sem dependencia: assumir que o primeiro elemento do array é a árvore
            this.input.currentNodes = getFirstElement(this.input.options)?.data;
            this.nodes$ = of(this.input.currentNodes);
            setTimeout(() => {
                CONTROL_FUNCTIONS[this.input.type].applyDefaultValue(this.control, this.input);
            }, 0);
        }

    }

}
