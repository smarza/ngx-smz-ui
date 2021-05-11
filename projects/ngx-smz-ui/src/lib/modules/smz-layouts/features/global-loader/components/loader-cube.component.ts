import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'smz-ui-loader-cube',
  templateUrl: './loader-cube.component.html',
  styleUrls: ['./loader-cube.component.scss']
})
export class LoaderCubeComponent implements OnInit
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
