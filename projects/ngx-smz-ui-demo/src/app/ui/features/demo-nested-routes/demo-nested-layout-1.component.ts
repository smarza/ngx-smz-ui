import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app-demo-nested-layout-1',
    template: '<div class="border-solid border-red-700">app-demo-nested-layout-1 works !!<router-outlet></router-outlet></div>',
    standalone: false
})
export class DemoNestedLayout1Component implements OnInit
{

    constructor()
    {

    }
    public ngOnInit(): void
    {
    }


}
