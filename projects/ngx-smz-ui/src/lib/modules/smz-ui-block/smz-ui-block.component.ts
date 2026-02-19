import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SmzUiBlockService } from './smz-ui-block.service';

export interface SmzUiBlockConfig {
  key: string;
  component: any;
  blocked: boolean;
}

@Component({
    selector: 'smz-ui-block',
    template: `
  @for (block of service.blocks; track block) {
    <p-blockUI [target]="block.component" [blocked]="block.blocked">
      <i class="pi pi-lock" style="font-size: 2rem"></i>
    </p-blockUI>
  }
  `,
    standalone: false
})

export class SmzUiBlockComponent implements OnInit {

  constructor(public service: SmzUiBlockService, private cdf: ChangeDetectorRef) { }

  ngOnInit() {
    this.service.onChanges.subscribe(() => {
      this.cdf.markForCheck()
    });
  }
}