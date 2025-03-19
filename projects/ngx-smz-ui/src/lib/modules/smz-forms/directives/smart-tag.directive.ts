import { NgModule, Directive, ElementRef, HostListener, Input, Output, EventEmitter, Optional, AfterViewInit, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NgModel, NgControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

export interface SmzSmartTagConfig {

    tagCharacteres: {
        open: string,
        close: string
    }
    options: SmzSmartTagOptions[]
}

export interface SmzSmartTagOptions {
    key: string,
    data: SmzSmartTagData[]
}

export interface SmzSmartTagData {
    id: string,
    value: string
}


@Directive({
    selector: '[smzSmartTag]',
    host: {},
    standalone: false
})
export class SmzSmartTag implements OnInit, AfterViewInit, OnDestroy {

    @Input() public options: SmzSmartTagOptions[];
    @Output() public tagTyped: EventEmitter<{ tag: SmzSmartTagOptions, position: number }> = new EventEmitter<{ tag: SmzSmartTagOptions, position: number }>();

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
    exports: [SmzSmartTag],
    declarations: [SmzSmartTag]
})
export class SmzSmartTagModule { }