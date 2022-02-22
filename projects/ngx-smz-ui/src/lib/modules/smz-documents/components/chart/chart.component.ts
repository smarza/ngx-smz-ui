import { Component, Input, OnInit } from '@angular/core';
import { SmzDocumentState } from '../../models/smz-document';
import { SmzDocumentConfig } from '../../models/smz-document-config';
import { SmzDocumentChart } from '../../models/smz-document-features';


@Component({
  selector: 'smz-document-chart',
  templateUrl: 'chart.component.html'
})

export class SmzDocumentChartComponent implements OnInit {
  @Input() public data: SmzDocumentChart;
  @Input() public config: SmzDocumentConfig;
  @Input() public state: SmzDocumentState;
  public plugins = [
    {
      afterRender: function (c) {
        var ctx = c.ctx;
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.restore();
      }
    }
  ]
  constructor() { }
  ngOnInit() {
  }
}