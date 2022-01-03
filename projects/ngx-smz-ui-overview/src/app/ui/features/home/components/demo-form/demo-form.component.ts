import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DemoTreeNode } from '@models/demo';
import { FormGroupComponent, SmzForm, SmzDialogsService, SmzDialogBuilder, SmzFormsResponse } from 'ngx-smz-ui';

@Component({
  selector: 'app-demo-form',
  template: `
  <div *ngIf="formComponent" class="grid grid-nogutter items-center justify-start gap-2">
    <button pButton pRipple type="button" label="Ver Resposta" (click)="log()"></button>
    <button *ngIf="form != null" pButton pRipple type="button" label="Anular Config" class="p-button-danger" (click)="clear()"></button>
    <button *ngIf="form == null && node != null" pButton pRipple type="button" label="Recriar Config" class="p-button-success" (click)="build()"></button>
    <i *ngIf="!formComponent.viewdata?.form?.touched" class="far fa-meh text-2xl" pTooltip="Ainda não foi tocado"></i>
    <i *ngIf="formComponent.isValid" class="fas fa-check text-green-500 text-2xl" pTooltip="Válido"></i>
    <i *ngIf="!formComponent.isValid" class="fas fa-times text-red-500 text-2xl" pTooltip="Com erros"></i>
    <i class="fas fa-cash-register text-gray-100 text-2xl" [ngClass]="{ 'text-blue-500': formComponent?.viewdata?.hasChanges }" [pTooltip]="formComponent?.viewdata?.hasChanges ? 'Modificado' : 'Não modificado'"></i>
  </div>

  <smz-form-group [config]="form" #formComponent (statusChanges)="onStatusChanges($event)"></smz-form-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DemoFormComponent implements OnInit, OnChanges {
  @ViewChild(FormGroupComponent) public formComponent: FormGroupComponent;
  @Input() public node: DemoTreeNode
  public form: SmzForm<any>;

  constructor(private dialog: SmzDialogsService, private cdf: ChangeDetectorRef) { }

  ngOnInit() {
    this.build();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.node != null) {
      const node = changes.node.currentValue;
      this.form = node.data();
    }

  }

  public onStatusChanges(event: SmzFormsResponse<any>): void {
    console.log('onStatusChanges', event);

    // if (event.hasUnsavedChanges && event.isValid) {
    //   console.log('hasUnsavedChanges and isValid', event);
    // }
    // else if (event.hasUnsavedChanges && !event.isValid) {
    //   console.log('hasUnsavedChanges and not valid', event);
    // }
    // else {
    //   console.log('original');
    // }

  }

  public onValuesChanged(event: any): void {
    console.log('onValuesChanged', event);
  }

  public log(): void {
    const data = this.formComponent.getData();
    console.log('formComponent', this.formComponent);
    console.log('formResponse', data);
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

  public build(): void {
    this.form = this.node.data() as any;
    this.cdf.markForCheck();
  }

  public clear(): void {
    this.form = null;
    this.cdf.markForCheck();
}
}
