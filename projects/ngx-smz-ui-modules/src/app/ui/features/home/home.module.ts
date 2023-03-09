import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { NgxSmzTablesModule, NgxSmzTreesModule, SmzRouteData, NgxSmzDialogsModule, NgxSmzFormsModule, SmzChartModule, NgxSmzDocumentsModule, NgxSmzDataPipesModule } from 'ngx-smz-ui';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { RbkAuthGuard, RbkDatabaseStateGuard, UI_DEFINITIONS_STATE_NAME } from 'ngx-smz-ui';
import { CodeBlockModule } from '@components/code-block/code-block.module';
import { DemoTitlePipeModule } from '@pipes/demo-title.pipe';
import { TabViewModule } from 'primeng/tabview';

const data: SmzRouteData = {
  layout: {
    mode: 'full',
  },
  title: 'Home',
  appArea: 'home',
  clearReusableRoutes: true,
  requiredStates: [UI_DEFINITIONS_STATE_NAME]
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
  declarations: [HomeComponent],
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
    NgxSmzDataPipesModule
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
