import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Point } from '@svgdotjs/svg.js';
import { Container } from '@svgdotjs/svg.js';
import { NumberAlias } from '@svgdotjs/svg.js';
import { Element } from '@svgdotjs/svg.js';
import { SVG } from '@svgdotjs/svg.js';
import { SmzSvgBuilder, SmzSvgRoot, SmzSvgState, SmzSVGWrapper } from 'ngx-smz-ui';

@Component({
  selector: 'app-svg-gcab',
  template: `
  <div>Playground Works !!</div>

  <div class="grid grid-nogutter w-full items-start align-middle">
    <smz-svg *ngIf="flowchartState != null" [state]="flowchartState"></smz-svg>
  </div>

  `
})

export class SvgGcabComponent implements OnInit, AfterViewInit {
  public flowchart: string;
  public flowchartState: SmzSvgState;
  public pinSize = 30;
  public status = {
    color: "#FB8C00",
    hasFlowchart: true,
    id: "a7f54900-d5aa-4124-927c-ae38353cb34b",
    name: "Em Avaliação Pelo Administrador",
    requiredClaims: []
  };
  constructor(private http: HttpClient) { }

  public ngOnInit(): void {
    const headers = new HttpHeaders();
    headers.set('Accept', 'image/svg+xml');
    this.http.get('assets/SVG/flowchart_27_09_2022.svg', { headers, responseType: 'text' }).subscribe((flowchart: string) => {
      this.flowchart = flowchart;
      this.flowchartState = this.setupFlowchartState();
    })

  }

  public ngAfterViewInit(): void {

  }

  private setupFlowchartState(): SmzSvgState {
    // eslint-disable-next-line max-len
    const markSvgData = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path class="bounce" d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>';

    const state: SmzSvgState = new SmzSvgBuilder()
      .setContainerSize(window.innerWidth*0.85, window.innerHeight*0.75)
      .setContainerStyles('absolute inset-20 overflow-hidden')
      .useMouseZoom(1, 20, 0.2)
      .usePan()
      .setInitialScopes(['current'])
      .executeAfterInit(() => this.focus())
      .feature()
        .root(this.flowchart, window.innerWidth*0.75, window.innerHeight*0.85)
        .transform(this.getRootTransformation())
        .feature
      .pin(markSvgData, this.pinSize)
        .setId(this.status.id)
        .addScope('current')
        .setColor('red')
        .setAnchor('container')
        .setDynamicPosition(this.getMarkPosition())
        .feature
      .svg
      .build();

    return state;
  }

  public focus(): void {
    setTimeout(() => {
      this.flowchartState.dispatch.zoomToId.next({ elementId: this.status.id, zoom: 0.14 });
    }, 800);
  }

  public getRootTransformation(): (container: Container, elementId: string, feature: SmzSvgRoot, draw: SmzSVGWrapper) => void {

    return (container: Container, elementId: string, feature: SmzSvgRoot, draw: SmzSVGWrapper) => {

      console.log('state', this.status);

      return;

      const box = GetElementByStatusId(container, this.status.id);

      if (box == null) {
        return;
      }

      const child = box.node.children[0];

      child.setAttribute('style', `fill:${this.status.color};stroke:red`);
      child.setAttribute('class', 'cursor-pointer');

      const markSvgData = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path class="bounce" d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>';
      const svg = SVG(markSvgData);

      const [diffPosX, diffPosY, width, height] = [ child.getAttribute('x'), child.getAttribute('y'), child.getAttribute('width'), child.getAttribute('height') ];

      console.log('diffPosX', diffPosX);
      console.log('diffPosY', diffPosY);
      console.log('width', width);
      console.log('height', height);

      svg
        .fill({ color: 'red', opacity: 1 })
        .center(Number(diffPosX) + (Number(width) / 2) - (this.pinSize / 2), Number(diffPosY) - (Number(height) / 2) - (this.pinSize / 2))
        .size(this.pinSize);

      const pinElement = document.createElement('div');
      pinElement.innerHTML = markSvgData;

      svg.node.lastElementChild.setAttribute('id', `PIN_${this.status.id}`);

      box.add(svg);
      // const pin = this.flowchartState.features.find(x => x.id === this.status.id);
      // pin.position = { x: diffPosX, y: diffPosY };
      // pin.position = { x: 399, y: 220 };

      // pin.position = { x: 388 + (this.pinSize / 2), y: 210 + (this.pinSize / 2) };

      // console.log('position', pin.position);

    };
  }

  public getMarkPosition(): (container: Container, elementId: string, feature: SmzSvgRoot, draw: SmzSVGWrapper) => void {

    return (container: Container, elementId: string, feature: SmzSvgRoot, draw: SmzSVGWrapper) => {

      console.log('state', this.status);

      return;

      const box = GetElementByStatusId(container, this.status.id);

      if (box == null) {
        return;
      }

      const child = box.node.children[0];

      child.setAttribute('style', `fill:${this.status.color};stroke:red`);
      child.setAttribute('class', 'cursor-pointer');

      const markSvgData = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path class="bounce" d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>';
      const svg = SVG(markSvgData);

      const [diffPosX, diffPosY, width, height] = [ child.getAttribute('x'), child.getAttribute('y'), child.getAttribute('width'), child.getAttribute('height') ];

      console.log('diffPosX', diffPosX);
      console.log('diffPosY', diffPosY);
      console.log('width', width);
      console.log('height', height);

      svg
        .fill({ color: 'red', opacity: 1 })
        .center(Number(diffPosX) + (Number(width) / 2) - (this.pinSize / 2), Number(diffPosY) - (Number(height) / 2) - (this.pinSize / 2))
        .size(this.pinSize);

      const pinElement = document.createElement('div');
      pinElement.innerHTML = markSvgData;

      svg.node.lastElementChild.setAttribute('id', `PIN_${this.status.id}`);

      box.add(svg);
      // const pin = this.flowchartState.features.find(x => x.id === this.status.id);
      // pin.position = { x: diffPosX, y: diffPosY };
      // pin.position = { x: 399, y: 220 };

      // pin.position = { x: 388 + (this.pinSize / 2), y: 210 + (this.pinSize / 2) };

      // console.log('position', pin.position);

    };
  }

}

export function GetElementByStatusId(container: Container, statusId: string): Element {
  const group = container.find(`[data-stateId="${statusId}"]`);

  if (group?.length > 0) {
    return group[0];
  }
  else {
    return null;
  }

}