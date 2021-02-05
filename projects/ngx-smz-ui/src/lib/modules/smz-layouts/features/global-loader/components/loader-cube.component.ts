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
  constructor() { }

  public ngOnInit(): void
  {
  }
}
