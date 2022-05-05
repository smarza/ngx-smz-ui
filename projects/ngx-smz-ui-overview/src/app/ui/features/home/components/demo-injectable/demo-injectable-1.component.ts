import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-demo-injectable-1',
  template: `
<div class="bg-gray-200">
  <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
    <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
      <span class="block">{{ title }}</span>
      <span class="block text-indigo-600">{{ subTitle }}</span>
    </h2>
    <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
      <div class="inline-flex rounded-md shadow">
        <a href="https://www.google.com.br" target="_blank" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"> Google </a>
      </div>
      <div class="ml-3 inline-flex rounded-md shadow">
        <a href="https://www.youtube.com" target="_blank" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"> YouTube </a>
      </div>
    </div>
  </div>
</div>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
})

export class DemoInjectable1Component {

  @Input() public title: string = '';
  @Input() public subTitle: string = '';
  public test = 'from variable';

  constructor() {
  }


}