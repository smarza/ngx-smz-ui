import { Input, OnDestroy, ChangeDetectorRef, Component, ChangeDetectionStrategy, ViewChild, ElementRef, ViewEncapsulation, Optional } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { NgModel } from '@angular/forms';
import { SmzAutocompleteSelectorComponent } from './smz-autocomplete-selector-component';
import { SmzAutocompleteTagAreaControl } from '../../models/control-types';
import { SmzFormsBehaviorsConfig } from '../../models/behaviors';
import { SmzSmartAutocompleteTagOption } from '../../directives/smart-autocomplete-tag.directive';

@Component({
    selector: 'smz-input-autocomplete-tag-area',
    template: `
    <label *ngIf="input.hideLabel != true" class="smz__input_name" [innerHTML]="input.name"></label>
    <div class="input_inner__wrapper" [id]="input.propertyName">
        <textarea #inputArea id="inputArea" pInputTextarea smzSmartAutocompleteTag [formControl]="control" [options]="input.config.options" [rows]="input.textAreaRows" (tagTyped)="onTag($event)" class="col-12"></textarea>
        <smz-validation-messages [input]="input" [control]="control" [behaviors]="behaviors"></smz-validation-messages>
    </div>

    <p-overlayPanel #overlay appendTo="body" [style]="{width: '450px'}" (onHide)="onHideOverlay()" styleClass="tag-overlay">
        <ng-template pTemplate>
            <smz-autocomplete-selector *ngIf="currentOption"
                #elementSelector
                styleClass="tag-dropdown"
                [option]="currentOption"
                [allowCustomValues]="input.allowCustomValues"
                (finished)="hide()"
                >
            </smz-autocomplete-selector>
        </ng-template>
    </p-overlayPanel>
`,
    styles: [
        '.p-overlaypanel.autocomplete-tag-overlay { box-shadow: unset; }',
        '.p-overlaypanel.autocomplete-tag-overlay .p-overlaypanel-content { padding: 0; }',
        '.tag-dropdown.p-dropdown { width: 100%; }'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class SmzInputAutocompleteTagArea implements OnDestroy {
    @ViewChild(OverlayPanel) public overlay: OverlayPanel;
    @ViewChild('inputArea') public inputElement: ElementRef;
    @ViewChild('elementSelector') public selectorElement: SmzAutocompleteSelectorComponent;

    @Input() public input: SmzAutocompleteTagAreaControl;
    @Input() public control: any;
    @Input() public behaviors: SmzFormsBehaviorsConfig;

    public currentOption: SmzSmartAutocompleteTagOption;
    public currentTagPosition: number;

    constructor(@Optional() public ngModel: NgModel, private cdr: ChangeDetectorRef) { }

    public onHideOverlay(): void {

        if (this.currentOption != null) {

            // console.log('------------');
            // console.log('currentTagPosition', this.currentTagPosition);
            // console.log('key', this.currentTag.key);
            // console.log('prev', prev);
            // console.log('-');

            const prev: string = this.control.value;

            if (this.currentOption.selected != null) {
                const open = this.input.config.tagCharacteres.open?.substring(0, 1) ?? '';
                const close = this.input.config.tagCharacteres.close?.substring(0, 1) ?? '';

                this.updateValue(prev, this.currentOption.selected, open, close);
            }
            else {
                this.updateValue(prev, '', '', '');
            }
        }

        this.currentOption = null;
        this.currentTagPosition = null;
    }


    private updateValue(prev: string, selectedValue: string, open: string, close: string): void {
        // console.log('--------');
        // console.log('updateValue');
        // console.log('prev', prev);
        // console.log('selectedValue', selectedValue);
        // console.log('open', open);
        // console.log('close', close);

        let next = prev.substring(0, this.currentTagPosition - this.currentOption.key.length);
        next += open;
        next += selectedValue;
        next += close;
        next += prev.substring(this.currentTagPosition, prev.length);

        this.control.setValue(next);

        const cursorPosition = this.currentTagPosition + selectedValue.length - this.currentOption.key.length + open.length + close.length;

        setTimeout(() => {
            const element = this.inputElement.nativeElement;

            element.focus();
            element.setSelectionRange(cursorPosition, cursorPosition);

            this.cdr.markForCheck();
        }, 0);
    }

    public hide(): void {
        this.overlay.hide();
    }

    public onTag(event: { tag: SmzSmartAutocompleteTagOption, position: number }): void {

        const element = this.inputElement.nativeElement;

        this.currentOption = event.tag;
        this.currentTagPosition = event.position;

        // console.log('element', element);

        const calcResult = this.calc(element);

        const bouding = element.getBoundingClientRect();

        const target = {
            offsetHeight: 0,
            offsetWidth: 0,
            getBoundingClientRect: () => (
                {
                    bottom: bouding.bottom,
                    height: bouding.height,
                    left: bouding.left + calcResult.x,
                    right: bouding.right + calcResult.y,
                    top: bouding.top,
                    width: bouding.width,
                    x: bouding.x,
                    y: bouding.y,
                }
            ),
            parentNode: element.parentNode,
            contains: (el: HTMLElement) => {
                // console.log('el', el);
                return false;
            }
        }

        // console.log('target', target);
        // console.log('offsetHeight', element.offsetHeight);
        // console.log('offsetWidth', element.offsetWidth);
        // console.log('getBoundingClientRect', element.getBoundingClientRect());
        // console.log('parentNode', element.parentNode);

        this.overlay.toggle(null, target);

        setTimeout(() => {
            const el: HTMLElement = this.selectorElement.el.nativeElement;

            const items = el.querySelectorAll('input');
            items[0].focus();
        }, 0);
    }

    public calc(inputElement: any): any {
        // grab the properties from the input that we are interested in
        const {
            offsetLeft,
            offsetTop,
            offsetHeight,
            offsetWidth,
            scrollLeft,
            scrollTop,
            selectionEnd
        } = inputElement;
        // get style property values that we are interested in
        const { lineHeight, paddingRight } = getComputedStyle(inputElement);
        // get the caret X and Y from our helper function
        const { x, y } = this.getCursorXY(inputElement, selectionEnd);
        // set the marker positioning
        // for the left positioning we ensure that the maximum left position is the width of the input minus the right padding using Math.min
        // we also account for current scroll position of the input
        const newLeft = Math.min(
            x - scrollLeft,
            offsetLeft + offsetWidth - parseInt(paddingRight, 10)
        );
        // for the top positioning we ensure that the maximum top position is the height of the input minus line height
        // we also account for current scroll position of the input
        const newTop = Math.min(
            y - scrollTop,
            offsetTop + offsetHeight - parseInt(lineHeight, 10)
        );

        // console.log('offsetLeft', offsetLeft);
        // console.log('offsetTop', offsetTop);
        // console.log('offsetHeight', offsetHeight);
        // console.log('offsetWidth', offsetWidth);
        // console.log('scrollLeft', scrollLeft);
        // console.log('scrollTop', scrollTop);
        // console.log('selectionEnd', selectionEnd);

        // console.log('----');
        // console.log('x', x);
        // console.log('y', y);
        // console.log('newLeft', newLeft);
        // console.log('newTop', newTop);

        return {
            x,
            y
        };
    }

    public ngOnDestroy(): void {

    }

    public calcEvent = (e) => {
        const { currentTarget: input } = e;
        this.calc(input);
    };

    public getCursorXY = (input, selectionPoint) => {
        const { offsetLeft: inputX, offsetTop: inputY } = input;
        // create a dummy element that will be a clone of our input
        const div = document.createElement("div");
        // get the computed style of the input and clone it onto the dummy element
        const copyStyle = getComputedStyle(input) as any;
        for (const prop of copyStyle) {
            div.style[prop] = copyStyle[prop];
        }
        // we need a character that will replace whitespace when filling our dummy element if it's a single line <input/>
        const swap = ".";
        const inputValue =
            input.tagName === "INPUT" ? input.value.replace(/ /g, swap) : input.value;
        // set the div content to that of the textarea up until selection
        const textContent = inputValue.substr(0, selectionPoint);
        // set the text content of the dummy element div
        div.textContent = textContent;
        if (input.tagName === "TEXTAREA") div.style.height = "auto";
        // if a single line input then the div needs to be single line and not break out like a text area
        if (input.tagName === "INPUT") div.style.width = "auto";
        // create a marker element to obtain caret position
        const span = document.createElement("span");
        // give the span the textContent of remaining content so that the recreated dummy element is as close as possible
        span.textContent = inputValue.substr(selectionPoint) || ".";
        // append the span marker to the div
        div.appendChild(span);
        // append the dummy element to the body
        document.body.appendChild(div);
        // get the marker position, this is the caret position top and left relative to the input
        const { offsetLeft: spanX, offsetTop: spanY } = span;
        // lastly, remove that dummy element
        // NOTE:: can comment this out for debugging purposes if you want to see where that span is rendered
        document.body.removeChild(div);
        // return an object with the x and y of the caret. account for input positioning so that you don't need to wrap the input
        return {
            x: inputX + spanX,
            y: inputY + spanY
        };
    };
}