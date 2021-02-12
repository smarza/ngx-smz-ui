import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApolloSidebarComponent } from './sidebar.component';
import { SidebarModule } from 'primeng/sidebar';
import { RouterModule } from '@angular/router';
import { ApolloMenuItemComponent } from './components/menu-item.component';
import { HasChildPipe } from './pipes/has-child.pipe';
import { ApolloMenuExpandableItemComponent } from './components/menu-expandable-item.component';
import { ApolloMenuNodeComponent } from './components/menu-node.component';
import { ApolloMenuSlimNodeComponent } from './components/menu-slim-node.component';
import { MenuItemActionsModule } from '../../../../../../common/menu-item-actions/menu-item-actions.module';

@NgModule({
  declarations: [
    ApolloSidebarComponent,
    ApolloMenuItemComponent,
    ApolloMenuExpandableItemComponent,
    ApolloMenuNodeComponent,
    ApolloMenuSlimNodeComponent,
    HasChildPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SidebarModule,
    MenuItemActionsModule
  ],
  exports: [ApolloSidebarComponent]
})
export class SmzApolloSidebarModule { }
