import { Component, OnInit } from '@angular/core';
import { SmzSideContent } from 'ngx-smz-ui'

@Component({
  selector: 'app-side-content',
  templateUrl: './side-content.component.html',
  styleUrls: ['./side-content.component.scss']
})
export class SideContentComponent implements OnInit {

  public position: 'left' | 'right' = 'right';
  public overlay: boolean = false;
  public sideContentConfig: SmzSideContent = {
    dismissible: false,
    modal: false,
  };

  public visible: boolean = false;
  constructor() {
  }

  public ngOnInit(): void {
  }

  public toggleVisible(): void {
    this.visible = !this.visible;
  }

  public togglePosition(): void
  {
    this.position = this.position === 'left' ? 'right' : 'left';
  }

  public toggleOverlay(): void
  {
    this.overlay = !this.overlay;
  }

}
