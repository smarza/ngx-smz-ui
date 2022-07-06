import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Point } from '@svgdotjs/svg.js';
import { NumberAlias } from '@svgdotjs/svg.js';
import { Container, Element } from '@svgdotjs/svg.js';
import { SVG } from '@svgdotjs/svg.js';
import { SmzSVGWrapper } from 'ngx-smz-ui';
import * as SvgPanZoom from 'svg-pan-zoom';

@Component({
  selector: 'app-svg-gcab',
  template: `
  <div>Playground Works !!</div>

  <div class="grid grid-nogutter gap-2">
    <button pButton type="button" class="p-button p-button-ghost" label="RESET" (click)="center()"></button>
    <!-- <button pButton type="button" class="p-button p-button-ghost" label="ZOOM 0, 0" (click)="zoom(1, { x: 0, y: 0 })"></button> -->
    <button pButton type="button" class="p-button p-button-ghost" label="ZOOM 3 CENTER 250, 250" (click)="zoom(3, { x: 250, y: 250 })"></button>
    <button pButton type="button" class="p-button p-button-ghost" label="ZOOM 5 CENTER 250, 250" (click)="zoom(5, { x: 250, y: 250 })"></button>
    <button pButton type="button" class="p-button p-button-ghost" label="ZOOM 10 CENTER 250, 250" (click)="zoom(10, { x: 250, y: 250 })"></button>

    <button pButton type="button" class="p-button p-button-ghost" label="ZOOM 500, 500" (click)="zoom(6, { x: 500, y: 500 })"></button>
  </div>

  <div>SVG</div>

  <div style="width: {{width}}px; height: {{height}}px;">
    <svg class="w-full h-full border-2 border-solid border-red-300" id="canvas"></svg>
  </div>

  `
})

export class SvgGcabComponent implements OnInit, AfterViewInit {

  public draw: SmzSVGWrapper;
  public width = 1000;
  public height = 500;
  constructor(private http: HttpClient) { }

  public ngOnInit(): void { }

  public ngAfterViewInit(): void {

    this.draw = SVG('#canvas') as SmzSVGWrapper;

    this.draw.size(this.width, this.height);

    this.draw.viewbox(0, 0, this.width, this.height);

    this.draw.zoom(1);
    this.draw.panZoom();

    console.log(this.draw.bbox());
    const headers = new HttpHeaders();
    headers.set('Accept', 'image/svg+xml');

    const file = 'assets/drawio1.svg';
    const id = 'svg-gcab';
    this.http
      // .get('assets/br-center.svg', { headers, responseType: 'text' })
      .get(file, { headers, responseType: 'text' })
      .subscribe((svg: string) => {

        const root = this.draw.svg(svg);
        root.node.lastElementChild.setAttribute('id', id);

        const svgElement = this.draw.findOne(`#${id}`) as Element;

        if (svgElement != null) {
          svgElement
            .size(this.width, this.height)
            .center(this.width / 2, this.height / 2);

        }

        console.log(this.draw.bbox());
      })

  }

  public center(): void {
    const newPoint = new Point(this.width / 2, this.height / 2);
    this.draw.zoom(1).animate().zoom(1, newPoint);
  }

  public zoom(level: NumberAlias, point?: { x: number, y: number }): void {

    if (point != null) {
      const newPoint = new Point(point.x, point.y);
      this.draw?.animate().zoom(level, newPoint);
    }
    else {
      this.draw?.animate().zoom(level);
    }

    console.log(this.draw);
  }

  private addLabels(): void {
    for (const region of this.draw.find('path')) {

      // add a label to the center of each region
      const viewbox = region.bbox();
      const relativeViewbox = region.rbox(this.draw);

      this.draw
        .text(`${region.id()}`)
        // .text(`${region.id()} cx: ${viewbox.cx}, cy: ${viewbox.cy}`)
        // .text(`${region.id()} x: ${viewbox.x}, y: ${viewbox.y}, cx: ${viewbox.cx}, cy: ${viewbox.cy}`)
        // .text(`${region.id()}cx r: ${relativeViewbox.cx}, cx bbox: ${viewbox.cx}`)
        .font({ size: '0.5em', family: 'Open Sans' })
        // .addClass('cursor-pointer')
        .fill({ color: 'white', opacity: 1 })
        .stroke({ color: '#f06', opacity: 1, width: 0 })
        .center(relativeViewbox.cx, relativeViewbox.cy);
    }
  }

}
