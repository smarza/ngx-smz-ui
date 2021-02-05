import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Select, Store, } from '@ngxs/store';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { UiManagerSelectors } from '../../core/state/ui-manager/ui-manager.selectors';

@Component({
  selector: 'smz-ui-theme-manager',
  templateUrl: './theme-manager.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeManagerComponent implements OnInit
{
  public currentContentTheme: string;

  constructor(private store: Store, public sanitizer: DomSanitizer, private cdr: ChangeDetectorRef)
  {
    this.store
      .select(UiManagerSelectors.contentTheme)
      .pipe()
      .subscribe((newTheme) =>
      {
        if (newTheme !== this.currentContentTheme)
        {
          this.currentContentTheme = newTheme;
          this.cdr.markForCheck();
        }
      });
  }

  ngOnInit(): void
  {

  }


}
