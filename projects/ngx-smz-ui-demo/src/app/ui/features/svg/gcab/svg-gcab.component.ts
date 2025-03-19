import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Point } from '@svgdotjs/svg.js';
import { Container } from '@svgdotjs/svg.js';
import { NumberAlias } from '@svgdotjs/svg.js';
import { Element } from '@svgdotjs/svg.js';
import { SVG } from '@svgdotjs/svg.js';
import { SmzSvgBaseFeature, SmzSvgBuilder, SmzSvgRoot, SmzSvgState, SmzSVGWrapper } from 'ngx-smz-ui';

@Component({
    selector: 'app-svg-gcab',
    template: `
  <div>Playground Works !!</div>

  <div class="grid grid-nogutter w-full items-start align-middle">
    <smz-svg *ngIf="flowchartState != null" [state]="flowchartState"></smz-svg>
  </div>

  `,
    standalone: false
})

export class SvgGcabComponent implements OnInit, AfterViewInit {
  public flowchart: string;
  public flowchartState: SmzSvgState;
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
      .pin(null, 0)
        .setId(this.status.id)
        .addScope('current')
        .setDynamicBuild(this.getMarkPosition())
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
      const box = GetElementByStatusId(container, this.status.id);

      if (box == null || box.node.children.length < 2) {
        throw new Error(`Não foi possível encontrar o nó do estado no svg ou ele não possui os elementos rect e g`);
        return;
      }

      box.node.children[0].setAttribute('style', `fill:${this.status.color};stroke:red`);
    };
  }

  public getMarkPosition(): (rootContainer: Container, feature: SmzSvgBaseFeature) => Element {

    return (rootContainer: Container, feature: SmzSvgBaseFeature): Element => {

      const box = GetElementByStatusId(rootContainer, this.status.id);

      if (box == null) {
        return;
      }

      const child = box.node.children[0];

      const [posX, posY, width, height, radius ] = [ Number(child.getAttribute('x')), Number(child.getAttribute('y')), Number(child.getAttribute('width')), Number(child.getAttribute('height')), Number(child.getAttribute('rx')) ];

      const xGrowRate = 1.5;
      const YGrowRate = 1.8;

      const [ newWidth, newHeight ] = [ (width * xGrowRate), (height * YGrowRate)];
      const [ newPosX, newPosY ] = [ (posX - (width * (xGrowRate - 1) / 2)), (posY - (height * (YGrowRate - 1) / 2))];

      const rect = SVG().rect(newWidth, newHeight);

      rect
        .radius(radius * (YGrowRate))
        .fill({ color: this.status.color, opacity: 0.4 })
        .x(newPosX)
        .y(newPosY)
        .addClass('cursor-pointer animate__animated animate__infinite animate__flash animate__slow');

      box.add(rect);

      box.front();


      return rect;
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