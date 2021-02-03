import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';import { MenuItem } from 'primeng/api/menuitem';
import { SmzLayoutsConfig } from '../../globals/smz-layouts.config';
import { RouterDataListenerService } from '../../services/router-data-listener.service';

@Component({
  selector: 'smz-ui-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit
{
  @Input() public menu: MenuItem[];

  constructor() { }

  ngOnInit(): void
  {
  }

}
