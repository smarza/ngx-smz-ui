import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { DemoTreeNode } from '@models/demo';
import { FormGroupComponent, SmzForm } from 'ngx-smz-ui';

@Component({
  selector: 'app-demo-form',
  template: `
  <button pButton pRipple type="button" label="Logar Dados" (click)="log()"></button>
  <div>isValid: {{ formComponent?.isValid }}</div>
  <smz-form-group *ngIf="form != null" [config]="form" #formComponent></smz-form-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DemoFormComponent implements OnInit, OnChanges {
  @ViewChild(FormGroupComponent) public formComponent: FormGroupComponent;
  @Input() public node: DemoTreeNode
  public form: SmzForm<any>;

  constructor() { }

  ngOnInit() {
    this.form = this.node.data() as any;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.node != null) {
      const node = changes.node.currentValue;
      this.form = node.data();
    }

  }

  public log(): void {
    console.log('getData from form', this.formComponent.getData());
  }
}