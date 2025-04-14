import { Component, OnInit, Input, ViewEncapsulation, ChangeDetectionStrategy, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';

@Component({
    standalone: false,
    selector: 'demo-code-block',
    templateUrl: './code-block.component.html',
    styleUrls: ['./code-block.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeBlockComponent implements OnInit, OnChanges
{

    @Input() public code: string;
    public showCode = false;

    constructor(private cdr: ChangeDetectorRef) { }

    ngOnInit(): void
    {

    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['code'] != null) {

            this.showCode = false;
            this.cdr.markForCheck();

            setTimeout(() => {
                this.showCode = true;
                this.cdr.markForCheck();
            }, 0);
        }
    }

}
