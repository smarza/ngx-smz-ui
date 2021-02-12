import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApolloTopbarComponent } from './topbar.component';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
  declarations: [ApolloTopbarComponent],
  imports: [
    CommonModule,
    SidebarModule,
  ],
  exports: [ApolloTopbarComponent]
})
export class SmzApolloTopbarModule { }
