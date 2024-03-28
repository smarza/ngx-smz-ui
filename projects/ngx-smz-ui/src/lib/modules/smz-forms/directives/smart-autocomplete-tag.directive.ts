import { NgModule, Directive, ElementRef, HostListener, Input, Output, EventEmitter, Optional, AfterViewInit, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NgModel, NgControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';

export interface SmzSmartAutocompleteTagConfig {

    tagCharacteres: {
        open: string,
        close: string
    }
    options: SmzSmartAutocompleteTagOption[]
}

export interface SmzSmartAutocompleteTagOption {
    key: string,
    searchTriggerLength: number
    dataSourceDisplayName: string;
    emptyMessage: string;
    searchDispatchCallback: (string) => void;
    searchResults$: Observable<string[]>;
    suggestions: string[];
    selected: string;
}


@Directive({
    selector: '[smzSmartAutocompleteTag]',
    host: {}
})
export class SmzSmartAutocompleteTagDirective implements OnInit, AfterViewInit, OnDestroy {

    @Input() public options: SmzSmartAutocompleteTagOption[];
    @Output() public tagTyped: EventEmitter<{ tag: SmzSmartAutocompleteTagOption, position: number }> = new EventEmitter<{ tag: SmzSmartAutocompleteTagOption, position: number }>();

    ngModelSubscription: Subscription;

    ngControlSubscription: Subscription;

    constructor(public el: ElementRef, @Optional() public ngModel: NgModel, @Optional() public control: NgControl, private cd: ChangeDetectorRef) { }

    ngOnInit() {
        // if (this.ngModel) {
        //     this.ngModelSubscription = this.ngModel.valueChanges.subscribe((event) =>{
        //         this.updateState(event);
        //     })
        // }

        // if (this.control) {
        //     this.ngControlSubscription = this.control.valueChanges.subscribe((event) => {
        //         this.updateState(event);
        //     });
        // }

        // console.log('options', this.options);
    }

    ngAfterViewInit() {

    }

    @HostListener('input', ['$event'])
    onInput(e) {
        this.updateState(e);
    }

    updateState(event: any) {

        const value: string = event.target.value;

        const element = this.el.nativeElement;
        const position = element.selectionStart;

        // console.log('startPosition', startPosition);

        const tag = this.options?.find(o => {

            const guess = value.substring(position - o.key.length, position);

            // console.log('------------');
            // console.log('key', o.key);
            // console.log('position', position);
            // console.log('key.length', o.key.length);
            // console.log('guess', guess);

            const result = guess === o.key;

            return result;
        });

        if (tag) {
            this.tagTyped.emit({ tag, position });
        }
    }

    ngOnDestroy() {
        if (this.ngModelSubscription) {
            this.ngModelSubscription.unsubscribe();
        }

        if (this.ngControlSubscription) {
            this.ngControlSubscription.unsubscribe();
        }
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [SmzSmartAutocompleteTagDirective],
    declarations: [SmzSmartAutocompleteTagDirective]
})
export class SmzSmartAutocompleteTagModule { }