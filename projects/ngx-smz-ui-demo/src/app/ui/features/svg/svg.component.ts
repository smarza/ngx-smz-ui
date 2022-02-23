import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { SmzSvgComponent, SmzSvgState, SmzSvgPin, SmzSvgBuilder } from 'ngx-smz-ui';

@Component({
  selector: 'app-svg',
  templateUrl: `svg.component.html`,
})
export class SvgComponent implements OnInit, AfterViewInit {
  @ViewChild(SmzSvgComponent) public smzSvgComponent: SmzSvgComponent;
  public mapData$: Observable<SmzSvgState>;

  constructor(private http: HttpClient) {
    const headers = new HttpHeaders();
    headers.set('Accept', 'image/svg+xml');

    this.mapData$ = this.http
      .get('assets/br-center.svg', { headers, responseType: 'text' })
      .pipe(
        map((svg: string) => {

          const locationPin = '<path d="M384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192H384z"/>';

          console.log(`window.innerWidth: ${window.innerWidth}`);
          console.log(`window.innerHeight: ${window.innerHeight}`);

          const stateBuilder: SmzSvgBuilder = new SmzSvgBuilder()
            .debugMode()
            .setContainerStyles('absolute inset-0 overflow-hidden bg-sky-500')
            .useMouseZoom(0.5, 10, 0.25)
            .usePan()
            .useWindowSize()
            .feature()
              .root(svg, window.innerWidth, window.innerHeight)
                .feature
              .for(this.makePin(50), (_, item: SmzSvgPin) =>
                _
                .pin(item.svgData, item.width)
                  .setColor(item.color)
                  .setPosition(item.position.x, item.position.y)
                  .useTooltip(item.tooltip.data)
                  .useAdaptative(item.adaptative.minWidth, item.adaptative.maxWidth)
                  .feature
                )
                .pin(locationPin, 30)
                  .setColor('#FFEB3B')
                  .setPosition(1280, 960)
                  .useTooltip('Este é o pin')
                  .useAdaptative(5, 50)
                  .feature
              .svg

          return stateBuilder.build();
        })
      )
  }

  public ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.smzSvgComponent.zoom(1, { x: 500, y: 500 });
    }, 0);
  }

  public makePin(count: number): SmzSvgPin[] {

    const ghost = '<path d="M186.1 .1032c-105.1 3.126-186.1 94.75-186.1 199.9v264c0 14.25 17.3 21.38 27.3 11.25l24.95-18.5c6.625-5.001 16-4.001 21.5 2.25l43 48.31c6.25 6.251 16.37 6.251 22.62 0l40.62-45.81c6.375-7.251 17.62-7.251 24 0l40.63 45.81c6.25 6.251 16.38 6.251 22.62 0l43-48.31c5.5-6.251 14.88-7.251 21.5-2.25l24.95 18.5c10 10.13 27.3 3.002 27.3-11.25V192C384 83.98 294.9-3.147 186.1 .1032zM128 224c-17.62 0-31.1-14.38-31.1-32.01s14.38-32.01 31.1-32.01s32 14.38 32 32.01S145.6 224 128 224zM256 224c-17.62 0-32-14.38-32-32.01s14.38-32.01 32-32.01c17.62 0 32 14.38 32 32.01S273.6 224 256 224z" />';

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
        width: 20,
        adaptative: { enabled: true, minWidth: 10, maxWidth: 50 },
        tooltip: { enabled: true, data: `Conteúdo para pin: ${id}` }
      });

    }

    return results;
  }

}
