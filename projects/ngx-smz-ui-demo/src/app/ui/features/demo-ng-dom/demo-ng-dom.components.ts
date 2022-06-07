import { Component, OnInit } from '@angular/core';
import { ComponentData } from 'ngx-smz-ui';
import { BehaviorSubject } from 'rxjs';
import { NgDomService } from '../../../ng-dom/ng-dom.service';
import { DemoNgDomContentComponent } from './demo-ng-dom-content.component';

@Component({
  selector: 'app-demo-ng-dom',
  templateUrl: './demo-ng-dom.component.html',
  providers: []
})

export class DemoNgDomComponent implements OnInit {

  public innerHtml = `
  <section class="grid grid-nogutter justify-start flex-col gap-3 col-12">
    <h4><i class="fa-solid fa-bug mr-2 text-3xl text-red-500"></i>Html externo</h4>
    <div id="inner-html-dom" class="border-2 border-solid border-blue-300 p-1 flex-grow grid grid-nogutter flex-col justify-center"></div>
  </section>
  `;

  public message: { text: string, text2: string } = { text: '', text2: '' };
  public interval = 2000;
  public message$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private ngDom: NgDomService) {

  }

  ngOnInit() {
  }

  public attach(id: string): void {
    const componentData: ComponentData = {
      component: DemoNgDomContentComponent,
      inputs: [
        { input: 'message', data: this.message },
        { input: 'message$', data: this.message$.asObservable() },
        { input: 'interval', data: this.interval },
      ],
      outputs: []
    };

    this.ngDom.attach(id, componentData);
  }

  public onChange(): void {
    console.log('onChange');
    this.message$.next(`$$$ ${this.message.text2} $$$`);
  }

  public detach(): void {
    this.ngDom.detach();
  }

}
