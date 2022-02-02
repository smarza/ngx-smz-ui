import { Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { SmzSVGWrapper } from './smz-svg-wrapper';
import { SmzSvgData } from './smz-svg';

import { SVG } from '@svgdotjs/svg.js';
import '@svgdotjs/svg.panzoom.js';
import { NumberAlias } from '@svgdotjs/svg.js';
import { Point } from '@svgdotjs/svg.js';
import { OverlayPanel } from '../prime/overlaypanel/overlaypanel';

@Component({
  selector: 'smz-svg',
  templateUrl: 'smz-svg.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})

export class SmzSvgComponent implements OnChanges {
  @ViewChild(OverlayPanel) public overlayPanel: OverlayPanel;
  @Input() public data: SmzSvgData;
  public draw: SmzSVGWrapper;
  public tooltipContent = '-';

  constructor(public cdf: ChangeDetectorRef) {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.currentValue != null) {
      this.load(changes.data.currentValue);
    }
  }

  private load(data: SmzSvgData): void {
    console.log('load...');

    const svg = data.svgs[0];
    // Draw the map
    this.draw = SVG(svg.svgFile) as SmzSVGWrapper;

    this.draw.addTo('#smz-svg-map');

    this.draw.size(data.width, data.height);

    this.draw.zoom(1);

    if (data.pan != null) this.draw.panZoom(data.pan);

    if (data.debugMode) this.draw.addClass('border-2 border-red-500 border-solid');

    const that = this;

    // loop over all regions
    for (const region of this.draw.find('path')) {

      // paint each region blue
      region
        .fill('#15803d')
        .addClass('cursor-pointer')
        .mouseover(function (this: SmzSVGWrapper, event) {
          this.fill({ color: '#f06' });
          console.log(`   show ${region.id()}`);
          that.show(event, region.id());
        })
        .mouseout(function (this: SmzSVGWrapper) {
          this.fill({ color: '#15803d' });
          console.log(`hide ${region.id()}`);
          that.hide();
        });

      // add a label to the center of each region
      this.draw
        .text(region.id())
        .font({ size: '0.7em', family: 'Open Sans' })
        .addClass('cursor-pointer')
        .fill({ color: 'white', opacity: 1 })
        .stroke({ color: '#f06', opacity: 1, width: 0 })
        .center(region.cx(), region.cy());
    }

    // this.draw.on('panEnd', (event) => {
    //   console.log('panEnd event', event);
    //   // event.preventDefault();
    // });

    if (data.debugMode) this.buildGrid();

  }

  public buildGrid(): void {

    const gap = 30;
    const size = 5;
    const maxX = 1000;
    const maxY = 1000;

    const that = this;

    for (let i = 0; i < maxX; i += gap) {
      for (let j = 0; j < maxY; j += gap) {
        this.draw
          .circle(size)
          .move(i, j)
          .data('key', { x: i, y: j })
          .data('text', 'Teste')
          .addClass('cursor-pointer')
          .fill({ color: 'black' })
          .mouseover(function (this: SmzSVGWrapper, event) {
            this.fill({ color: 'red' });
            that.show(event, `Point: ${JSON.stringify(this.data('key'))}`);
          })
          .mouseout(function (this: SmzSVGWrapper) {
            this.fill({ color: 'black' });
            that.hide();
          });
      }
    }

  }

  public zoom(level: NumberAlias, point?: { x: number, y: number }): void {

    if (point != null) {
      const newPoint = new Point(point.x, point.y);
      this.draw?.animate().zoom(level, newPoint);
    }
    else {
      this.draw?.animate().zoom(level);
    }
  }

  public show(event: MouseEvent, content: string): void {
    setTimeout(() => {
      this.tooltipContent = content;
      this.overlayPanel.show(event);
    }, 0);
  }

  public hide(): void {
    this.overlayPanel.hide();
  }
}