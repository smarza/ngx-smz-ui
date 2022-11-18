import { Directive, HostListener, Input, OnInit } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { ConfirmableFunction, CriticalConfirmableFunction } from '../../smz-dialogs/decorators/confirmable.decorator';
import { SmzMenuItem } from '../../smz-menu/models/smz-menu-item';

@Directive({
    selector: '[buttonAction]'
})
export class ButtonActionsDirective implements OnInit {
    @Input() public item: SmzMenuItem;
    @Input() public data: any;
    constructor(private store: Store) {
    }

    public ngOnInit(): void {
        this.applyFeatures();
    }

    public applyFeatures(): void {
        if (this.item.conditional?.condition) {
            const condition = this.item.conditional.condition(this.data);
            Reflect.set(this.item, this.item.conditional.property ?? 'visible', condition);
        }
    }

    @HostListener('click', ['$event'])
    public onClick(event: any): void {

        if (this.item.disabled)
            return ;

        if (this.item.confirmable?.isCritical) {
            CriticalConfirmableFunction(this.item.confirmable.title, this.item.confirmable.message, () => { this.resolveCommand(event) })
        }
        else if (this.item.confirmable != null && this.item.confirmable.isCritical === false) {
            ConfirmableFunction(this.item.confirmable.title, this.item.confirmable.message, () => { this.resolveCommand(event) })
        }
        else {
            this.resolveCommand(event);
        }
    }

    public resolveCommand(event: any): void {
        if (this.item.command != null) {
            this.item.command(this.data);
        }
        else if (this.item.routerLink != null) {

            if (this.item.queryParams != null) {
                this.store.dispatch(new Navigate([this.item.routerLink[0], this.item.queryParams]));
            }
            else {
                this.store.dispatch(new Navigate(this.item.routerLink));
            }
        }
        else {
            console.error('Nether command nor routerLink was set on the item. Please review the menu item model', event, this.item);
        }
    }
}