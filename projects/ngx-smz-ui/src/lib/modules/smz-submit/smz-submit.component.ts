import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SmzUiBlockService } from '../smz-ui-block/smz-ui-block.service';
import { SmzFormsResponse } from '../smz-forms/models/smz-forms';
import { SmzSubmitState } from './smz-submit';

@Component({
  standalone: true,
  imports: [CommonModule, ButtonModule],
  selector: 'smz-ui-submit',
  template: `
  <ng-container *ngIf="state != null && response != null">
    <div class="grid grid-nogutter items-center justify-start gap-2">
      <button pButton pRipple type="button" [icon]="saveIcon" [ngClass]="saveStyleClass" [disabled]="!response.isValid || !response.hasUnsavedChanges" (click)="submitSave()" [label]="saveLabel"></button>
      <button pButton pRipple type="button" [icon]="resetIcon" [ngClass]="resetStyleClass" [disabled]="!response.hasUnsavedChanges" (click)="cancel()" [label]="resetLabel"></button>
    </div>
  </ng-container>
  `
})

export class SmzSubmitComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public state: SmzSubmitState;
  @Input() public unBlockOnSave = true;
  @Input() public useBlockUi = true;
  @Input() public resetLabel: string;
  @Input() public resetStyleClass: string = 'p-button-rounded p-button-danger p-button-text';
  @Input() public resetIcon: string = 'pi pi-times';
  @Input() public saveLabel: string;
  @Input() public saveStyleClass: string = 'p-button-rounded p-button-text';
  @Input() public saveIcon: string = 'pi pi-check';
  @Output() public save: EventEmitter<any> = new EventEmitter<any>();
  public response: SmzFormsResponse<any>;
  public hook: Subscription;
  constructor(private uiBlockService: SmzUiBlockService) {}

  public ngOnInit(): void { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.form.currentValue != null) {
      this.hookFormChanges();
    }
    else {
      this.dispose();
    }
  }

  public hookFormChanges(): void {
    setTimeout(() => {
      this.hook = this.state.statusChanges.subscribe((event) => {
        this.response = event;

        if (!this.useBlockUi) {
          return;
        }

        if (event.hasUnsavedChanges) {
          this.uiBlockService.blockAll();
        }
        else {
          this.uiBlockService.unBlockAll();
        }

      });
    }, 0);
  }

  public dispose(): void {
    this.uiBlockService.unBlockAll();
    this.hook?.unsubscribe();
  }

  public submitSave(): void {
    setTimeout(() => {
      this.save.emit(this.response?.data);

      if (this.useBlockUi && this.unBlockOnSave) {
        this.uiBlockService.unBlockAll();
      }
    }, 0);
  }

  public cancel(): void {
    this.state.undoChanges();
  }

  public ngOnDestroy(): void {
    this.dispose();
  }
}