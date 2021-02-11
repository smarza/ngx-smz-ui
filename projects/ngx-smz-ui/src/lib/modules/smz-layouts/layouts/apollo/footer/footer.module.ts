import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApolloFooterComponent } from './footer.component';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
  declarations: [ApolloFooterComponent],
  imports: [
    CommonModule,
    SidebarModule,
  ],
  exports: [ApolloFooterComponent]
})
export class SmzApolloFooterModule { }
