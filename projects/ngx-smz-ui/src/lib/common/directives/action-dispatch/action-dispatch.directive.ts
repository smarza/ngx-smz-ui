import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Store } from '@ngxs/store';

@Directive({
    selector: '[uiActionDispatch]',
    standalone: false
})
export class ActionDispatchDirective implements OnInit, OnDestroy {
  @Input() public method: 'click' | 'onClick' = 'click';
  @Input() public action: string;
  private dispose: Function;

  constructor(private renderer: Renderer2, private elementRef: ElementRef, private store: Store) {
  }
  public ngOnInit(): void {
    this.dispose = this.renderer.listen(this.elementRef.nativeElement, this.method, (e) => {
      this.store.dispatch(this.action);
    });
  }

  public ngOnDestroy(): void {
    this.dispose();
  }
}