import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Directive, DoCheck, ElementRef, EventEmitter, HostListener, NgModule, Optional, Output, Pipe, PipeTransform } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
    selector: '[smzInputText]',
    host: {
        class: 'p-inputtext p-component p-element',
        '[class.p-filled]': 'filled'
    },
    standalone: false
})
export class SmzInputTextPipe implements DoCheck, AfterViewInit {

  filled: boolean;
  @Output() changed: EventEmitter<string> = new EventEmitter();

  constructor(public el: ElementRef, @Optional() public ngModel: NgModel, private cd: ChangeDetectorRef) {}

  ngAfterViewInit() {
      this.updateFilledState();
      this.cd.detectChanges();
  }

  ngDoCheck() {
      this.updateFilledState();
  }

  @HostListener('input', ['$event'])
  onInput(e) {
      this.updateFilledState();
      this.changed.emit(this.ngModel?.model);
  }

  updateFilledState() {
      this.filled = (this.el.nativeElement.value && this.el.nativeElement.value.length) || (this.ngModel && this.ngModel.model);
  }

}

@NgModule({
    imports: [CommonModule],
    exports: [SmzInputTextPipe],
    declarations: [SmzInputTextPipe]
})
export class SmzInputTextModule {}