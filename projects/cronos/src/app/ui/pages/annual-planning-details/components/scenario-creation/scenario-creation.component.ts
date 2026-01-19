/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Confirmable, NgxSmzFormsModule, NgxSmzTreesModule, SmzForm, SmzFormsResponse, SmzTreeNode, SmzTreeState } from '@ngx-smz/core';
import { BehaviorSubject } from 'rxjs';
import { TabViewModule } from 'primeng/tabview';
import { FormControl, FormsModule } from '@angular/forms';
import { StrategyFormData } from './models/strategy-form-data';
import { cloneDeep } from 'lodash-es';

@Component({
  selector: 'app-scenario-creation',
  standalone: true,
  imports: [ CommonModule, ButtonModule, NgxSmzFormsModule, TabViewModule, FormsModule, NgxSmzTreesModule],
  host: { class: 'w-full h-full relative items-start justify-start' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <ng-container *ngIf="onValidationError$ | async as onValidationError">
    <div class="absolute right-2 top-0 grid grid-nogutter items-center justify-end w-full">
      <span *ngIf="onValidationError" style="color: red">Finalize o preenchimento do formulário para criar o cenário</span>
    </div>
  </ng-container>
  <smz-form-group [config]="data.generalForm" (statusChanges)="updateGeneralForm($event)" (unsavedChanges)="testUnsavedChanges($event)" (formChanges)="testFormChanges($event)"></smz-form-group>
  <div class="grid grid-nogutter items-center justify-start gap-2">
    <div class="smz__group_name mt-1">Configuração da Equipe</div>
    <p-button label="Adicionar" icon="fa-solid fa-plus" (onClick)="addTeam()" [rounded]="true" size="small"/>
  </div>
  <p-tabView class="w-full" [(activeIndex)]="activeIndex">
    <ng-container *ngFor="let team of teamTabs; let i = index;">
      <p-tabPanel>
        <ng-template pTemplate="header">
          <div class="grid grid-nogutter items-center justify-start gap-2">
            <div class="font-bold white-space-nowrap">Equipe {{ i + 1 }} rendered: {{ activeIndex === i }}</div>
            <p-button icon="fa-solid fa-trash" (onClick)="removeTeam(i)" [rounded]="true" [text]="true" [disabled]="teamTabs.length === 1"/>
          </div>
        </ng-template>
        <div class="grid grid-nogutter items-start justify-start flex-gap-1 w-full">
          <smz-form-group class="col-6" [config]="team.form" (statusChanges)="updateTeamForm()"></smz-form-group>
          @if(activeIndex === i && showHidroblastLocationsTree) {
            <smz-ui-tree
              class="col-6 h-[320px]"
              #smzTree
              [items]="data.hidroblastLocations"
              [state]="team.tree"
              [selection]="team.primeSelectionState"
              (selectedNodes)="updateTeamHidroblast($event, i)"
            ></smz-ui-tree>
          }
        </div>
      </p-tabPanel>
    </ng-container>
  </p-tabView>
  `,
  styles: [`
  app-scenario-creation {
    .p-tabview .p-tabview-nav li .p-tabview-nav-link { padding: 0 20px 0px 0px !important; }
    .input__control__wrapper { margin-bottom: 0px !important; margin-top: 0px !important; }
     p-tree h3 { font-size: 1.2em !important; }
     .radio_container { margin-top: 10px; }
  }
`]
})
export class ScenarioCreationComponent implements OnInit, OnDestroy {
  @Input() public data: StrategyFormData<{ considerProximity: boolean }, unknown>;
  @Output() public general: EventEmitter<unknown> = new EventEmitter();
  @Output() public teams: EventEmitter<unknown> = new EventEmitter();
  public showHidroblastLocationsTree = false;
  public teamTabs: TeamTab[] = [];
  public activeIndex = 0;
  public isValid = false;
  public onValidationError$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  constructor(private cdr: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.addTeam();
    this.setupErrorValidationListener();
  }

  @Confirmable('Deseja mesmo remover a equipe?', 'Remover Equipe')
  public removeTeam(index: number): void {
    this.teamTabs.splice(index, 1);
    this.activeIndex = index === 0 ? 1 : index - 1;
    this.cdr.detectChanges();
    this.updateTeamForm();
  }

  public addTeam(): void {
    this.teamTabs.push({
      form: { ...this.data.teamForm },
      tree: this.data.hidroblastLocationsTree,
      primeSelectionState: cloneDeep(this.data.defaultHidroblastLocations),
      selected: cloneDeep(this.data.defaultHidroblastLocations),
      isValid: false
    });
  }

  public updateGeneralForm(event: SmzFormsResponse<{ considerProximity: boolean }>): void {
    this.general.emit(event.data);
    this.checkProximity();
    this.checkValidity();
  }

  public testUnsavedChanges(event: any): void {
    console.log('     ####################### testUnsavedChanges', 'hasUnsavedChanges', event.hasUnsavedChanges, 'hasChanges', event.hasChanges, event);
  }

  public testFormChanges(event: any): void {
    console.log('     ####################### testFormChanges', 'hasUnsavedChanges', event.hasUnsavedChanges, 'hasChanges', event.hasChanges, event);
  }

  public updateTeamForm(): void {
    const teamData = this.teamTabs.map(x => {
      const formData = x.form.context?.data();

      if (formData != null) {
        const data = formData.data as any;

        return { ...data, hidroblastLocations: this.getSelectedHidroblastSector(x.selected) };
      }

      return { hidroblastLocations: this.getSelectedHidroblastSector(x.selected) };
    });

    this.teams.emit(teamData);
    this.checkValidity();
  }

  private getSelectedHidroblastSector(hidroblastLocations: string[]): string[] {
    return hidroblastLocations.filter(x => x.includes('_'));
  }

  public updateTeamHidroblast(event: SmzTreeNode[], index: number): void {
    console.log('---- updateTeamHidroblast');
    this.teamTabs[index].selected = event.map(x => x.key);
    console.log('selected', this.teamTabs[index].selected.length);
    console.log('primeSelectionState', this.teamTabs[index].primeSelectionState.length);

    // Update primeSelectionState without changing reference to avoid change detection loop
    const newSelection = event.map(x => x.key);
    this.teamTabs[index].primeSelectionState.length = 0;
    this.teamTabs[index].primeSelectionState.push(...newSelection);

    this.updateTeamForm();
    this.cdr.detectChanges();
  }

  public checkProximity(): void {
    const considerProximity = this.data.generalForm.context?.data()?.data?.considerProximity;
    this.showHidroblastLocationsTree = considerProximity;

    this.teamTabs?.forEach(team => {
      const field = team.form?.groups[0]?.children.find(x => x.propertyName === 'hidroblastLocationsQuantity');

      if (field != null && field.isVisible !== considerProximity) {
        field.isVisible = considerProximity;

        const formControl = team.form.context?.form.controls['hidroblastLocationsQuantity'] as FormControl;
        if (considerProximity){
          formControl.setValue(null);
        }
        else {
          formControl.setValue(1);
        }
      }
    });

    this.teamTabs.forEach(team => team.form.context?.cdf.detectChanges());
    this.cdr.detectChanges();
  }

  private checkValidity(): void {
    const isGeneralFormValid = this.data.generalForm.context?.valid();
    const isTeamFormValid = this.teamTabs.every(team => team.form.context?.form.valid);
    const isTeamHidroblastValid = this.teamTabs.every(team => team.selected.length > 0) || (this.data.generalForm.context?.data()?.data?.considerProximity) === false;

    this.isValid = isGeneralFormValid && isTeamFormValid && isTeamHidroblastValid;

    if (this.isValid) {
      this.onValidationError$.next(null);
    }
  }

  private setupErrorValidationListener(): void {
    this.onValidationError$.subscribe((event: boolean) => {
      if (event) {
        const generalFormContext = this.data.generalForm.context;
        const teamFormContext = this.teamTabs.some(team => team.form.context);

        if (generalFormContext) {
          generalFormContext.form.markAllAsTouched();
          generalFormContext.form.markAsDirty();
          generalFormContext.cdf.detectChanges();
        }

        if (teamFormContext) {
          this.teamTabs.forEach(team => team.form.context.form.markAllAsTouched());
          this.teamTabs.forEach(team => team.form.context.form.markAsDirty());
          this.teamTabs.forEach(team => team.form.context.cdf.detectChanges());
        }
      }
    });
  }

  public ngOnDestroy(): void {
    this.onValidationError$.unsubscribe();
  }
}

interface TeamTab {
  form: SmzForm<unknown>;
  tree: SmzTreeState;
  primeSelectionState: string[];
  selected: string[];
  isValid: boolean;
}
