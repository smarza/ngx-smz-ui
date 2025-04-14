import { Injectable, Pipe, PipeTransform } from '@angular/core';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@Pipe({
    name: 'urlChecker',
    standalone: false
})

@Injectable()
export class UrlCheckerPipe implements PipeTransform {
    constructor() {

    }
    public transform(routerUrl: string, menuRouterLink: string[]): boolean {

        if (menuRouterLink == null) return false;

        const currentRouterPaths = routerUrl.split('/').filter(x => x !== '');
        const currentMenuPaths = `/${menuRouterLink.join('/')}`.split('/').filter(x => x !== '');

        if (currentMenuPaths.length === 0 && currentRouterPaths.length !== 0) return false;

        let result = true;

        currentMenuPaths
            .forEach((menu, i) => {
                result = result && menu === currentRouterPaths[i];
            });

        return result;
    }

}

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [UrlCheckerPipe],
    exports: [UrlCheckerPipe],
})
export class UrlCheckerPipeModule { }