import { Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { SmzSVGWrapper } from './models/smz-svg-wrapper';
import { SmzSvgState, SmzSvgPin, SmzSvgRoot, SmzSvgTooltipData, SmzSvgFeature } from './models/smz-svg';

import { SVG } from '@svgdotjs/svg.js';
import '@svgdotjs/svg.panzoom.js';
import { OverlayPanel } from '../prime/overlaypanel/overlaypanel';
import { filter } from 'rxjs';
import { isEmpty } from '../../builders/common/utils';
import { Container } from '@svgdotjs/svg.js';
import { GetElementsByParentId } from './utils/smz-svg-helper';

@Component({
  selector: 'smz-svg',
  templateUrl: 'smz-svg.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})

export class SmzSvgComponent implements OnChanges, AfterViewInit, OnDestroy {
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
      this.setupDispatchListeners();

    }, 0);

  }

  private setupContainer(): void {

    // Draw the map
    this.draw = SVG('<svg></svg>') as SmzSVGWrapper;

    this.draw.addTo('#smz-svg-map');

    this.draw.size(this.state.container.width, this.state.container.height);

    this.draw.zoom(1);

    if (this.state.panZoom.enabled) {
      this.draw.panZoom(this.state.panZoom);
    }

    if (this.state.isDebug) {
      this.draw.addClass('border-2 border-red-500 border-solid');
    }

    this.reset();

  }

  public reset(): void {
    this.draw.animate().viewbox(0, 0,  this.state.container.width, this.state.container.height);
  }

  public updateScopes(scopes: string[]): void {

    // TO SHOW
    this.state.features
      .filter(x => scopes.some(scope => scope === x.scope))
      .forEach(feature => {
        GetElementsByParentId(this.draw, feature.id)
          .forEach(element => element.show())
      });

    // TO HIDE
    this.state.features
      .filter(x => scopes.every(scope => scope !== x.scope))
      .forEach(feature => {
        GetElementsByParentId(this.draw, feature.id)
          .forEach(element => element.hide())
      });
  }

  private setupDispatchListeners(): void {
    this.state.dispatch.zoomToId.pipe(filter(x => x != null)).subscribe((event) => { this.zoomToId(event.elementId, event.zoom) });
    this.state.dispatch.zoomToPosition.pipe(filter(x => x != null)).subscribe((event) => { this.zoomToPosition(event.x, event.y, event.zoom) });
    this.state.dispatch.draw.pipe(filter(x => x != null)).subscribe((event) => { event.callback(this.draw); });
    this.state.dispatch.reset.pipe(filter(x => x !== null)).subscribe(() => { this.reset(); });
    this.state.dispatch.setScopes.pipe(filter(x => x !== null)).subscribe((scopes) => { this.updateScopes(scopes); });
  }

  public zoomToId(elementId: string, factor: number): void {

    try {
      let element;

      this.draw
        .find(`#PIN_${elementId}`)
        .each(item => {
          element = item;
        });

      const relativeViewbox = element.rbox(this.draw);

      const newViewBox = this.applyZoomFactor(relativeViewbox.x, relativeViewbox.y, relativeViewbox.w, relativeViewbox.h, factor);
      this.draw.animate().viewbox(newViewBox.x, newViewBox.y, newViewBox.width, newViewBox.height);

    } catch (error) {
      console.log(`Cant't execute zoomToId Event`, elementId, error);
    }

  }

  public zoomToPosition(x: number, y: number, factor: number): void {
    try {

      const newViewBox = this.applyZoomFactor(x, y, this.state.container.width / 4,  this.state.container.height / 4, factor);

      this.draw.animate().viewbox(newViewBox.x, newViewBox.y, newViewBox.width, newViewBox.height);

    } catch (error) {
      console.log(`Cant't execute zoomToPosition Event`, x, y, error);
    }

  }

  private normalizeFactor(input: number): number {
    return 1 / input;
  }

  private applyZoomFactor(x: number, y: number, width: number, height: number, factor: number): { x: number, y: number, width: number, height: number } {
    factor = this.normalizeFactor(factor);

    const w =  width * factor;
    const h =  height * factor;

    if (factor > 1) {
      return { x: x - ((w - width) / 2), y: y - ((h - height) / 2), width: w, height: h }
    }
    else {
      return { x: x + ((width - w) / 2), y: y + ((height - h) / 2), width: w, height: h }
    }

  }

  private setupRoot(): void {

    const rootFeature = this.state.features.find(x => x.type === 'root') as SmzSvgRoot;

    const root = this.draw.svg(rootFeature.svgData);
    root.node.lastElementChild.setAttribute('id', `PIN_${rootFeature.id}`);

    this.draw
      .find(`#PIN_${rootFeature.id}`)
      .each(element => {
        element
          .size(rootFeature.width, rootFeature.height)
          .center(this.state.container.width / 2, this.state.container.height / 2);

        if (this.state.isDebug) {
          element.addClass('border-2 border-red-400 border-solid');
        }
      });

    this.setupFeature(rootFeature, root);

  }

  private setupFeature(feature: SmzSvgFeature, svg: SmzSVGWrapper): void {

    const that = this;

    if (feature.transform != null){
      const container = this.draw.findOne(`#PIN_${feature.id}`) as Container;
      feature.transform(container, `PIN_${feature.id}`, feature, svg);
    }

    if (!isEmpty(feature.styleClass)) {
      svg.addClass(feature.styleClass);
    }

    if (!isEmpty(feature.color)) {
      svg.fill(feature.color);
    }

    if (!isEmpty(feature.stroke)) {
      svg.stroke(feature.stroke);
    }

    if (feature.scope != null) {
      svg.hide();
    }

    if (feature.highlight?.enabled) {
      svg
        .mouseover(function (this: SmzSVGWrapper, event) { this.fill({ color: feature.highlight.color }) })
        .mouseout(function (this: SmzSVGWrapper) { this.fill({ color: feature.color }) });
    }

    if (feature.click?.enabled) {

      if (feature.click.callback != null) {
        svg.click(function (this: SmzSVGWrapper, event) {
          feature.click.callback(feature.id, svg, feature.data);

          if (feature.click.navigate) {
            that.state.dispatch.zoomToId.next({ elementId: feature.id, zoom: feature.focus.zoom });
          }
        });
      }
      else {
        svg.click(function (this: SmzSVGWrapper, event) {
          if (feature.click.navigate) {
            that.state.dispatch.zoomToId.next({ elementId: feature.id, zoom: feature.focus.zoom });
          }
        });
      }

    }

    if (feature.dbClick?.enabled) {

      if (feature.dbClick.callback != null) {
        svg.dblclick(function (this: SmzSVGWrapper, event) {
          feature.dbClick.callback(feature.id, svg, feature.data);

          if (feature.dbClick.navigate) {
            that.state.dispatch.zoomToId.next({ elementId: feature.id, zoom: feature.focus.zoom });
          }
        });
      }
      else {
        svg.dblclick(function (this: SmzSVGWrapper, event) {
          if (feature.dbClick.navigate) {
            that.state.dispatch.zoomToId.next({ elementId: feature.id, zoom: feature.focus.zoom });
          }
        });
      }
    }

    if (feature.tooltip?.enabled) {
      this.addToolTip(svg, feature.tooltip);
    }

  }

  private getRootContainer() {
    const rootFeature = this.state.features.find(x => x.type === 'root') as SmzSvgRoot;

    let startX = 0;
    let endX = 0;
    let startY = 0;
    let endY = 0;

    this.draw
      .find(`#PIN_${rootFeature.id}`)
      .each(element => {
        startX = element.x() as number;
        endX = startX + (element.width() as number);

        startY = element.y() as number;
        endY = startY + (element.height() as number);
      });

    return [ startX, endX, startY, endY ] as const;
  }

  public setupPins(): void {

    const pins = this.state.features.filter(x => x.type === 'pin') as SmzSvgPin[];

    this.pins = pins;

    const [startX, endX, startY, endY ] = this.getRootContainer();

    pins.forEach(pin => {
      const svg = this.draw.svg(pin.svgData)
      svg.node.lastElementChild.setAttribute('id', `PIN_${pin.id}`);

      this.draw
        .find(`#PIN_${pin.id}`)
        .each(element => {

          element
            .fill({ color: pin.color, opacity: 1 })
            .size(pin.width);

            switch (pin.anchor) {
              case 'root':
                element.center(startX + pin.position.x, startY + pin.position.y);
                break;

              case 'container':
                element.center(pin.position.x, pin.position.y);
                break;
            }

          this.setupFeature(pin, element as SmzSVGWrapper);
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
        if (!that.isPanning) {
          that.show(event, tooltip.data);
        }

      })
      .mouseout(function (this: SmzSVGWrapper) {
        if (!that.isPanning) {
          that.hide();
        }
      })
      ;
  }

  public buildGrid(): void {

    const gap = 30;
    const size = 5;

    const [startX, endX, startY, endY ] = this.getRootContainer();

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

    const [startX, endX, startY, endY ] = this.getRootContainer();

    this.state.features
      .filter(x => x.adaptative.enabled)
      .forEach(pin => {

        this.draw
          .find(`#PIN_${pin.id}`)
          .each(element => {

            const newScale = 1 / zoom;
            const newWidth = pin.width * newScale;
            const width = (newWidth > pin.adaptative.maxWidth) ? pin.adaptative.maxWidth : ((newWidth < pin.adaptative.minWidth) ? pin.adaptative.minWidth : newWidth);

            element.size(width);

            switch (pin.anchor) {
              case 'root':
                element.center(startX + pin.position.x, startY + pin.position.y);
                break;

              case 'container':
                element.center(pin.position.x, pin.position.y);
                break;
            }

          })

      });
  }

  public ngOnDestroy(): void {
    this.state.dispatch.zoomToId.unsubscribe();
    this.state.dispatch.zoomToPosition.unsubscribe();
    this.state.dispatch.draw.unsubscribe();
    this.state.dispatch.reset.unsubscribe();
    this.state.dispatch.setScopes.unsubscribe();
  }
}