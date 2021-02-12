import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApolloHorizontalMenuComponent } from './horizontal-menu.component';
import { SidebarModule } from 'primeng/sidebar';
import { RouterModule } from '@angular/router';
import { HasChildPipe } from './pipes/has-child.pipe';
import { MenuItemActionsModule } from '../../../../../../common/menu-item-actions/menu-item-actions.module';
import { ApolloHorizontalMenuNodeComponent } from './components/menu-node.component';

@NgModule({
  declarations: [
    ApolloHorizontalMenuComponent,
    ApolloHorizontalMenuNodeComponent,
    HasChildPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    SidebarModule,
    MenuItemActionsModule
  ],
  exports: [ApolloHorizontalMenuComponent]
})
export class SmzApolloHorizontalMenuModule { }
