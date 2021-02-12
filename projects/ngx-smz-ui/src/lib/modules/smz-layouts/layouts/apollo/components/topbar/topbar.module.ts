import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApolloTopbarComponent } from './topbar.component';
import { SidebarModule } from 'primeng/sidebar';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ApolloTopbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    SidebarModule,
  ],
  exports: [ApolloTopbarComponent]
})
export class SmzApolloTopbarModule { }
