import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxSmzDataPipesModule } from '@ngx-smz/core';
import { LayoutService } from '@ngx-smz/layout';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgxSmzDataPipesModule
  ],
  template: `
  <div class="absolute inset-0 grid grid-nogutter justify-center">
    <div class="border border-orange-200 w-20 h-20 text-red-500">
      dasdsad asdasd as d
    </div>
    <img class="col-8 md:col-6 lg:col-5 xl:col-4" [src]="layoutService.isDarkTheme() ? 'assets/images/logos/horizontal-dark.svg' : 'assets/images/logos/horizontal-light.svg'"/>
  </div>
`
})
export class HomePageComponent {
  public readonly layoutService = inject(LayoutService);

}