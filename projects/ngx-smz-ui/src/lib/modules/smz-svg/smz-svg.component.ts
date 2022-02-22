import { Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { SmzSVGWrapper } from './smz-svg-wrapper';
import { SmzSvgData, SmzSvgPin, SmzSvgRoot, SmzSvgTooltipData } from './smz-svg';

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
  public pins: SmzSvgPin[] = [];
  public draw: SmzSVGWrapper;
  public tooltipContent = '-';
  public isPanning: boolean = false;

  constructor(public cdf: ChangeDetectorRef) {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.currentValue != null) {
      this.setupRoot(changes.data.currentValue);
      this.setupPins(changes.data.currentValue);

      this.hookEvents();
    }
  }

  private setupRoot(data: SmzSvgData): void {

    const rootFeature = data.features.find(x => x.type === 'root') as SmzSvgRoot;

    // Draw the map
    this.draw = SVG(rootFeature.svgData) as SmzSVGWrapper;

    this.draw.addTo('#smz-svg-map');

    this.draw.size(rootFeature.width.toString(), rootFeature.height.toString());

    this.draw.zoom(1);

    if (data.pan != null) this.draw.panZoom(data.pan);

    if (data.debugMode) this.draw.addClass('border-2 border-red-500 border-solid');

    // const that = this;

    // loop over all regions
    for (const region of this.draw.find('path')) {

      // paint each region blue
      region
        .fill('#15803d');
        // .addClass('cursor-pointer')
        // .mouseover(function (this: SmzSVGWrapper, event) {
        //   // this.fill({ color: '#f06' });
        //   // console.log(`   show ${region.id()}`);
        //   // that.show(event, region.id());
        // })
        // .mouseout(function (this: SmzSVGWrapper) {
        //   // this.fill({ color: '#15803d' });
        //   // console.log(`hide ${region.id()}`);
        //   // that.hide();
        // });

      // add a label to the center of each region
      // this.draw
      //   .text(region.id())
      //   .font({ size: '0.7em', family: 'Open Sans' })
      //   .addClass('cursor-pointer')
      //   .fill({ color: 'white', opacity: 1 })
      //   .stroke({ color: '#f06', opacity: 1, width: 0 })
      //   .center(region.cx(), region.cy());
    }

    if (data.debugMode) this.buildGrid();

  }

  public setupPins(data: SmzSvgData): void {

    const pins = data.features.filter(x => x.type === 'pin') as SmzSvgPin[];

    this.pins = pins;

    pins.forEach(pin => {
      this.draw.svg(pin.svgData);

      this.draw
        .find(`#${pin.id}`)
        .each(element => {
          element
            .fill({ color: pin.color, opacity: 1 })
            .center(pin.position.x, pin.position.y)
            .size(pin.width)

            if (pin.tooltip != null) {
              this.addToolTip(element as SmzSVGWrapper, pin.tooltip);
            }
        }
        )
    });

  }

  public hookEvents(): void {

    this.draw.on('panStart', (event) => {
      // console.log('panStart event', event);
      this.isPanning = true;
      this.hide();
      // event.preventDefault();
    });

    this.draw.on('panEnd', (event) => {
      // console.log('panEnd event', event);
      this.isPanning = false;
      // event.preventDefault();
    });

    this.draw.on('zoom', (event) => {
      this.adjustPinScale(event);
      // event.preventDefault();
    });

  }

  public addToolTip(element: SmzSVGWrapper, tooltip: SmzSvgTooltipData): SmzSVGWrapper {

    const that = this;

    return element
      .addClass('cursor-pointer')
      .mouseover(function (this: SmzSVGWrapper, event) {
        // this.fill({ color: '#f06' });
        // console.log(`   show ${element.id()}`);

        if (!that.isPanning) {
          that.show(event, tooltip.data);
        }

      })
      .mouseout(function (this: SmzSVGWrapper) {
        // this.fill({ color: '#15803d' });
        // console.log(`hide ${element.id()}`);
        if (!that.isPanning) {
          that.hide();
        }
      });
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
    this.tooltipContent = content;
    this.overlayPanel.show(event);
  }

  public hide(): void {
    this.overlayPanel.hide();
  }

  public adjustPinScale(zoomEvent: any): void {

    const zoom = zoomEvent.detail.level;

    this.data.features
      .filter(x => x.adaptative != null)
      .forEach(pin => {

        this.draw
          .find(`#${pin.id}`)
          .each(element => {

            const newScale = 1 / zoom;
            const newWidth = pin.width * newScale;
            const width = (newWidth > pin.adaptative.maxWidth) ? pin.adaptative.maxWidth : ((newWidth < pin.adaptative.minWidth) ? pin.adaptative.minWidth : newWidth);

            element.size(width);

          })

    });
  }
}