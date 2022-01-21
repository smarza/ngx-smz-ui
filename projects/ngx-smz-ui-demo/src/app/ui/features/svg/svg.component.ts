import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { SmzSvgComponent, SmzSvgData, SmzSVGWrapper } from 'ngx-smz-ui';

@Component({
  selector: 'app-svg',
  templateUrl: `svg.component.html`,
})
export class SvgComponent implements OnInit, AfterViewInit {
  @ViewChild(SmzSvgComponent) public smzSvgComponent: SmzSvgComponent;
  public mapData$: Observable<SmzSvgData>;

  constructor(private http: HttpClient) {
    const headers = new HttpHeaders();
    headers.set('Accept', 'image/svg+xml');

    this.mapData$ = this.http
      .get('assets/br-center.svg', { headers, responseType: 'text' })
      .pipe(
        map((svg: string) => {

          const data: SmzSvgData = {
            debugMode: false,
            width: window.innerWidth.toString(),
            height: window.innerHeight.toString(),
            containerClass: 'absolute inset-0 overflow-auto bg-sky-500',
            pan: { zoomMin: 0.5, zoomMax: 20 },
            svgs: [
              {
                svgFile: svg,
                config: {}
              }
            ]
          };

          return data;
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

}
