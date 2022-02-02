import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { NgxSmzTablesModule, NgxSmzTreesModule, SmzRouteData, NgxSmzDialogsModule, NgxSmzFormsModule, SmzChartModule, NgxSmzDocumentsModule, NgCloneModule, NgVarModule, NgxSmzMenuModule, NgxSmzUiBlockModule } from 'ngx-smz-ui';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { RbkAuthGuard, RbkDatabaseStateGuard, UI_DEFINITIONS_STATE_NAME } from 'ngx-smz-ui';
import { CodeBlockModule } from '@components/code-block/code-block.module';
import { DemoTitlePipeModule } from '@pipes/demo-title.pipe';
import { CountriesDbName } from '@states/database/countries/countries.state';
import { TabViewModule } from 'primeng/tabview';
import { DemoFormComponent } from './components/demo-form/demo-form.component';
import { DemoTableComponent } from './components/demo-table/demo-table.component';
import { DemoChartComponent } from './components/demo-chart/demo-chart.component';
import { DemoDocumentComponent } from './components/demo-document/demo-document.component';
import { DemoTreeComponent } from './components/demo-tree/demo-tree.component';
import { DemoMenuComponent } from './components/demo-menu/demo-menu.component';
import { TooltipModule } from 'primeng/tooltip';

const data: SmzRouteData = {
  layout: {
    mode: 'full',
  },
  title: 'Home',
  appArea: 'home',
  clearReusableRoutes: true,
  requiredStates: [UI_DEFINITIONS_STATE_NAME, CountriesDbName]
};

const routes: Routes = [
  {
    path: '',
    canActivate: [RbkAuthGuard, RbkDatabaseStateGuard],
    component: HomeComponent,
    data
  },
];

@NgModule({
  declarations: [HomeComponent, DemoFormComponent, DemoTableComponent, DemoChartComponent, DemoDocumentComponent, DemoTreeComponent, DemoMenuComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    NgxSmzFormsModule,
    NgxSmzDialogsModule,
    NgxSmzTreesModule,
    NgxSmzTablesModule,
    NgxSmzDocumentsModule,
    CodeBlockModule,
    DemoTitlePipeModule,
    TabViewModule,
    SmzChartModule,
    NgCloneModule,
    NgVarModule,
    NgxSmzMenuModule,
    TooltipModule,
    NgxSmzUiBlockModule
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
