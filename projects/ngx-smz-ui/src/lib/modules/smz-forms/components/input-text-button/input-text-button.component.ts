import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, take, takeWhile } from 'rxjs';
import { SmzFormsBehaviorsConfig } from '../../models/behaviors';
import { SmzTextButtonControl } from '../../models/control-types';
import { SmzFormViewdata } from '../../models/form-viewdata';
import { AbstractControl } from '@angular/forms';
import { isEmpty } from '../../../rbk-utils/utils/utils';

@UntilDestroy()
@Component({
    selector: 'smz-input-text-button',
    templateUrl: './input-text-button.component.html'
})
export class InputTextButtonComponent implements OnInit {
    private readonly changeDetectorRef = inject(ChangeDetectorRef);
    @Input() public input: SmzTextButtonControl;
    @Input() public control: AbstractControl;
    @Input() public viewdata: SmzFormViewdata
    @Input() public behaviors: SmzFormsBehaviorsConfig;
    public blocked = false;

    public ngOnInit(): void {

    this.control.statusChanges
        .pipe(debounceTime(this.viewdata.config.behaviors?.debounceTime ?? 200), untilDestroyed(this))
        .subscribe(() => {

            // Usuário alterou o input

            if (this.input.isButtonValid) {
                // Invalidar botão pois o input mudou
                this.input.isButtonValid = false;
            }

            if (this.control.valid) {
                // Input digitado pelo usuário passou nas validações do form (required, maxlength e etc..)
                // Porém ainda não foi validado pelo botão deste input
                // Então, informar ao usuário para clicar no botão para validar
                this.input.buttonMessages = [`Clique em '${this.input.label}' para validar.`];
            }
            else {
                // Input digitado pelo usuário não passou nas validações do form (required, maxlength e etc..)
                // Limpar mensagem extras... uma vez que o usuário precisará resolver os erros de validação do form antes.
                this.input.buttonMessages = [];
            }

        });

        if (!isEmpty(this.input.defaultValue)) {
            this.input.isButtonValid = this.control.valid;
            this.input.buttonMessages = [];
            this.blocked = false;

            this.viewdata.getData();
        }

    }

    public emit(): void {
        const data = this.viewdata.getData();

        this.input.isButtonValid = false;
        this.input.buttonMessages = ['Aguarde...'];
        this.blocked = true;

        this.input
            .callback(data, this.viewdata)
            .pipe(take(1), untilDestroyed(this))
            .subscribe({
                next: (event: { isValid: boolean, messages?: string[] }) => {
                    this.input.isButtonValid = event.isValid;
                    this.input.buttonMessages = event.messages ?? [];
                },
                error: (err) => {
                    this.input.isButtonValid = false;
                    this.input.buttonMessages = ['An error not handled occurred while validating the input button. Please try again.'];
                },
                complete: () => {
                    this.viewdata.getData();
                    this.blocked = false;
                    this.changeDetectorRef.detectChanges();
                }
            });

    }

}
