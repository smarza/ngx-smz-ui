import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DemoTreeNode } from '@models/demo';
import { FormGroupComponent, SmzForm, SmzDialogsService, SmzDialogBuilder, SmzFormsResponse, SmzUiBlockService, PrettyJsonPipe } from 'ngx-smz-ui';

@Component({
  selector: 'app-demo-form',
  template: `
  <div *ngIf="formComponent" class="grid grid-nogutter items-center justify-start gap-2">
    <button pButton pRipple type="button" label="Ver Resposta" (click)="log()"></button>
    <button *ngIf="form != null" pButton pRipple type="button" label="Anular Config" class="p-button-danger" (click)="clear()"></button>
    <button *ngIf="form == null && node != null" pButton pRipple type="button" label="Recriar Config" class="p-button-success" (click)="build()"></button>
    <i *ngIf="!formComponent.viewdata?.form?.touched" class="fa-solid fa-face-meh text-2xl" pTooltip="Ainda não foi tocado"></i>
    <i *ngIf="formComponent.isValid" class="fa-solid fa-check text-green-500 text-2xl" pTooltip="Válido"></i>
    <i *ngIf="!formComponent.isValid" class="fa-solid fa-xmark text-red-500 text-2xl" pTooltip="Com erros"></i>
    <i class="fa-solid fa-cash-register text-gray-100 text-2xl" [ngClass]="{ 'text-blue-500': formComponent?.viewdata?.hasChanges }" [pTooltip]="formComponent?.viewdata?.hasChanges ? 'Modificado' : 'Não modificado'"></i>
    <div class="col"></div>
    <smz-ui-form-submit [form]="formComponent" (save)="onSave($event)"></smz-ui-form-submit>
  </div>

  <smz-form-group [config]="form" #formComponent (onChange)="onStatusChanges($event)"></smz-form-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DemoFormComponent implements OnInit, OnChanges {
  @ViewChild(FormGroupComponent) public formComponent: FormGroupComponent;
  @Input() public node: DemoTreeNode
  public form: SmzForm<any>;

  constructor(private dialog: SmzDialogsService, private cdf: ChangeDetectorRef, private uiBlockService: SmzUiBlockService) { }

  ngOnInit() {
    this.build();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.node != null) {
      const node = changes.node.currentValue;
      this.form = node.data();
      console.log(this.form);
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

  public onSave(event: any): void {
    console.log('onSave', event);
    this.uiBlockService.unBlockAll();
  }


  public log(): void {
    const data = this.formComponent.getData();
    console.log('formComponent', this.formComponent);
    console.log('formResponse', data);
    const message = new PrettyJsonPipe().transform(JSON.stringify(data), [true, 3]);
    this.dialog.open(
      new SmzDialogBuilder()
        .setTitle(`Resposta do Form: ${this.node.label}`)
        .message(message)
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

    // setTimeout(() => {
    //   console.log('form', this.form);
    // }, 2000);
  }

  public clear(): void {
    this.form = null;
    this.cdf.markForCheck();
}
}
