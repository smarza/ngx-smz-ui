import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { BreadcrumbService } from './breadcrum.service';
import { filter, map, mergeMap } from 'rxjs/operators';
import { NgxRbkUtilsConfig } from '../ngx-rbk-utils.config';

@Injectable()
export class TitleService {
    private APP_TITLE = '';
    private SEPARATOR = '';

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title,
        private breadcrumbService: BreadcrumbService, private config: NgxRbkUtilsConfig) {
            this.APP_TITLE = config.applicationName;
            this.SEPARATOR = ' > ';
        }

    public static upperCaseFirstLetter(value: string): any {
        if (!value) {
            return value;
        }

        return value.charAt(0).toUpperCase() + value.slice(1);
    }

    public init(): void {
        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                map(() => {
                    let route = this.activatedRoute;
                    while (route.firstChild) { route = route.firstChild; }
                    return route;
                }),
                filter((route) => route.outlet === 'primary'),
                mergeMap((route) => route.data),
            )
            .subscribe((data: any) => {

                let pathString = '';

                if (data.title) {
                    // If a route has a title set (e.g. data: {title: "Foo"}) then we use it
                    pathString = data.title;
                }
                else {
                    // If not, we do a little magic on the url to create an approximation
                    pathString = this.router.url.split('/')
                        .reduce((acc, frag) => {
                            if (acc && frag) {
                                acc += this.SEPARATOR;
                            }

                            return acc + TitleService.upperCaseFirstLetter(frag);
                        });
                }

                this.titleService.setTitle(`${this.APP_TITLE} | ${pathString}`);

                this.breadcrumbService.setItems(data.title != null ? [{ label: data.title }] : []);

            });
    }
}
