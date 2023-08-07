import { environment } from '@environments/environment';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzUiBuilder } from './ui-builder';
import { SmzUiLocale } from '../../state/database/ui-localization/ui-localization.state';

export class SmzUiLocalizationBuilder extends SmzBuilderUtilities<SmzUiLocalizationBuilder> {
  protected that = this;
  constructor(private _builder: SmzUiBuilder) {
    super();

    this._builder._state.rbkUtils.uiLocalization.isEnabled = true;
  }

  public setApiUrl(url: string): SmzUiLocalizationBuilder {
    this._builder._state.rbkUtils.uiLocalization.url = url;
    return this.that;
  }

  public addLocale(code: string, name: string, country: string): SmzUiLocalizationBuilder {
    this._builder._state.rbkUtils.uiLocalization.current = code;

    const locale: SmzUiLocale = { code, name, country };
    this._builder._state.rbkUtils.uiLocalization.locales.push(locale);

    return this.that;
  }

  public setDefault(locale: string): SmzUiLocalizationBuilder {
    this._builder._state.rbkUtils.uiLocalization.current = locale;
    return this.that;
  }

  public allowLocalizationSwitch(): SmzUiLocalizationBuilder {
    this._builder._state.rbkUtils.uiLocalization.allowLocalizationSwitching = true;
    return this.that;
  }

  public get builder(): SmzUiBuilder {
    return this._builder;
  }
}
