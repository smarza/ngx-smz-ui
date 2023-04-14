import { mergeClone } from '../../common/utils/deep-merge';
import { defaultSmzLayoutsConfig } from '../../modules/smz-layouts/core/globals/default-smz-layouts.config';
import { SmzLayoutsConfig } from '../../modules/smz-layouts/core/globals/smz-layouts.config';
import { SmzLoader } from '../../modules/smz-layouts/core/models/loaders';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzUiBuilder } from './ui-builder';

export class SmzUiLayoutsBuilder extends SmzBuilderUtilities<SmzUiLayoutsBuilder> {
  protected that = this;
  constructor(private _builder: SmzUiBuilder, config: SmzLayoutsConfig) {
    super();

    if (config != null) {
      this._builder._state.layouts = mergeClone(defaultSmzLayoutsConfig, config);
    }
  }

  public setLoader(type: SmzLoader): SmzUiLayoutsBuilder {
    this._builder._state.layouts.loader.type = type;
    return this.that;
  }

  public setTitle(title: string): SmzUiLayoutsBuilder {
    this._builder._state.layouts.loader.title = title;
    return this.that;
  }

  public setMessage(message: string): SmzUiLayoutsBuilder {
    this._builder._state.layouts.loader.message = message;
    return this.that;
  }

  public get builder(): SmzUiBuilder {
    return this._builder;
  }
}
