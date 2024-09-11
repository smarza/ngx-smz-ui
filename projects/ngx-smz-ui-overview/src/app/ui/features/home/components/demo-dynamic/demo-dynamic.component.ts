import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DemoTreeNode } from '../../../../../models/demo';
import { SmzInjectableComponent } from 'ngx-smz-ui';

@Component({
  selector: 'app-demo-dynamic',
  template: `
  <ng-container *ngIf="injectable != null; else noInjectable">
    <ng-template [smzStandaloneInjectComponent]="injectable"></ng-template>
  </ng-container>
  <ng-template #noInjectable>
    <p>No injectable data on this demo</p>
  </ng-template>
`,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DemoDynamicComponent implements OnInit {
  @Input() public node: DemoTreeNode;
  public isNodeLoaded = false;
  public injectable: SmzInjectableComponent;


  public ngOnInit(): void {
    this.injectable = this.getInjectable();

    if (this.injectable != null) {
      this.isNodeLoaded = true;
    }
  }

  public getInjectable(): SmzInjectableComponent {
    const nodeData = this.node?.data();
    return nodeData == null ? null : {
      component: nodeData.component,
      inputs: [
        { input: 'state', data: nodeData.stateBuilder().build() },
      ],
      outputs: []
    };
  };

}