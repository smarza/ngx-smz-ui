import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store, } from '@ngxs/store';
import { UiSelectors } from '../../core/state/ui/ui.selectors';
import { ThemeManagerService } from './theme-manager.service';

@Component({
  selector: 'smz-ui-theme-manager',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeManagerComponent implements OnInit
{
  public currentContentTheme: string;
  public contentLink: HTMLLinkElement;

  constructor(private store: Store, private themeManagerService: ThemeManagerService)
  {
    this.contentLink = this.themeManagerService._document.createElement('link');
    this.contentLink.setAttribute('rel', 'stylesheet');
    this.contentLink.setAttribute('type', 'text/css');
    this.contentLink.setAttribute('href', '');

    this.store
      .select(UiSelectors.contentTheme)
      .subscribe((newTheme) =>
      {
        if (newTheme !== this.currentContentTheme)
        {
          this.contentLink.setAttribute('href', newTheme);
          this.currentContentTheme = newTheme;

          // Adicioar estilos de content da lib
          this.themeManagerService._document.head.appendChild(this.contentLink);

          // Adicionar estilos prioritários do projeto client
          this.themeManagerService.propagate();

          // console.log(this.themeManagerService._document.styleSheets);
        }
      });
  }

  ngOnInit(): void
  {
  }

}
