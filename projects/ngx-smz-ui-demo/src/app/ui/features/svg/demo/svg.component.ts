import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { SmzSvgComponent, SmzSvgState, SmzSvgPin, SmzSvgBuilder, SmzSvgFeature, SmzSVGWrapper, SmzSvgRoot } from 'ngx-smz-ui';
import { Container, Point } from '@svgdotjs/svg.js';

@Component({
  selector: 'app-svg',
  templateUrl: `svg.component.html`,
})
export class SvgComponent implements OnInit, AfterViewInit {
  @ViewChild(SmzSvgComponent) public smzSvgComponent: SmzSvgComponent;
  public state: SmzSvgState;
  public mapData$: Observable<SmzSvgState>;

  constructor(private http: HttpClient) {
    const headers = new HttpHeaders();
    headers.set('Accept', 'image/svg+xml');

    this.mapData$ = this.http
      .get('assets/br-center.svg', { headers, responseType: 'text' })
      .pipe(
        map((svg: string) => {

          const locationPin = `<?xml version="1.0" encoding="utf-8"?>
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             viewBox="0 0 384 512" style="enable-background:new 0 0 384 512;" xml:space="preserve">
          <path d="M384,192c0,87.4-117,243-168.3,307.2c-12.3,15.3-35.1,15.3-47.4,0C116.1,435,0,279.4,0,192C0,86,86,0,192,0
            C298,0,384,86,384,192L384,192z"/>
          </svg>`;

          const [ width, height ] = [ 500, 500 ];

          const stateBuilder: SmzSvgBuilder = new SmzSvgBuilder()
            // .debugMode()
            .setContainerStyles('absolute inset-0 overflow-hidden bg-sky-500')
            .useMouseZoom(0.5, 10, 0.25)
            .usePan()
            .feature()
              .root(svg, width, height)
                .transform((feature: SmzSvgRoot, draw: SmzSVGWrapper) => {
                  const root = draw.findOne(`#${feature.id}`) as Container;

                  for (const region of root.find('path')) {

                    // paint each region blue
                    region
                      .fill('#15803d')
                      .addClass('cursor-pointer')
                      .mouseover(function (this: SmzSVGWrapper, event) {
                        this.fill({ color: '#f06' });
                      })
                      .mouseout(function (this: SmzSVGWrapper) {
                        this.fill({ color: '#15803d' });
                      })
                      .click((event) => {
                        this.state.dispatch.zoomToId.next({ elementId: region.node.id, zoom: 0.7 });
                      });

                    // add a label to the center of each region
                    const relativeViewbox = region.rbox(draw);

                    draw
                      .text(`${region.id()}`)
                      .font({ size: '3px', family: 'Open Sans' })
                      .fill({ color: 'white', opacity: 1 })
                      .stroke({ color: '#f06', opacity: 1, width: 0 })
                      .center(relativeViewbox.cx, relativeViewbox.cy);
                  }
                })
                .feature
              .for(this.makeGhostPin(50), (_, item: SmzSvgPin) =>
                _
                .pin(item.svgData, item.width)
                  .setColor(item.color)
                  .setPosition(item.position.x, item.position.y)
                  .setAnchor(item.anchor)
                  .useTooltip(item.tooltip.data)
                  .useAdaptative(item.adaptative.minWidth, item.adaptative.maxWidth)
                  .feature
                )
                .pin(locationPin, 20)
                  .setColor('#FFEB3B')
                  .setPosition(0, 0)
                  .setAnchor('root')
                  .useTooltip('Este é o pin do canto superior esquerdo')
                  .useAdaptative(5, 50)
                  .feature
                .pin(locationPin, 20)
                  .setColor('red')
                  .setPosition(width / 2, height / 2)
                  .setAnchor('root')
                  .useTooltip('Este é o pin central')
                  .useAdaptative(5, 50)
                  .feature
              .svg

          this.state = stateBuilder.build();

          return this.state;
        })
      )
  }

  public ngOnInit(): void {
  }

  public reset(): void {
    this.state.dispatch.reset.next();
  }

  public moveToId(elementId: string): void {
    this.state.dispatch.zoomToId.next({ elementId, zoom: 0.7 });
  }

  public moveToPosition(): void {
    this.state.dispatch.zoomToPosition.next({ x: 500, y: 500, zoom: 1 });
  }

  ngAfterViewInit(): void {
  }

  public makeGhostPin(count: number): SmzSvgPin[] {

    const ghost = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M186.1 .1032c-105.1 3.126-186.1 94.75-186.1 199.9v264c0 14.25 17.3 21.38 27.3 11.25l24.95-18.5c6.625-5.001 16-4.001 21.5 2.25l43 48.31c6.25 6.251 16.37 6.251 22.62 0l40.62-45.81c6.375-7.251 17.62-7.251 24 0l40.63 45.81c6.25 6.251 16.38 6.251 22.62 0l43-48.31c5.5-6.251 14.88-7.251 21.5-2.25l24.95 18.5c10 10.13 27.3 3.002 27.3-11.25V192C384 83.98 294.9-3.147 186.1 .1032zM128 224c-17.62 0-31.1-14.38-31.1-32.01s14.38-32.01 31.1-32.01s32 14.38 32 32.01S145.6 224 128 224zM256 224c-17.62 0-32-14.38-32-32.01s14.38-32.01 32-32.01c17.62 0 32 14.38 32 32.01S273.6 224 256 224z"/></svg>';

    const results: SmzSvgPin[] = [];

    for (let i = 0; i < count; i++) {
      const x = Math.floor(Math.random() * 1000) + 1;
      const y = Math.floor(Math.random() * 1000) + 1;
      const id = `pin_${i}`;

      results.push({
        type: 'pin',
        id,
        svgData: ghost,
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        position: { x, y },
        anchor: 'container',
        width: 20,
        adaptative: { enabled: true, minWidth: 10, maxWidth: 50 },
        tooltip: { enabled: true, data: `Conteúdo para pin: ${id}` },
        transform: null
      });

    }

    return results;
  }

}
