import { environment } from '@environments/environment';
import { SmzLayoutsConfig } from '../../modules/smz-layouts/core/globals/smz-layouts.config';
import { SmzLoader } from '../../modules/smz-layouts/core/models/loaders';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzUiBuilder } from './ui-builder';

export class SmzUiTablesBuilder extends SmzBuilderUtilities<SmzUiTablesBuilder> {
  protected that = this;
  constructor(private _builder: SmzUiBuilder) {
    super();
  }

  public setExportApiAbsoluteUrl(url: string): SmzUiTablesBuilder {
    this._builder._state.tables.export.absoluteApiUrl = url;
    return this.that;
  }

  public setExportApiRelativeUrl(controller: string, endpoint: string): SmzUiTablesBuilder {
    this._builder._state.tables.export.absoluteApiUrl = `${environment.serverUrl}/api/${controller}/${endpoint}`;
    return this.that;
  }

  public setExportRequestLimit(limit: number): SmzUiTablesBuilder {
    this._builder._state.tables.export.requestLimit = limit;
    return this.that;
  }

  public get builder(): SmzUiBuilder {
    return this._builder;
  }
}
