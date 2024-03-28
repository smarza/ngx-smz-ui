import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteCompleteEvent, AutoCompleteLazyLoadEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, Observable, debounceTime } from 'rxjs';
import { Store } from '@ngxs/store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { isNullOrEmptyString } from '../../../../common/utils/utils';
import { SmzSmartTagData } from '../../directives/smart-tag.directive';

@UntilDestroy()
@Component({
  selector: 'smz-autocomplete-selector',
  standalone: true,
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

        [(ngModel)]="selected"
        [suggestions]="suggestions"
        [dropdown]="true"
        emptyMessage="Nenhum tag com essa expressão na planta"

        (completeMethod)="search($event)"
        (onClear)="onClear()"
        (onBlur)="handleSelection()"
        (onLazyLoad)="onLazyLoad($event)"
        (onSelect)="onSelect()">

        <ng-template pTemplate="header">
          <div class="text-blue-500 font-bold text-lg mx-5 mt-4 mb-0">Tags dos modelos do Proteus</div>
        </ng-template>

      </p-autoComplete>
    </div>
`
})
export class SmzAutocompleteSelectorComponent implements OnInit, AfterViewInit {
  @Input() public isRequired = true;
  @Input() public selected: string;
  @Input() public minLength = 2;
  @Input() public currentTagData: SmzSmartTagData;
  @Input() public searchDispatchTrigger: (string) => void;
  @Input() public searchResults$: Observable<string[]>;
  @Output() public currentTagDataChange: EventEmitter<SmzSmartTagData> = new EventEmitter();
  @Output() public suggestionsChanged: EventEmitter<string[]> = new EventEmitter();
  @Output() public finished: EventEmitter<void> = new EventEmitter();
  @Input() public suggestions: string[] = [];
  public isValid = false;
  public dispatchGate: BehaviorSubject<string> = new BehaviorSubject<string>(null);
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

    this.searchResults$
      .pipe(untilDestroyed(this))
      .subscribe((suggestions: string[]) => {
        this.suggestions = suggestions;
        this.suggestionsChanged.emit(this.suggestions);

        this.cdr.markForCheck();
      });
  }

  public setupDispatchGate(): void {

    this.dispatchGate
      .pipe(debounceTime(500), untilDestroyed(this))
      .subscribe((query) => {
        if (query == null) {
          this.suggestions = [];
          this.suggestionsChanged.emit(this.suggestions);

          this.cdr.markForCheck();
        }
        else {
          this.searchDispatchTrigger(query);
        }

      });
  }

  public search(event: AutoCompleteCompleteEvent): void {
    if (event.query.length >= this.minLength) {
      this.dispatchGate.next(event.query);
    }
    else {
      this.dispatchGate.next(null);
    }

  }

  public onClear(): void {
    this.selected = null;
    this.isValid = false;

    this.currentTagDataChange.emit({ id: this.selected, value: this.selected });
  }

  public handleInitialSelection(): void {
    if (isNullOrEmptyString(this.selected)) {
      this.onClear();
    }
    else {
      this.isValid = true;
      this.currentTagDataChange.emit({ id: this.selected, value: this.selected });
    }
  }

  public handleSelection(): void {
    if (isNullOrEmptyString(this.selected)) {
      this.onClear();
    }
    else {
      this.isValid = true;
      this.currentTagDataChange.emit({ id: this.selected, value: this.selected });
    }
  }

  public onLazyLoad(event: AutoCompleteLazyLoadEvent): void {
    console.log('onLazyLoad', event);
  }

  public onSelect(): void {
    this.handleSelection();

    this.finished.emit();
  }

}