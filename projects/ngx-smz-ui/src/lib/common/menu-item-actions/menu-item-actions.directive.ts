import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { MenuItem } from 'primeng/api';
import { ActionLink } from '../../modules/smz-layouts/core/models/action-link';
import { LayoutUiActions } from '../../state/ui/layout/layout.actions';

@Directive({
    selector: '[menuItemAction]'
})
export class MenuItemActionsDirective {
    @Input() public item: ActionLink;
    @Input() public parent: MenuItem;
    @Input() public breadcrumbs = false;
    @Output() public collapse: EventEmitter<void> = new EventEmitter<void>();

    constructor(private store: Store) {
    }

    @HostListener('click', ['$event'])
    public onClick(event: any): void {

        if (this.item.disabled)
            return ;


        if (this.item.command != null) {
            this.item.command(this.item);
            this.collapse.emit();
        }
        else if (this.item.routerLink != null) {

            if (this.breadcrumbs) {
                this.store.dispatch(new LayoutUiActions.SetBreadcrumbs({
                    item: this.item,
                    parent: this.parent
                }));
            }

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