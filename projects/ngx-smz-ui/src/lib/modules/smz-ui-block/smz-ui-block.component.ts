import { Component, OnInit } from '@angular/core';
import { SmzUiBlockService } from './smz-ui-block.service';

export interface SmzUiBlockConfig {
  key: string;
  component: any;
  blocked: boolean;
}

@Component({
  selector: 'smz-ui-block',
  template: `
  <ng-container *ngFor="let block of service.blocks">
    <p-blockUI [target]="block.component" [blocked]="block.blocked">
      <i class="pi pi-lock" style="font-size: 3rem"></i>
    </p-blockUI>
  </ng-container>
  `
})

export class SmzUiBlockComponent implements OnInit {

  constructor(public service: SmzUiBlockService) { }

  ngOnInit() { }
}