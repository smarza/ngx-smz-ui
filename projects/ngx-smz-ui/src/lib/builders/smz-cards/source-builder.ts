import { SmzCardsSource } from '../../modules/smz-cards/models/smz-cards-state';
import { SmzCardsBuilder } from './state-builder';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { GlobalInjector } from '../../common/services/global-injector';
import { AuthenticationSelectors } from '../../state/global/authentication/authentication.selectors';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';

export class SmzCardsSourcesBuilder<TItem> extends SmzBuilderUtilities<SmzCardsSourcesBuilder<TItem>> {
  protected that = this;
  constructor(private _builder: SmzCardsBuilder<TItem>) {
    super();
    if (this._builder._state.items$ != null) {
      throw Error(`You can't call sources() after setSource().`);
    }
  }

  public addSource(items$: Observable<TItem[]>, label: string): SmzCardsSourceBuilder<TItem> {
    return new SmzCardsSourceBuilder<TItem>(this._builder, this, items$, label);
  }

  public get cards(): SmzCardsBuilder<any> {

    return this._builder;
  }
}

export class SmzCardsSourceBuilder<TItem> {
  private sourceData: SmzCardsSource<TItem>;
  private allowed: string[] = [];
  private restricted: string[] = [];

  constructor(protected _cardsBuilder: SmzCardsBuilder<TItem>, protected _sourcesBuilder: SmzCardsSourcesBuilder<TItem>, items$: Observable<TItem[]>, label: string) {
    this.sourceData = {
      items$,
      isDefault: this._cardsBuilder._state.sources.length === 0,
      label: label,
    };
  }

  public setAsDefault(): SmzCardsSourceBuilder<TItem> {
    this._cardsBuilder._state.sources.forEach(x => x.isDefault = false);
    this.sourceData.isDefault = true;
    return this;
  }

  public allowTo(allowedClaim: string): SmzCardsSourceBuilder<TItem> {
    this.allowed.push(allowedClaim);
    return this;
  }

  public restrictTo(restrictedClaim: string): SmzCardsSourceBuilder<TItem> {
    this.restricted.push(restrictedClaim);
    return this;
  }

  public get source(): SmzCardsSourcesBuilder<TItem> {

    if (this.allowed.length === 0 && this.restricted.length === 0) {
      this._cardsBuilder._state.sources.push(this.sourceData);
    }
    else {
      const store: Store = GlobalInjector.instance.get(Store);
      const validationSelectors = GlobalInjector.config.rbkUtils.authorization.validationSelectors;

      const isAllow = store.selectSnapshot(validationSelectors.hasGroupOfClaimAccess(this.allowed));
      const isBlocked = store.selectSnapshot(validationSelectors.hasGroupOfClaimAccess(this.restricted));

      if (!isBlocked && isAllow) {

        if (this._cardsBuilder._state.isDebug) {
          console.log('User has access');
          console.log('allowed: ', this.allowed);
          console.log('restricted', this.restricted);
        }

        this._cardsBuilder._state.sources.push(this.sourceData);
      }
      else {

        if (this._cardsBuilder._state.isDebug) {
          console.log('User doesn\'t have access');
          console.log('allowed: ', this.allowed);
          console.log('restricted', this.restricted);
        }

      }
    }

    return this._sourcesBuilder;
  }

}
