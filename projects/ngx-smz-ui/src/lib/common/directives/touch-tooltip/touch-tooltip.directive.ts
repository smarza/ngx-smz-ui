// import { AfterContentInit, AfterViewInit, Directive, ElementRef, HostBinding, HostListener, Input, NgModule, NgZone, OnInit } from '@angular/core';
// import { PrimeNGConfig } from 'primeng/api';
// import { Tooltip, TooltipModule } from 'primeng/tooltip';


// @Directive({
//   selector: '[furyTouchTooltip]',
//   // host: {
//   //   '[pTooltip]':'pTooltip'
//   // },
// })
// export class TouchTooltipDirective extends Tooltip implements OnInit, AfterContentInit, AfterViewInit {

//   @Input() public pTooltip: string;
//   @Input() public tooltipEvent: string;
//   // @HostBinding('class') public className;
//   // @HostBinding('pTooltip') public pTooltip;

//   constructor(public el: ElementRef, public zone: NgZone, public config: PrimeNGConfig) {
//     super(el, zone, config);

//     // [pTooltip]="'Ricardo'" [tabindex]="0" style="outline: 0;" #hint1 tooltipEvent="focus" (click)="$event.stopPropagation(); hint1.focus()"

//     this.tooltipEvent = 'hover';

//     this.el.nativeElement.setAttribute('style', 'outline: 0;');
//     this.el.nativeElement.setAttribute('tabindex', 0);
//     this.el.nativeElement.setAttribute('tooltipEvent', 'hover');
//   }

//   public ngOnInit(): void {

//   }

//   public ngAfterContentInit(): void {
//   }

//   public ngAfterViewInit(): void {
//   }

//   @HostListener('click', ['$event'])
//   public onClick(event: MouseEvent): void {

//     event.stopPropagation();
//     console.log(this.el.nativeElement);
//     this.el.nativeElement.focus();

//   }

// }

// @NgModule({
//   imports: [TooltipModule],
//   exports: [TouchTooltipDirective],
//   declarations: [TouchTooltipDirective],
//   providers: [],
// })
// export class NgxSmzTouchTooltipModule { }