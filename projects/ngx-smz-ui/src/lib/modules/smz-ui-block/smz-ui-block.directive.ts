import { Directive, ElementRef, OnInit, Input, OnDestroy } from '@angular/core';
import { SmzUiBlockService } from './smz-ui-block.service';
import { UUID } from 'angular2-uuid';

@Directive({
  selector: '[smzUiBlock]',
  host: {}
})
export class SmzUiBlockDirective implements OnInit, OnDestroy {
  public key: string = UUID.UUID();
  @Input() public component: any;

  constructor(public el: ElementRef, private service: SmzUiBlockService) {
  }

  public ngOnInit(): void {
    this.component['getBlockableElement'] = (): HTMLElement => {
      return this.el.nativeElement;
    };

    this.service.add(this.key, this.component);
  }

  public ngOnDestroy(): void {
    this.service.remove(this.key);
  }

}