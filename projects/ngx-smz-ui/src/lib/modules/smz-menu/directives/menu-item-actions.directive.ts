import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { ConfirmableFunction, CriticalConfirmableFunction } from '../../smz-dialogs/decorators/confirmable.decorator';
import { SmzMenuItem } from '../models/smz-menu-item';

@Directive({
    selector: '[smzMenuItemAction]'
})
export class SmzMenuItemActionsDirective {
    @Input() public item: SmzMenuItem;
    @Input() public data: any;
    @Output() public collapse: EventEmitter<void> = new EventEmitter<void>();

    constructor(private store: Store) {
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

            if (this.item.dataMap != null) {
                // Caso o menu tenha uma função para remapear o data
                const mappedData = this.item.dataMap(this.data);
                this.item.command(mappedData);
            }
            else {
                this.item.command(this.data);
            }
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