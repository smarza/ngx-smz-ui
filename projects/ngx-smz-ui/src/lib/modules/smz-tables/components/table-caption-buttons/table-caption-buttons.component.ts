import { Component, Input, OnInit } from '@angular/core';
import { SmzTableCaptionButton } from '../../models/table-column';

@Component({
    selector: 'smz-table-caption-buttons',
    templateUrl: 'table-caption-buttons.component.html',
    host: { class: 'grid grid-nogutter items-center justify-start gap-2' },
    standalone: false
})

export class SmzTableCaptionButtonsComponent implements OnInit {
  @Input() public buttons: SmzTableCaptionButton[];
  constructor() { }

  ngOnInit() { }
}