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
  public colorClass = 'text-pink-100';
  public shade = 0;
  public shades = [
    'text-pink-100',
    'text-pink-200',
    'text-pink-300',
    'text-pink-400',
    'text-pink-500',
  ]
  public options = [
    { key: 'key1' },
    { key: 'key2' },
    { key: 'key3' },
  ]
  constructor()
  {

  }

  public selectNewColor(): void {
    this.shade += 1;

    this.colorClass = this.shades[this.shade];
  }

}
