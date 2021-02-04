import { Component } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent
{

  constructor(private store: Store)
  {

  }

  public submit(): void
  {
    this.store.dispatch(new Navigate(['/']));
  }

}
