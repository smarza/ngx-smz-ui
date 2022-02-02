import { Component, OnInit } from '@angular/core';
import { SmzDockItem, SmzDockService } from '../../services/smz-dock.service';

@Component({
  selector: 'smz-ui-dock',
  templateUrl: './smz-dock.component.html'
})

export class SmzDockComponent implements OnInit {
  constructor(public dockService: SmzDockService) { }

  ngOnInit() { }

  public execute(item: SmzDockItem): void {

    switch (item.type) {
      case 'dialog':
        item.component.restore();
        this.dockService.remove(item.id);
        break;

      default:
        break;
    }
  }
}