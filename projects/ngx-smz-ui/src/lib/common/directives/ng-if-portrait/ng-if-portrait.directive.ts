import { Directive, TemplateRef, ViewContainerRef, OnDestroy, NgModule, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Directive({
    selector: '[ngIfPortrait]',
    standalone: false
})
export class NgIfPortraitDirective implements OnDestroy {
  private hasView = false;
  private subscription: Subscription;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private breakpointObserver: BreakpointObserver
  ) {
    this.subscription = this.breakpointObserver.observe([
      Breakpoints.HandsetPortrait,
      Breakpoints.TabletPortrait,
      Breakpoints.WebPortrait
    ]).subscribe(result => {
      if (result.matches && !this.hasView) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasView = true;
      } else if (!result.matches && this.hasView) {
        this.viewContainer.clear();
        this.hasView = false;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}


@NgModule({
  imports: [],
  exports: [NgIfPortraitDirective],
  declarations: [NgIfPortraitDirective],
  providers: [],
})
export class NgIfPortraitDirectiveModule { }
