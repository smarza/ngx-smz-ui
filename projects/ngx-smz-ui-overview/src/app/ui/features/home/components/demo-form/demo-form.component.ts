import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { DemoTreeNode } from '@models/demo';
import { FormGroupComponent, SmzForm, SmzDialogsService, SmzDialogBuilder } from 'ngx-smz-ui';

@Component({
  selector: 'app-demo-form',
  template: `
  <div *ngIf="formComponent" class="p-grid p-nogutter p-align-center p-justify-start gap-2">
    <button pButton pRipple type="button" label="Ver Resposta" (click)="log()"></button>
    <i *ngIf="!formComponent.form?.touched" class="far fa-meh text-2xl" pTooltip="Ainda não foi tocado"></i>
    <i *ngIf="formComponent.isValid" class="fas fa-check text-green-500 text-2xl" pTooltip="Válido"></i>
    <i *ngIf="!formComponent.isValid" class="fas fa-times text-red-500 text-2xl" pTooltip="Com erros"></i>
  </div>

  <smz-form-group *ngIf="form != null" [config]="form" #formComponent></smz-form-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DemoFormComponent implements OnInit, OnChanges {
  @ViewChild(FormGroupComponent) public formComponent: FormGroupComponent;
  @Input() public node: DemoTreeNode
  public form: SmzForm<any>;

  constructor(private dialog: SmzDialogsService) { }

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
    const data = this.formComponent.getData();

    this.dialog.open(
      new SmzDialogBuilder()
        .setTitle(`Resposta do Form: ${this.node.label}`)
        .message(JSON.stringify(data))
        .buttons()
          .confirm().hide().buttons
          .cancel('FECHAR').buttons
          .dialog
      .build()
    );
  }
}
