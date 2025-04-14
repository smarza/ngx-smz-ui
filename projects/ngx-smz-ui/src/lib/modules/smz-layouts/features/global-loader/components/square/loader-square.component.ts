import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'smz-ui-loader-square',
    templateUrl: './loader-square.component.html',
    styleUrls: ['./loader-square.component.scss'],
    standalone: false
})
export class LoaderSquareComponent implements OnInit
{
  @Input() public title = '';
  @Input() public message = '';
  @Input() public width = '230px';
  constructor() { }

  public ngOnInit(): void
  {
    this.calculateWidth();
  }

  public calculateWidth(): void {

    const characters = this.message.length;

    if (characters <= 18) return;

    this.width =  `${Math.round((characters * 160) / 18)}px`;
  }
}
