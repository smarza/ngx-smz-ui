import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxSmzTreesModule, SmzRouteData, NgxSmzDialogsModule, NgxSmzFormsModule, NgxSmzTablesModule } from 'ngx-smz-ui';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { RbkAuthGuard, RbkDatabaseStateGuard } from 'ngx-smz-ui';
import { CodeBlockModule } from '../../components/code-block/code-block.module';
import { DemoTitlePipeModule } from '../../pipes/demo-title.pipe';
import { SignalRComponent } from './signalr.component';
import { MessagesComponent } from './components/messages/messages.component';
import { FilesComponent } from './components/files/files.component';

const data: SmzRouteData = {
  layout: {
    mode: 'full',
    contentPadding: '1em'
  },
  title: 'Home',
  appArea: 'home',
  clearReusableRoutes: true,
  requiredStates: []
};

const routes: Routes = [
  {
    path: '',
    canActivate: [RbkAuthGuard, RbkDatabaseStateGuard],
    component: SignalRComponent,
    data
  },
];

@NgModule({
  declarations: [SignalRComponent, MessagesComponent, FilesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    NgxSmzFormsModule,
    NgxSmzDialogsModule,
    NgxSmzTreesModule,
    NgxSmzTablesModule,
    CodeBlockModule,
    DemoTitlePipeModule
  ],
  providers: [],
  bootstrap: [SignalRComponent, MessagesComponent, FilesComponent]
})
export class SignalRModule { }
