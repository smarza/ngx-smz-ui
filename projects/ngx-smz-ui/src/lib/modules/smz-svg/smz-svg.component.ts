import { Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import { SmzSVGWrapper } from './models/smz-svg-wrapper';
import { SmzSvgState, SmzSvgPin, SmzSvgRoot, SmzSvgTooltipData } from './models/smz-svg';

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

export class SmzSvgComponent implements OnChanges, AfterViewInit {
  @ViewChild(OverlayPanel) public overlayPanel: OverlayPanel;
  @Input() public state: SmzSvgState;
  public pins: SmzSvgPin[] = [];
  public draw: SmzSVGWrapper;
  public tooltipContent = '-';
  public isPanning: boolean = false;
  public hasViewInit = false;

  constructor(public cdf: ChangeDetectorRef) {

  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.state.currentValue != null) {

      if (this.hasViewInit) {
        this.initialize();
      }
    }
  }

  public ngAfterViewInit(): void {

    this.hasViewInit = true;

    if (this.state != null) {
      this.initialize();
    }

  }

  public initialize(): void {

    setTimeout(() => {

      if (this.state.container.useWindowSize) {
        const element = document.getElementById("smz-svg-container");
        const size = element.getBoundingClientRect();

        this.state.container.width = size.width;
        this.state.container.height = size.height;
      }

      this.setupContainer();
      this.setupRoot();
      this.setupPins();

      if (this.state.isDebug) {
        this.buildGrid();
      }

      this.hookEvents();

    }, 0);

  }

  private setupContainer(): void {

    // Draw the map
    this.draw = SVG('<svg></svg>') as SmzSVGWrapper;

    this.draw.addTo('#smz-svg-map');

    this.draw.size(this.state.container.width, this.state.container.height);
    this.draw.x(0);
    this.draw.y(0);
    this.draw.viewbox(0, 0, this.state.container.width, this.state.container.height);

    this.draw.zoom(1);

    if (this.state.panZoom.enabled) {
      this.draw.panZoom(this.state.panZoom);
    }

    if (this.state.isDebug) {
      this.draw.addClass('border-2 border-red-500 border-solid');
    }

  }


  private setupRoot(): void {

    const rootFeature = this.state.features.find(x => x.type === 'root') as SmzSvgRoot;

    const root = this.draw.svg(rootFeature.svgData);
    root.node.lastElementChild.setAttribute('id', rootFeature.id);

    this.draw
      .find(`#${rootFeature.id}`)
      .each(element => {
        element
          .size(rootFeature.width, rootFeature.height)
          .center(this.state.container.width / 2, this.state.container.height / 2);

        if (this.state.isDebug) {
          element.addClass('border-2 border-red-400 border-solid');
        }
      });

    // const that = this;

    // loop over all regions
    for (const region of root.find('path')) {

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

  }

  public setupPins(): void {

    const pins = this.state.features.filter(x => x.type === 'pin') as SmzSvgPin[];

    this.pins = pins;

    pins.forEach(pin => {
      const svg = this.draw.svg(pin.svgData)
      svg.node.lastElementChild.setAttribute('id', pin.id);

      this.draw
        .find(`#${pin.id}`)
        .each(element => {
          element
            .fill({ color: pin.color, opacity: 1 })
            .size(pin.width)
            .center(pin.position.x, pin.position.y)

          if (pin.tooltip.enabled) {
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

  public addToolTip(element: SmzSVGWrapper, tooltip: SmzSvgTooltipData): void {

    const that = this;

    element
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
      })
      ;
  }

  public buildGrid(): void {

    const rootFeature = this.state.features.find(x => x.type === 'root') as SmzSvgRoot;

    const gap = 30;
    const size = 5;
    let startX = 0;
    let endX = 0;
    let startY = 0;
    let endY = 0;

    this.draw
      .find(`#${rootFeature.id}`)
      .each(element => {
        startX = element.x() as number;
        endX = startX + (element.width() as number);

        startY = element.y() as number;
        endY = startY + (element.height() as number);
      });

    if (this.state.isDebug) {
      console.log(`startX: ${startX}`);
      console.log(`endX: ${endX}`);
      console.log(`startY: ${startY}`);
      console.log(`endY: ${endY}`);
    }

    const that = this;

    for (let i = startX; i < endX; i += gap) {
      for (let j = startY; j < endY; j += gap) {
        this.draw
          .circle(size)
          .center(i, j)
          .data('key', { x: i, y: j })
          .data('text', 'Teste')
          .addClass('cursor-pointer')
          .fill({ color: 'black' })
          .mouseover(function (this: SmzSVGWrapper, event) {

            if (!that.isPanning) {
              this.fill({ color: 'red' });
              that.show(event, `Point: ${JSON.stringify(this.data('key'))}`);
            }

          })
          .mouseout(function (this: SmzSVGWrapper) {

            if (!that.isPanning) {
              this.fill({ color: 'black' });
              that.hide();
            }

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

    if (!this.overlayPanel.render) {
      this.overlayPanel.show(event);
    }

  }

  public hide(): void {

    if (this.overlayPanel.render) {
      this.overlayPanel.hide();
    }

  }

  public adjustPinScale(zoomEvent: any): void {

    const zoom = zoomEvent.detail.level;

    this.state.features
      .filter(x => x.adaptative.enabled)
      .forEach(pin => {

        this.draw
          .find(`#${pin.id}`)
          .each(element => {

            const newScale = 1 / zoom;
            const newWidth = pin.width * newScale;
            const width = (newWidth > pin.adaptative.maxWidth) ? pin.adaptative.maxWidth : ((newWidth < pin.adaptative.minWidth) ? pin.adaptative.minWidth : newWidth);

            element
              .size(width)
              .center(pin.position.x, pin.position.y);

          })

      });
  }
}