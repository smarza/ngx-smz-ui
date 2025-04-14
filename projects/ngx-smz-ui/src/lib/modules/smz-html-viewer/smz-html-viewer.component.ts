import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'smz-html-viewer',
    templateUrl: 'smz-html-viewer.component.html',
    standalone: false
})

export class SmzHtmlViewerComponent implements OnInit {
  @Input() public html: string;
  public ngOnInit(): void {

  }
}