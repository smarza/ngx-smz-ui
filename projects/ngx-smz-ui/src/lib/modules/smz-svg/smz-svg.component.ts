import { Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { SmzSVGWrapper } from './models/smz-svg-wrapper';
import { SmzSvgState, SmzSvgPin, SmzSvgRoot, SmzSvgTooltipData, SmzSvgFeature, SmzSvgBaseFeature } from './models/smz-svg';

import { SVG } from '@svgdotjs/svg.js';
import '@svgdotjs/svg.panzoom.js';
import { OverlayPanel } from '../prime/overlaypanel/overlaypanel';
import { filter } from 'rxjs';
import { isEmpty } from '../../builders/common/utils';
import { Container, Element } from '@svgdotjs/svg.js';
import { GetElementById } from './utils/smz-svg-helper';
import { Wait } from '../../common/utils/utils';

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

      this.updateScopes(this.state.scope.current);

      this.setupDispatchListeners();

      setTimeout(() => {
        this.state.init.afterInit();
      }, 0);
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

    if (this.state.init.reset) {
      this.reset();
    }

  }

  public reset(): void {
    if (this.state.isDebug) {
      console.log('Resetting svg position');
    }

    this.draw.animate(this.state.performance.animationTime).viewbox(0, 0, this.state.container.width, this.state.container.height);

    setTimeout(() => {
      this.adjustPinScale2();
    }, this.state.performance.animationTime);

  }

  public updateScopes(scopes: string[]): void {

    // HIDE ALL
    this.state.features
      .filter(x => x.scopes != null)
      .forEach(feature => {
        GetElementById(this.draw, `PIN_${feature.id}`)?.hide();
        feature._visible = false;
      });

    // TO SHOW
    this.state.features
      .filter(x => x.scopes != null && scopes.some(scope => x.scopes.includes(scope)))
      .forEach(feature => {
        GetElementById(this.draw, `PIN_${feature.id}`)?.show();
        feature._visible = true;
      });

    this.state.scope.current = scopes;

  }

  private setupDispatchListeners(): void {
    let isFirst = true;
    this.state.dispatch.zoomToId.pipe(filter(x => x != null)).subscribe((event) => { this.zoomToId(event.elementId, event.zoom) });
    this.state.dispatch.zoomToPosition.pipe(filter(x => x != null)).subscribe((event) => { this.zoomToPosition(event.x, event.y, event.zoom) });
    this.state.dispatch.draw.pipe(filter(x => x != null)).subscribe((event) => { event.callback(this.draw); });
    this.state.dispatch.reset.subscribe(() => {
      if (!isFirst) {
        this.reset();
      }
      isFirst = false;
    });
    this.state.dispatch.setScopes.pipe(filter(x => x != null)).subscribe((scopes) => { this.updateScopes(scopes); });
  }

  public zoomToId(elementId: string, factor: number): void {

    try {
      const featureById = this.state.features.findIndex(x => x.id === elementId);
      const feature = featureById != -1 ? this.state.features[featureById] : this.state.features.find(x => x._childrenIds.some(id => id === elementId));

      if (feature == null) {
        if (this.state.isDebug) {
          console.warn(`SVG > zoomToId > Elemento com ${elementId} não foi encontrado.`, feature);
        }
        return;
      }

      if (!feature._visible) {
        if (this.state.isDebug) {
          console.warn(`SVG > zoomToId > Elemento com ${elementId} não está visível.`, feature);
        }
        return;
      }

      let element;

      if (featureById != -1) {
        // O Id é da propria feature.
        element = feature._element;
      }
      else {
        // O Id provavelmente é de algum elemento dentro da feature.
        feature._element
        .find(`#${elementId}`)
        .each(item => {
          element = item;
        });
      }

      // Nenhum elemento encontrado.
      if (element == null) {
        if (this.state.isDebug) {
          console.warn(`SVG > zoomToId > Nenhum elemento encontrado para o id ${elementId}`, feature);
        }
        return;
      }

      const relativeViewbox = element.rbox(this.draw);

      const newViewBox = this.applyZoomFactor(relativeViewbox.x, relativeViewbox.y, relativeViewbox.w, relativeViewbox.h, factor);
      this.draw.animate(this.state.performance.animationTime).viewbox(newViewBox.x, newViewBox.y, newViewBox.width, newViewBox.height);

      setTimeout(() => {
        this.adjustPinScale2();
      }, this.state.performance.animationTime);

    } catch (error) {
      console.log(`Cant't execute zoomToId Event`, elementId, error);
    }

  }

  public zoomToPosition(x: number, y: number, factor: number): void {
    try {

      const newViewBox = this.applyZoomFactor(x, y, this.state.container.width / 4,  this.state.container.height / 4, factor);

      this.draw.animate(this.state.performance.animationTime).viewbox(newViewBox.x, newViewBox.y, newViewBox.width, newViewBox.height);

      setTimeout(() => {
        this.adjustPinScale2();
      }, this.state.performance.animationTime);

    } catch (error) {
      console.log(`Cant't execute zoomToPosition Event`, x, y, error);
    }

  }

  private normalizeFactor(input: number): number {
    return 1 / input;
  }

  private convertFactorToZoom(factor: number): number {
    return (1 / factor);
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

  public updateChildrenIds(feature: SmzSvgBaseFeature): void {
    feature._childrenIds = [];
    feature._childrenIds.push(feature._element.id());
    this.recursive(feature._childrenIds, feature._element);
  }

  public recursive(ids: string[], element: Element): void {
    let children = element.children();

    children?.forEach(child => {
      ids.push(child.id());

      if (child.children()?.length > 0) {
        this.recursive(ids, child);
      }
    })

  }

  private setupRoot(): void {

    const rootFeature = this.state.features.find(x => x.type === 'root') as SmzSvgRoot;

    const root = this.draw.svg(rootFeature.svgData);
    root.node.lastElementChild.setAttribute('id', `PIN_${rootFeature.id}`);

    this.draw
    .find(`#PIN_${rootFeature.id}`)
    .each(element => {

      rootFeature._element = element;
      this.updateChildrenIds(rootFeature);

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

    if (feature.scopes?.length > 0) {
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

    feature.isDisabled = false;

  }

  private getRootContainer() {
    const rootFeature = this.state.features.find(x => x.type === 'root') as SmzSvgRoot;

    let startX = 0;
    let endX = 0;
    let startY = 0;
    let endY = 0;

    const element = rootFeature._element;

    startX = element.x() as number;
    endX = startX + (element.width() as number);

    startY = element.y() as number;
    endY = startY + (element.height() as number);

    return [ startX, endX, startY, endY ] as const;
  }

  public setupPins(): void {

    const pins = this.state.features.filter(x => x.type === 'pin') as SmzSvgPin[];
    const root = this.state.features.find(x => x.type == 'root');

    this.pins = pins;

    const [startX, endX, startY, endY ] = this.getRootContainer();

    pins.forEach(pin => {
      pin.isDisabled = true;

      if (pin.dynamicBuild?.callback != null) {

        const container = this.draw.findOne(`#PIN_${root.id}`) as Container;

        const pinElement = pin.dynamicBuild.callback(container, pin);

        if (pinElement.node.lastElementChild == null) {
          pinElement.node.setAttribute('id', `PIN_${pin.id}`);
        }
        else {
          pinElement.node.lastElementChild.setAttribute('id', `PIN_${pin.id}`);
        }

        const elements = this.draw.find(`#PIN_${pin.id}`);

        if (elements.length === 0) {
          throw new Error(`You cannot return a null element at the setDynamicPosition Callback.`);
        }

        elements.each(element => {
            pin._element = element;
            this.updateChildrenIds(pin);
            this.setupFeature(pin, pin._element as SmzSVGWrapper);
          });

      }
      else {
        const svg = this.draw.svg(pin.svgData)
        svg.node.lastElementChild.setAttribute('id', `PIN_${pin.id}`);

        this.draw
          .find(`#PIN_${pin.id}`)
          .each(element => {

            pin._element = element;
            this.updateChildrenIds(pin);

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
      }

    });

  }

  public hookEvents(): void {

    this.draw.on('panStart', (event) => {
      this.isPanning = true;
      this.hide();
    });

    this.draw.on('panEnd', (event) => { this.isPanning = false; });

    const WaitZoom = new Wait();

    this.draw.on('zoom', (event) => WaitZoom.throttle(() => {
      // this.adjustPinScale1((event as any).detail.level);
      this.adjustPinScale2();
    }, this.state.performance.zoomDebounce));

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

    const rootFeature = this.state.features.find(x => x.type === 'root') as SmzSvgRoot;

    const gap = 30;
    const size = 5;

    const [startX, endX, startY, endY] = this.getRootContainer();
    // console.log('root', startX, endX, startY, endY);
    const that = this;

    for (let i = startX; i < endX; i += gap) {
      for (let j = startY; j < endY; j += gap) {
        const circle = this.draw.circle(size).center(i, j);
        const relative = circle.rbox(rootFeature._element);

        circle
          .data('key', { x: i, y: j })
          .data('text', 'Teste')
          .addClass('cursor-pointer')
          .fill({ color: 'black' })
          .mouseover(function (this: SmzSVGWrapper, event) {

            if (!that.isPanning) {
              this.fill({ color: 'red' });
              that.show(event, `Point: ${JSON.stringify(this.data('key'))} | Relative => cx: ${relative.cx} ; cy: ${relative.cy}`);
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

  public adjustPinScale1(zoom: number): void {
    if (this.state.isDebug) {
      console.log(`adjustPinScale1 = ${zoom}`);
    }

    const [startX, endX, startY, endY ] = this.getRootContainer();

    this.state.features
      .filter(x => x.adaptative.enabled)
      .forEach(pin => {

        const element = pin._element;

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

      });
  }

  public adjustPinScale2(): void {

    const [startX, endX, startY, endY ] = this.getRootContainer();

    if (this.state.isDebug) {
      console.log(` ` );
      console.log(`adjustPinScale2 #####` );
      console.log(`adjustPinScale2`, startX, endX, startY, endY );

      const viewbox = this.draw.viewbox();
      console.log('-viewbox', viewbox);
    }

    this.state.features
      .filter(x => x.adaptative.enabled)
      .forEach(pin => {

        const element = pin._element;

        const relative = element.rbox().w;
        if (this.state.isDebug) console.log('   > relative', relative);

        const width = pin.width;
        if (this.state.isDebug) console.log('   > width', width);

        const factor = relative / width;
        if (this.state.isDebug) console.log('   > factor', factor);

        if (relative > pin.adaptative.maxWidth) {
          // Manter tamanho máximo
          element.size(pin.adaptative.maxWidth / factor);
        }
        else if (relative < pin.adaptative.minWidth) {
          // Manter tamanho mínimo
          element.size(pin.adaptative.minWidth / factor);
        }
        else {
          // Deixar como está
        }

        switch (pin.anchor) {
          case 'root':
            element.center(startX + pin.position.x, startY + pin.position.y);
            break;

          case 'container':
            element.center(pin.position.x, pin.position.y);
            break;
        }

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