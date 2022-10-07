import { SmzCardsSource } from '../../modules/smz-cards/models/smz-cards-state';
import { SmzCardsBuilder } from './state-builder';
import { Observable } from 'rxjs';

export class SmzCardsSourcesBuilder<T> {
  constructor(private _cardsBuilder: SmzCardsBuilder<T>) {
    if (this._cardsBuilder._state.items$ != null) {
      throw Error(`You can't call sources() after setSource().`);
    }
  }

  public addSource(items$: Observable<T[]>, label: string): SmzCardsSourceBuilder<T> {
    return new SmzCardsSourceBuilder<T>(this._cardsBuilder, this, items$, label);
  }

  public get cards(): SmzCardsBuilder<any> {

    return this._cardsBuilder;
  }
}

export class SmzCardsSourceBuilder<T> {
  private sourceData: SmzCardsSource<T>;

  constructor(protected _cardsBuilder: SmzCardsBuilder<T>, protected _sourcesBuilder: SmzCardsSourcesBuilder<T>, items$: Observable<T[]>, label: string) {
    this.sourceData = {
      items$,
      isDefault: this._cardsBuilder._state.sources.length === 0,
      label: label,
      claims: []
    };

    this._cardsBuilder._state.sources.push(this.sourceData);
  }

  public setAsDefault(): SmzCardsSourceBuilder<T> {
    this._cardsBuilder._state.sources.forEach(x => x.isDefault = false);
    this.sourceData.isDefault = true;
    return this;
  }

  public restrictAccess(allowedClaim: string): SmzCardsSourceBuilder<T> {
    this.sourceData.claims.push(allowedClaim);
    return this;
  }

  public get source(): SmzCardsSourcesBuilder<T> {

    return this._sourcesBuilder;
  }

}
