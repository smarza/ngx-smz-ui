import { Directive, TemplateRef, ViewContainerRef, OnDestroy, NgModule, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[ngIfLandscape]',
})
export class NgIfLandscapeDirective implements OnDestroy {
  private hasView = false;
  private subscription: Subscription;

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef, private breakpointObserver: BreakpointObserver) {

    this.subscription = this.breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.TabletLandscape,
      Breakpoints.WebLandscape
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
  exports: [NgIfLandscapeDirective],
  declarations: [NgIfLandscapeDirective],
  providers: [],
})
export class NgIfLandscapeDirectiveModule { }
