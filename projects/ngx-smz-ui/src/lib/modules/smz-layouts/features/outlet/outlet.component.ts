import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';import { MenuItem } from 'primeng/api/menuitem';
import { SmzLayoutsConfig } from '../../globals/smz-layouts.config';
import { RouterDataListenerService } from '../../services/router-data-listener.service';

@Component({
  selector: 'smz-ui-outlet',
  templateUrl: './outlet.component.html',
  styleUrls: ['./outlet.component.scss']
})
export class OutletComponent implements OnInit
{
  @Input() public menu: MenuItem[];

  constructor(public readonly config: SmzLayoutsConfig, public readonly routerListener: RouterDataListenerService, private store: Store) { }

  ngOnInit(): void
  {
    console.log('OutletComponent ngOnInit');
  }


}
