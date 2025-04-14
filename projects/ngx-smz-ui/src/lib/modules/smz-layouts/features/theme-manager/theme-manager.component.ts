import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store, } from '@ngxs/store';
import { LayoutUiActions } from '../../../../state/ui/layout/layout.actions';
import { LayoutUiSelectors } from '../../../../state/ui/layout/layout.selectors';
import { ThemeManagerService } from './theme-manager.service';
import { GlobalInjector } from '../../../../common/services/global-injector';

@Component({
  selector: 'smz-ui-theme-manager',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class ThemeManagerComponent
{
  public currentContentTheme: string;
  public contentLink: HTMLLinkElement;

  constructor(private store: Store, private themeManagerService: ThemeManagerService)
  {
    return;

    // TODO: Esse código deve ser removido após a implementação do tema do primeng

    this.contentLink = this.themeManagerService._document.createElement('link');
    this.contentLink.setAttribute('rel', 'stylesheet');
    this.contentLink.setAttribute('type', 'text/css');
    this.contentLink.setAttribute('href', '');

    this.store
      .select(LayoutUiSelectors.contentTheme)
      .subscribe((newTheme) =>
      {
        if (newTheme !== this.currentContentTheme)
        {
          console.log('newTheme', newTheme);
          this.contentLink.setAttribute('href', newTheme);
          this.currentContentTheme = newTheme;

          // Adicioar estilos de content da lib
          this.themeManagerService._document.head.appendChild(this.contentLink);

          // Adicionar estilos prioritários do projeto client
          this.themeManagerService.propagate();

          // console.log(this.themeManagerService._document.styleSheets);
        }
      });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event =>
    {

      const systemColor = event.matches ? "dark" : "light";

      switch (systemColor)
      {
        case 'dark':
          this.store.dispatch(new LayoutUiActions.SetContentTheme(GlobalInjector.config.layouts.themes.system.dark));
          break;

        case 'light':
          this.store.dispatch(new LayoutUiActions.SetContentTheme(GlobalInjector.config.layouts.themes.system.light));
          break;
      }
    });
  }

}
