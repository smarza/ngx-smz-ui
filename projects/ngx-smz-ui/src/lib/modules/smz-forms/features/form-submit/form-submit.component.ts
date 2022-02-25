import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { SmzUiBlockService } from '../../../smz-ui-block/smz-ui-block.service';
import { SmzFormsResponse } from '../../models/smz-forms';
import { FormGroupComponent } from '../form-group/form-group.component';

@Component({
  selector: 'smz-ui-form-submit',
  templateUrl: 'form-submit.component.html'
})

export class FormSubmitComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public form: FormGroupComponent;
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
      this.hook = this.form.statusChanges.subscribe((event) => {
        this.response = event;

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
    }, 0);
  }

  public cancel(): void {
    this.form.undoChanges();
  }

  public ngOnDestroy(): void {
    this.dispose();
  }
}