import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgVarModule } from '../../common/directives/ng-var/ng-var.module';
import { TabViewModule } from 'primeng/tabview';
import { NgxSmzTablesModule } from '../smz-tables/ngx-smz-tables.module';
import { SmzMultiTablesComponent } from './multi-tables.component';
import { SafeContentPipeModule } from '../../common/pipes/safe-html.pipe';

@NgModule({
  imports: [
    CommonModule,
    TabViewModule,
    NgVarModule,
    NgxSmzTablesModule,
    SafeContentPipeModule
  ],
  exports: [SmzMultiTablesComponent],
  declarations: [SmzMultiTablesComponent],
  providers: [],
})
export class NgxSmzMultiTablesModule { }
