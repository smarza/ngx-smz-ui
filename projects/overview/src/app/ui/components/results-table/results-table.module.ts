import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgCloneModule, NgxSmzDataPipesModule, NgxSmzFormsModule, NgxSmzTablesModule } from '@ngx-smz/core';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TabsModule } from 'primeng/tabs';
import { ResultsTableComponent } from './results-table.component';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    NgxSmzFormsModule,
    NgxSmzTablesModule,
    NgCloneModule,
    PanelModule,
    TabsModule,
    NgxSmzDataPipesModule,
  ],
  exports: [ResultsTableComponent],
  declarations: [ResultsTableComponent],
  providers: [],
})
export class ResultsTableModule { }