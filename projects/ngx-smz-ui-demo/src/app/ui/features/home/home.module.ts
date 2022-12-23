import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { NgxSmzTreesModule, SmzRouteData, NgxSmzDialogsModule, NgxSmzFormsModule, NgxSmzDataPipesModule, NgxSmzServerImageModule, SmzDragDropModule } from 'ngx-smz-ui';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { UI_DEFINITIONS_STATE_NAME } from 'ngx-smz-ui';
import { CodeBlockModule } from '../../components/code-block/code-block.module';
import { DemoTitlePipeModule } from '../../pipes/demo-title.pipe';
import { CountriesDbName } from '@states/database/countries/countries.state';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';

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
    canActivate: [],
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
    CodeBlockModule,
    DemoTitlePipeModule,
    NgxSmzDataPipesModule,
    NgxSmzServerImageModule,
    AutoCompleteModule,
    FormsModule,
    SmzDragDropModule
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
