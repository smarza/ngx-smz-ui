import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Element } from '@svgdotjs/svg.js';
import { SVG } from '@svgdotjs/svg.js';
import { SmzSVGWrapper } from 'ngx-smz-ui';

@Component({
    selector: 'app-svg-playground',
    template: `
  <div>Playground Works !!</div>

  <div class="grid grid-nogutter gap-2">
    <button pButton type="button" class="p-button p-button-ghost" label="TEST" (click)="test()"></button>
    <button pButton type="button" class="p-button p-button-ghost" label="RESET" (click)="center()"></button>
    <button pButton type="button" class="p-button p-button-ghost" label="BRA612" (click)="zoomToId('BRA612', 1)"></button>
    <button pButton type="button" class="p-button p-button-ghost" label="BRA670 * 0.6" (click)="zoomToId('BRA670', 0.6)"></button>
    <button pButton type="button" class="p-button p-button-ghost" label="BRA670 * 1" (click)="zoomToId('BRA670', 1)"></button>
    <button pButton type="button" class="p-button p-button-ghost" label="BRA629" (click)="zoomToId('BRA629', 1)"></button>
    <button pButton type="button" class="p-button p-button-ghost" label="POSITION 0.1" (click)="zoomToPosition(125, 125, 0.1)"></button>
    <button pButton type="button" class="p-button p-button-ghost" label="POSITION 1" (click)="zoomToPosition(125, 125, 1)"></button>
    <button pButton type="button" class="p-button p-button-ghost" label="POSITION 2" (click)="zoomToPosition(125, 125, 2)"></button>
  </div>

  <div>SVG</div>

  <div style="width: {{width}}px; height: {{height}}px;">
    <svg class="w-full h-full border-2 border-solid border-red-300" id="canvas"></svg>
  </div>

  `,
    standalone: false
})

export class SvgPlaygroundComponent implements OnInit, AfterViewInit {

  public draw: SmzSVGWrapper;
  public width = 500;
  public height = 500;
  constructor(private http: HttpClient) { }

  public ngOnInit(): void { }

  public ngAfterViewInit(): void {

    this.draw = SVG('#canvas') as SmzSVGWrapper;

    this.draw.size(this.width, this.height);

    this.draw.viewbox(0, 0, this.width, this.height);

    this.draw.zoom(1);
    this.draw.panZoom();

    const headers = new HttpHeaders();
    headers.set('Accept', 'image/svg+xml');

    const file = 'assets/SVG/Artboard 1.svg';
    const id = 'svg-playground';
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

          this.addLabels();

          this.hookEvents();
        }
      })

  }

  public center(): void {
    this.draw.animate().viewbox(0, 0, this.width, this.height);
  }

  public test(): void {
    this.draw.animate().viewbox(125, 125, 250, 250);
  }

  public zoomToId(elementId: string, factor: number): void {

    try {
      let element;

      this.draw
        .find(`#${elementId}`)
        .each(item => {
          element = item;
        });

      const relativeViewbox = element.rbox(this.draw);
      const newViewBox = this.applyZoomFactor(relativeViewbox.x, relativeViewbox.y, relativeViewbox.w, relativeViewbox.h, factor);
      console.log('newViewBox', newViewBox);
      this.draw.animate().viewbox(newViewBox.x, newViewBox.y, newViewBox.width, newViewBox.height);

    } catch (error) {
      console.log(`Cant't execute zoomToId Event`, elementId, error);
    }

  }

  public zoomToPosition(x: number, y: number, factor: number): void {
    try {

      const newViewBox = this.applyZoomFactor(x, y, this.width / 4, this.height / 4, factor);
      console.log(`x: ${x}, y: ${y}, factor: ${factor}`);
      console.log('newViewBox', newViewBox);
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
      console.log('>');
      return { x: x - ((w - width) / 2), y: y - ((h - height) / 2), width: w, height: h }
    }
    else {
      console.log('<');
      return { x: x + ((width - w) / 2), y: y + ((height - h) / 2), width: w, height: h }
    }

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

  public hookEvents(): void {

    // this.draw.on('panStart', (event) => {
    //   console.log('------- panStart event', this.draw.viewbox());
    // });

    // this.draw.on('panEnd', (event) => {
    //   console.log('------- panEnd event', this.draw.viewbox());
    // });

    // this.draw.on('zoom', (event) => {
    //   console.log('zoom event', event);
    // });

    // this.draw.on('panning', (box) => {
    //   console.log('panning event', box);
    // });
  }

}
