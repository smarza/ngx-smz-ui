import { Component } from '@angular/core';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent
{

  constructor(private store: Store)
  {

  }

}
