import { AfterContentInit, ChangeDetectorRef, Component, ContentChildren, Input, OnInit, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { PrimeTemplate, MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { Assistance } from '../../core/models/assistance';
import { LayoutState } from '../../core/models/layout';
import { RouterDataListenerService } from '../../core/services/router-data-listener.service';
import { LayoutUiActions } from '../../../../state/ui/layout/layout.actions';
import { LayoutUiSelectors } from '../../../../state/ui/layout/layout.selectors';
import { SmzLayoutsConfig } from '../../core/globals/smz-layouts.config';
import { UiHephaestusActions } from './state/ui-layout.actions';
import { UiHephaestusSelectors } from './state/ui-layout.selectors';
import { HephaestusLayout } from './layout.config';
import { SmzNotification } from '../../core/models/notifications';
import { SidebarState } from '../../core/models/sidebar-states';

@Component({
  selector: 'smz-ui-hephaestus-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HephaestusLayoutComponent implements OnInit, AfterContentInit {
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  @Select(UiHephaestusSelectors.state) public state$: Observable<LayoutState>;
  @Select(LayoutUiSelectors.assistance) public assistance$: Observable<Assistance>;
  @Select(LayoutUiSelectors.contentClass) public contentClass$: Observable<string>;
  @Input() public menu: MenuItem[];
  @Input() public profile: MenuItem[];
  @Input() public notifications: SmzNotification[];
  public headerExtrasTemplate: TemplateRef<any>;
  public footerExtrasTemplate: TemplateRef<any>;

  public sideBarStateActive = SidebarState.ACTIVE;

  constructor(public readonly config: SmzLayoutsConfig, public readonly layout: HephaestusLayout, public readonly routerListener: RouterDataListenerService, private store: Store, public cdr: ChangeDetectorRef) {
    this.store.dispatch(new LayoutUiActions.Initialize());
    this.store.dispatch(new UiHephaestusActions.Initialize(config, layout));
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
    this.store.dispatch(new UiHephaestusActions.HideSidebar);
  }


}
