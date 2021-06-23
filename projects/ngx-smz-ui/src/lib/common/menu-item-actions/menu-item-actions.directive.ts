import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { ActionLink } from '../../modules/smz-layouts/core/models/action-link';

@Directive({
    selector: '[menuItemAction]'
})
export class MenuItemActionsDirective {
    @Input() public item: ActionLink;
    @Output() public collapse: EventEmitter<void> = new EventEmitter<void>();

    constructor(private store: Store) {
    }

    @HostListener('click', ['$event'])
    public onClick(event: any): void {


        if (this.item.command != null) {
            this.item.command(this.item);
            this.collapse.emit();
        }
        else if (this.item.routerLink != null) {

            if (this.item.queryParams != null) {
                this.store.dispatch(new Navigate([this.item.routerLink[0], this.item.queryParams]));
            }
            else {
                this.store.dispatch(new Navigate(this.item.routerLink));
            }
            this.collapse.emit();

        }
        else {
            console.error('Nether command nor routerLink was set on the item. Please review the menu item model', event, this.item);
        }
    }
}