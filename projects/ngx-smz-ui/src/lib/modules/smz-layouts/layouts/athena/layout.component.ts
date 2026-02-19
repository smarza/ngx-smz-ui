import { AfterContentInit, ChangeDetectorRef, Component, ContentChildren, inject, Input, OnInit, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngxs/store';
import { PrimeTemplate, MenuItem } from 'primeng/api';
import { RouterDataListenerService } from '../../core/services/router-data-listener.service';
import { LayoutUiActions } from '../../../../state/ui/layout/layout.actions';
import { LayoutUiSelectors } from '../../../../state/ui/layout/layout.selectors';
import { UiAthenaActions } from './state/ui-layout.actions';
import { UiAthenaSelectors } from './state/ui-layout.selectors';
import { AthenaLayout } from './layout.config';
import { SmzNotification } from '../../core/models/notifications';

@Component({
    selector: 'smz-ui-athena-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class AthenaLayoutComponent implements OnInit, AfterContentInit {
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  public contentClass$ = inject(Store).select(LayoutUiSelectors.contentClass);
  public state$ = inject(Store).select(UiAthenaSelectors.state);
  public assistance$ = inject(Store).select(LayoutUiSelectors.assistance);
  @Input() public menu: MenuItem[];
  @Input() public profile: MenuItem[];
  @Input() public notifications: SmzNotification[];
  public headerExtrasTemplate: TemplateRef<any>;
  public footerExtrasTemplate: TemplateRef<any>;
  constructor(public readonly layout: AthenaLayout, public readonly routerListener: RouterDataListenerService, private store: Store, public cdr: ChangeDetectorRef) {
    this.store.dispatch(new LayoutUiActions.Initialize());
    this.store.dispatch(new UiAthenaActions.Initialize(layout));
  }

  public ngOnInit(): void {
  }

  public ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case 'headerExtras':
          this.headerExtrasTemplate = item.template;
          break;
        case 'footerExtras':
          this.footerExtrasTemplate = item.template;
          break;
      }
    });
  }

  public hideMenu(): void {
    this.store.dispatch(new UiAthenaActions.HideSidebar);
  }


}
