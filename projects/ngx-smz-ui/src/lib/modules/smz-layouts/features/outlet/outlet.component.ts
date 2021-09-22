import { AfterContentInit, Component, ContentChildren, ElementRef, forwardRef, HostListener, Input, OnInit, QueryList, TemplateRef } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { SmzLayoutsConfig } from '../../core/globals/smz-layouts.config';
import { RouterDataListenerService } from '../../core/services/router-data-listener.service';
import { PrimeTemplate, MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { LayoutUiSelectors } from '../../core/state/ui/ui.selectors';
import { SmzToastData } from '../../core/models/toasts';
import { PrimeConfigService } from '../../../../common/services/prime-config.service';
import { LayoutUiActions } from '../../core/state/ui/ui.actions';

@Component({
  selector: 'smz-ui-outlet',
  templateUrl: './outlet.component.html',
  styleUrls: ['./outlet.component.scss']
})
export class OutletComponent implements OnInit, AfterContentInit {
  @ContentChildren(forwardRef(() => PrimeTemplate)) templates: QueryList<PrimeTemplate>;
  @Select(LayoutUiSelectors.toast) public toast$: Observable<SmzToastData>;
  @Input() public menu: MenuItem[];
  public layoutTemplate: TemplateRef<any>;
  public contentTemplate: TemplateRef<any>;

  @HostListener('mouseleave')
  public onMouseLeave(): void {
    if (this.config.monitoreMouseEvents) {
      this.store.dispatch(new LayoutUiActions.SetLastUserMouseEvent('mouseleave'));
    }
  }

  @HostListener('mouseenter')
  public onBeforeUnload(): void {
    if (this.config.monitoreMouseEvents) {
      this.store.dispatch(new LayoutUiActions.SetLastUserMouseEvent('mouseenter'));
    }
  }

  constructor(
    public readonly config: SmzLayoutsConfig,
    public readonly routerListener: RouterDataListenerService,
    private store: Store,
    private primeConfig: PrimeConfigService) {
    this.primeConfig.init();
  }

  ngOnInit(): void {
  }

  public ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case 'layout':
          this.layoutTemplate = item.template;
          break;

        case 'content':
          this.contentTemplate = item.template;
          break;
      }
    });
  }

}
