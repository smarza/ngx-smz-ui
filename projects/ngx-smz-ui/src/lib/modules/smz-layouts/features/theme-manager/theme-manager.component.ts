import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store, } from '@ngxs/store';
import { DomSanitizer } from '@angular/platform-browser';
import { UiSelectors } from '../../core/state/ui/ui.selectors';

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
      .select(UiSelectors.contentTheme)
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
