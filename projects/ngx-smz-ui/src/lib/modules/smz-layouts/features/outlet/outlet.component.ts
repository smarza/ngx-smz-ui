import { AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList, TemplateRef } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { SmzLayoutsConfig } from '../../core/globals/smz-layouts.config';
import { RouterDataListenerService } from '../../core/services/router-data-listener.service';
import { PrimeTemplate, MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { UiSelectors } from '../../core/state/ui/ui.selectors';
import { SmzToastData } from '../../core/models/toasts';

@Component({
  selector: 'smz-ui-outlet',
  templateUrl: './outlet.component.html',
  styleUrls: ['./outlet.component.scss']
})
export class OutletComponent implements OnInit, AfterContentInit
{
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  @Select(UiSelectors.toast) public toast$: Observable<SmzToastData>;
  @Input() public menu: MenuItem[];
  public layoutTemplate: TemplateRef<any>;
  public contentTemplate: TemplateRef<any>;

  constructor(
    public readonly config: SmzLayoutsConfig,
    public readonly routerListener: RouterDataListenerService,
    private store: Store)
  {

  }

  ngOnInit(): void
  {

  }


  public ngAfterContentInit()
  {
    this.templates.forEach((item) =>
    {
      switch (item.getType())
      {
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
