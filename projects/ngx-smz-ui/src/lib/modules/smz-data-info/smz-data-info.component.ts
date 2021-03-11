import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'smz-data-info',
  templateUrl: 'smz-data-info.component.html'
})

export class SmzDataInfoComponent implements OnInit {
  @Input() public image: string;
  @Input() public message: string;
  @Input() public callbackInfo: string;
  @Input() public callbackLabel: string;
  @Output() public clicked: EventEmitter<void> = new EventEmitter<void>();
  public ngOnInit(): void {

  }
}