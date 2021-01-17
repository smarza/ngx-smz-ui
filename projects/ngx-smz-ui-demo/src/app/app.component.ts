import { Component } from '@angular/core';
import { NgxSmzUiService } from 'ngx-smz-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngx-smz-ui-demo';
  constructor(private service: NgxSmzUiService) {

  }
}
