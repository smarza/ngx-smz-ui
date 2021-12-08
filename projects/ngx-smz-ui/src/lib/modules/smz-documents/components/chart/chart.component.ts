import { Component, Input, OnInit } from '@angular/core';
import { SmzDocumentConfig } from '../../models/smz-document-config';
import { SmzDocumentChart } from '../../models/smz-document-features';

@Component({
  selector: 'smz-document-chart',
  templateUrl: 'chart.component.html'
})

export class SmzDocumentChartComponent implements OnInit {
  @Input() public data: SmzDocumentChart;
  @Input() public config: SmzDocumentConfig;
  constructor() { }
  ngOnInit() {
  }
}