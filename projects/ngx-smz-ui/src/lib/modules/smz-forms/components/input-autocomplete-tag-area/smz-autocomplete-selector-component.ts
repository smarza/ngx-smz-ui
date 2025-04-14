import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, ElementRef, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, debounceTime } from 'rxjs';
import { Store } from '@ngxs/store';
import { isNullOrEmptyString } from '../../../../common/utils/utils';
import { SmzSmartAutocompleteTagOption } from '../../directives/smart-autocomplete-tag.directive';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'smz-autocomplete-selector',
    imports: [
        CommonModule,
        ButtonModule,
        AutoCompleteModule,
        FormsModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="col-12 px-0 grid grid-nogutter items-center justify-start gap-2">
      <p-autoComplete
        class="col"
        styleClass="w-full"

        [(ngModel)]="option.selected"
        [suggestions]="suggestions"
        [dropdown]="true"
        [emptyMessage]="option.emptyMessage"

        (completeMethod)="search($event)"
        (onClear)="onClear()"
        (onBlur)="handleSelection()"
        (onSelect)="onSelect()"
        (keydown)="handleKeyDown($event)">

        <ng-template pTemplate="header">
          <div *ngIf="option.dataSourceDisplayName != null" class="text-blue-500 font-bold text-lg mx-5 mt-4 mb-0">{{ option.dataSourceDisplayName }}</div>
        </ng-template>

      </p-autoComplete>
    </div>
`
})
export class SmzAutocompleteSelectorComponent implements OnInit, AfterViewInit {
  private readonly destroyRef = inject(DestroyRef);
  @Input() public isRequired = true;
  @Input() public allowCustomValues = true;
  @Input() public option: SmzSmartAutocompleteTagOption;
  @Output() public selectedChange: EventEmitter<string> = new EventEmitter();
  @Output() public suggestionsChanged: EventEmitter<string[]> = new EventEmitter();
  @Output() public finished: EventEmitter<void> = new EventEmitter();
  @Input() public suggestions: string[] = [];
  public isValid = false;
  public dispatchGate: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  constructor(public el: ElementRef, public store: Store, public cdr: ChangeDetectorRef) {
  }

  public ngOnInit(): void {
    this.handleInitialSelection();
  }

  public ngAfterViewInit(): void {
    this.setupDispatchGate();

    setTimeout(() => {
      this.setupListeners();
    }, 0);
  }

  public setupListeners(): void {

    this.option.searchResults$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((suggestions: string[]) => {
        this.suggestions = suggestions;
        this.suggestionsChanged.emit(this.suggestions);

        this.cdr.markForCheck();
      });
  }

  public setupDispatchGate(): void {

    this.dispatchGate
      .pipe(debounceTime(500), takeUntilDestroyed(this.destroyRef))
      .subscribe((query) => {
        if (query == null) {
          this.suggestions = [];
          this.suggestionsChanged.emit(this.suggestions);

          this.cdr.markForCheck();
        }
        else {
          this.option.searchDispatchCallback(query);
        }

      });
  }

  public search(event: AutoCompleteCompleteEvent): void {
    if (event.query.length >= this.option.searchTriggerLength) {
      this.dispatchGate.next(event.query);
    }
    else {
      this.dispatchGate.next(null);
    }

  }

  public onClear(): void {
    this.option.selected = null;
    this.isValid = false;

    this.selectedChange.emit(this.option.selected ?? undefined);
  }

  public handleInitialSelection(): void {
    if (isNullOrEmptyString(this.option.selected)) {
      this.onClear();
    }
    else {
      this.isValid = true;
      this.selectedChange.emit(this.option.selected ?? undefined);
    }
  }

  public handleSelection(): void {
    if (isNullOrEmptyString(this.option.selected)) {
      this.onClear();
    }
    else {
      this.isValid = true;
      this.selectedChange.emit(this.option.selected ?? undefined);
    }
  }

  public onSelect(): void {
    this.handleSelection();

    this.finished.emit();
  }

  public handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {

      if (this.allowCustomValues) {
        this.onSelect()
      }
      else {
        if (this.suggestions.some(x => x === this.option.selected)) {
          this.onSelect()
        }
        else {
          this.onClear();
          this.cdr.markForCheck();
        }
      }

    }
  }

}