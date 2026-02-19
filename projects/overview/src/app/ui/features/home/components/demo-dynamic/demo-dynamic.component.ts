import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DemoTreeNode } from '../../../../../models/demo';
import { SmzInjectableComponent } from '@ngx-smz/core';

@Component({
  standalone: false,
  selector: 'app-demo-dynamic',
  template: `
  @if (injectable != null) {
    <ng-template [smzStandaloneInjectComponent]="injectable"></ng-template>
  } @else {
    <p>No injectable data on this demo</p>
  }
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