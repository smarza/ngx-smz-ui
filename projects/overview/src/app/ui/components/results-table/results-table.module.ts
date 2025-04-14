import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgCloneModule, NgxSmzDataPipesModule, NgxSmzFormsModule, NgxSmzTablesModule } from 'ngx-smz-ui';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { ResultsTableComponent } from './results-table.component';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    NgxSmzFormsModule,
    NgxSmzTablesModule,
    NgCloneModule,
    PanelModule,
    TabViewModule,
    NgxSmzDataPipesModule,
  ],
  exports: [ResultsTableComponent],
  declarations: [ResultsTableComponent],
  providers: [],
})
export class ResultsTableModule { }