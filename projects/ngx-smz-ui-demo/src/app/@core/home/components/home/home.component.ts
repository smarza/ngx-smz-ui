import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { UiSelectors, ThemeToneType } from 'ngx-smz-ui';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent
{
  @Select(UiSelectors.appThemeTone) public appThemeTone$: Observable<ThemeToneType>;
  constructor()
  {

  }

}
