import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GlobalLoaderComponent } from './global-loader.component';
import { LoaderCubeComponent } from './components/cube/loader-cube.component';
import { LoaderSquareComponent } from './components/square/loader-square.component';

@NgModule({
  declarations: [
    GlobalLoaderComponent,
    LoaderCubeComponent,
    LoaderSquareComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [GlobalLoaderComponent]
})
export class GlobalLoaderModule { }
