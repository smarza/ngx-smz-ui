import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AuthenticationSelectors, SmzDialogsService } from 'ngx-smz-ui';
import { Observable } from 'rxjs';
import { UserData } from '@models/user-data';

@Component({
  selector: 'app-home',
  templateUrl: `home.component.html`,
})
export class HomeComponent
{
  @Select(AuthenticationSelectors.userdata) public userdata$: Observable<UserData>;

  constructor(private dialogs: SmzDialogsService, private store: Store)
  {

  }

}
