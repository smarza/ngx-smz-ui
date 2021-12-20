import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { SmzDialogsService } from 'ngx-smz-ui';

@Component({
  selector: 'app-home',
  templateUrl: `home.component.html`,
  host: { 'class': 'absolute inset-0 p-3' }
})
export class HomeComponent
{

  constructor(private dialogs: SmzDialogsService, private store: Store)
  {


  }

}
