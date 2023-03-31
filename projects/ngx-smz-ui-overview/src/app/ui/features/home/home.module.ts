import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { NgxSmzCardsModule, NgxSmzTablesModule, NgxSmzTreesModule, SmzRouteData, NgxSmzDialogsModule, NgxSmzFormsModule, SmzChartModule, NgxSmzDocumentsModule, NgCloneModule, NgVarModule, NgxSmzMenuModule, NgxSmzUiBlockModule, NgxSmzCommentsModule, NgxSmzTimelineModule, NgxSmzDataPipesModule, RbkFeatureStateGuard } from 'ngx-smz-ui';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { RbkAuthGuard, RbkDatabaseStateGuard, UI_DEFINITIONS_STATE_NAME, NgxSmzUiGuidesModule } from 'ngx-smz-ui';
import { CodeBlockModule } from '@components/code-block/code-block.module';
import { DemoTitlePipeModule } from '@pipes/demo-title.pipe';
import { CountriesDbName } from '@states/database/countries/countries.state';
import { TabViewModule } from 'primeng/tabview';
import { DemoFormComponent } from './components/demo-form/demo-form.component';
import { DemoTableComponent } from './components/demo-table/demo-table.component';
import { DemoIconsComponent } from './components/demo-icons/demo-icons.component';
import { DemoChartComponent } from './components/demo-chart/demo-chart.component';
import { DemoDocumentComponent } from './components/demo-document/demo-document.component';
import { DemoCommentsComponent } from './components/demo-comments/demo-comments.component';
import { DemoTreeComponent } from './components/demo-tree/demo-tree.component';
import { DemoMenuComponent } from './components/demo-menu/demo-menu.component';
import { DemoInjectable1Component } from './components/demo-injectable/demo-injectable-1.component';
import { DemoInjectable2Component } from './components/demo-injectable/demo-injectable-2.component';
import { DemoInjectable3Component } from './components/demo-injectable/demo-injectable-3.component';
import { DemoInjectable4Component } from './components/demo-injectable/demo-injectable-4.component';
import { DemoInjectable5Component } from './components/demo-injectable/demo-injectable-5.component';
import { DemoCardsComponent } from './components/demo-cards/demo-cards.component';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';
import { DemoTimelineComponent } from './components/demo-timeline/demo-timeline.component';
import { FrontCardComponent } from '../../components/cards/front-card.component';
import { BackCardComponent } from '../../components/cards/back-card.component';
import { ComplexityFrontCardComponent } from '../../components/complexity/complexity-front-card.component';
import { ComplexityBackCardComponent } from '../../components/complexity/complexity-back-card.component';
import { ResultsTableModule } from '../../components/results-table/results-table.module';
import { DemoFeatureName } from '@states/demo/demo.state';

const data: any = {
  layout: {
    mode: 'full',
  },
  title: 'Home',
  appArea: 'home',
  clearReusableRoutes: true,
  requiredStates: [UI_DEFINITIONS_STATE_NAME, CountriesDbName],
  requiredFeatureStates: [DemoFeatureName]
};

const routes: Routes = [
  {
    path: '',
    canActivate: [RbkAuthGuard, RbkDatabaseStateGuard, RbkFeatureStateGuard],
    component: HomeComponent,
    data
  },
];

@NgModule({
  declarations: [
    HomeComponent,
    DemoFormComponent,
    DemoTableComponent,
    DemoChartComponent,
    DemoDocumentComponent,
    DemoTreeComponent,
    DemoMenuComponent,
    DemoCommentsComponent,
    DemoInjectable1Component,
    DemoInjectable2Component,
    DemoInjectable3Component,
    DemoInjectable4Component,
    DemoInjectable5Component,
    DemoIconsComponent,
    DemoCardsComponent,
    DemoTimelineComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    FormsModule,
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
    NgxSmzUiBlockModule,
    NgxSmzCommentsModule,
    NgxSmzCardsModule,
    NgxSmzTimelineModule,
    NgxSmzDataPipesModule,
    FrontCardComponent,
    BackCardComponent,
    ComplexityFrontCardComponent,
    ComplexityBackCardComponent,
    NgxSmzUiGuidesModule,
    ResultsTableModule
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
