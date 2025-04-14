import { Directive, Input, TemplateRef, ViewContainerRef, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Directive({
    selector: '[smzResponsiveBreakpoints]',
    standalone: false
})
export class SmzResponsiveBreakpointsDirective implements OnInit, OnDestroy {
  private hasView = false;

  // Aceita múltiplos breakpoints como uma string separada por vírgulas
  @Input('smzResponsiveBreakpoints') set breakpoints(value: string) {
    this.breakpointArray = value.split(',').map(bp => bp.trim());
    this.updateView();
  }

  private breakpointArray: string[] = [];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.updateView();
  }

  private updateView(): void {
    this.breakpointObserver.observe(this.breakpointArray).subscribe(state => {
      if (state.matches) {
        if (!this.hasView) {
          this.viewContainer.createEmbeddedView(this.templateRef);
          this.hasView = true;
        }
      } else {
        if (this.hasView) {
          this.viewContainer.clear();
          this.hasView = false;
        }
      }
    });
  }

  ngOnDestroy() {
    this.viewContainer.clear();
  }
}

@NgModule({
  declarations: [
    SmzResponsiveBreakpointsDirective,
  ],
  imports: [
    CommonModule,
    LayoutModule
  ],
  exports: [
    SmzResponsiveBreakpointsDirective,
  ]
})
export class SmzResponsiveBreakpointsDirectiveModule { }