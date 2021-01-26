import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SmzLayoutsConfig } from '../../globals/smz-layouts.config';
import { RouterDataListenerService } from '../../services/router-data-listener.service';

@Component({
  selector: 'smz-ui-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit
{
  @Input() public menu: MenuItem[];

  constructor(public readonly config: SmzLayoutsConfig, private routerDataListenerService: RouterDataListenerService) { }

  ngOnInit(): void
  {
  }

}
