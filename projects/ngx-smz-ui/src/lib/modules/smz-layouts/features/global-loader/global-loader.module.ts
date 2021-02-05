import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GlobalLoaderComponent } from './global-loader.component';
import { LoaderCubeComponent } from './components/loader-cube.component';

@NgModule({
  declarations: [
    GlobalLoaderComponent,
    LoaderCubeComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [GlobalLoaderComponent]
})
export class GlobalLoaderModule { }
