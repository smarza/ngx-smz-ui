import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { MenuItem } from 'primeng/api/menuitem';

@Directive({
    selector: '[menuItemAction]'
})
export class MenuItemActionsDirective {
    @Input() public item: MenuItem;

    constructor(private el: ElementRef, private store: Store) {
    }

    @HostListener('click', ['$event'])
    public onClick(event: any): void {
        if (this.item.command != null) {
            this.item.command(this.item);
        }
        else if (this.item.routerLink != null) {
            this.store.dispatch(new Navigate(this.item.routerLink));
        }
        else {
            console.error('Nether command nor routerLink was set on the item. Please review the menu item model');
        }
    }
}