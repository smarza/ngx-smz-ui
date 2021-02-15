import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApolloTopbarComponent } from './topbar.component';
import { SidebarModule } from 'primeng/sidebar';
import { RouterModule } from '@angular/router';
import { ApolloProfileMenuModule } from '../profile-menu/profile-menu.module';

@NgModule({
  declarations: [ApolloTopbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    SidebarModule,
    ApolloProfileMenuModule
  ],
  exports: [ApolloTopbarComponent]
})
export class SmzApolloTopbarModule { }
