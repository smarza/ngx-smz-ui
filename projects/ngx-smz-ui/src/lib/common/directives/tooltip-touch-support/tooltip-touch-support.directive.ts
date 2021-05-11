import { Directive, HostBinding, OnInit, ViewChild } from '@angular/core';
import { Tooltip } from 'primeng/tooltip';

@Directive({
  selector: '[appTooltipTouchSupport]',
})
export class TooltipTouchSupportDirective implements OnInit {
  @HostBinding('tabindex') public tabindex = '0';
  @HostBinding('style.outline') public outline = '0';
  @HostBinding('style.cursor') public cursor = 'pointer';
  @ViewChild(Tooltip) public pTooltip: Tooltip;
  constructor(public tooltip: Tooltip) {
  }
  public ngOnInit(): void {
    this.tooltip.tooltipPosition = 'bottom';
    this.tooltip.tooltipEvent = 'focus';
    this.tooltip.escape = false;
  }
}