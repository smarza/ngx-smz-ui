import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GlobalLoaderComponent } from './global-loader.component';
import { LoaderCubeComponent } from './components/cube/loader-cube.component';
import { LoaderSquareComponent } from './components/square/loader-square.component';
import { NgVarModule } from '../../../../common/directives/ng-var/ng-var.module';

@NgModule({
  declarations: [
    GlobalLoaderComponent,
    LoaderCubeComponent,
    LoaderSquareComponent
  ],
  imports: [
    CommonModule,
    NgVarModule
  ],
  exports: [GlobalLoaderComponent]
})
export class GlobalLoaderModule { }
