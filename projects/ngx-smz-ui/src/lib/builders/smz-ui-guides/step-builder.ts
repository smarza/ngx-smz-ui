import { Store } from '@ngxs/store';
import { cloneDeep } from 'lodash-es';
import { GlobalInjector } from '../../common/services/global-injector';
import { SmzUiGuidesStep } from '../../standalones/smz-ui-guides/models/smz-ui-guides-state';
import { AuthenticationSelectors } from '../../state/global/authentication/authentication.selectors';
import { SmzUiGuidesBuilder } from './ui-guides-builder';

export class SmzUiGuidesStepBuilder {
  private _step: SmzUiGuidesStep;
  private canAccess = true;
  constructor(private _builder: SmzUiGuidesBuilder, private elementId: string) {

    this._step = {
      ...cloneDeep(this._builder._defaultStep),
      number: this._builder._state.steps.length + 1,
      elementId,
    };

  }

  public forClaim(claim: string): SmzUiGuidesStepBuilder {
    const store: Store = GlobalInjector.instance.get(Store);
    const validationSelectors = GlobalInjector.config.rbkUtils.authorization.validationSelectors;

    this.canAccess = store.selectSnapshot(validationSelectors.hasClaimAccess(claim));
    return this;
  }

  public notForClaim(claim: string): SmzUiGuidesStepBuilder {
    const store: Store = GlobalInjector.instance.get(Store);
    const validationSelectors = GlobalInjector.config.rbkUtils.authorization.validationSelectors;

    this.canAccess = !store.selectSnapshot(validationSelectors.hasClaimAccess(claim));
    return this;
  }

  public forClaims(canAccessClaims: string[]): SmzUiGuidesStepBuilder {
    const store: Store = GlobalInjector.instance.get(Store);
    const validationSelectors = GlobalInjector.config.rbkUtils.authorization.validationSelectors;

    this.canAccess = store.selectSnapshot(validationSelectors.hasGroupOfClaimAccess(canAccessClaims));
    return this;
  }

  public setTitle(title: string): SmzUiGuidesStepBuilder {
    this._step.title = title;
    return this;
  }

  public setContent(content: string): SmzUiGuidesStepBuilder {
    this._step.content = content;
    return this;
  }

  public setStyles(styleClass: string): SmzUiGuidesStepBuilder {
    this._step.style.styleClass = styleClass;
    return this;
  }

  public setWidth(width: string): SmzUiGuidesStepBuilder {
    this._step.size.width = width;
    return this;
  }

  public setHeight(height: string): SmzUiGuidesStepBuilder {
    this._step.size.height = height;
    return this;
  }

  public offsetX(percentage: number): SmzUiGuidesStepBuilder {
    this._step.alignment.offsetX = percentage;
    return this;
  }

  public offsetY(percentage: number): SmzUiGuidesStepBuilder {
    this._step.alignment.offsetY = percentage;
    return this;
  }

  public horizontal(): SmzUiGuidesStepBuilder {
    this._step.alignment.offsetX = 50;
    return this;
  }

  public vertical(): SmzUiGuidesStepBuilder {
    this._step.alignment.offsetY = 50;
    return this;
  }

  public disableHighlight(): SmzUiGuidesStepBuilder {
    this._step.highlight.enabled = false;
    return this;
  }

  public setHighlightMargin(margin: number): SmzUiGuidesStepBuilder {
    this._step.highlight.margin = margin;
    return this;
  }

  public get step(): SmzUiGuidesBuilder {

    if (this.canAccess) {
      this._builder._state.steps.push(this._step);
    }

    return this._builder;
  }
}
