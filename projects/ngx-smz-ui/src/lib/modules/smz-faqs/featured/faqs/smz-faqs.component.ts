import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { FaqsRouterConfig } from '../../models/faqs';
import { filter } from 'rxjs/operators';
import { FaqsManagerService } from '../../services/faqs-manager.service';

@Component({
    selector: 'smz-faqs',
    templateUrl: './smz-faqs.component.html',
    styleUrls: ['./smz-faqs.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class SmzFaqsComponent implements OnInit
{
    @Input() public expanded = false;
    @Input() public verticalPosition: 'top' | 'middle' | 'bottom' = 'bottom';
    public activated = false;

    constructor(private router: Router, public manager: FaqsManagerService)
    {
        this.setupRouterListener();
    }

    public ngOnInit(): void
    {
    }

    public setupRouterListener(): void
    {
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe((event) =>
            {
                const activedRoute = this.getActivatedRoute();

                const data = activedRoute.snapshot.data;
                const faqs: FaqsRouterConfig = data.faqs;

                if (faqs && faqs.enabled)
                {
                    // ROTA COM QUIZ HABILITADO
                    this.activated = true;
                    this.manager.currentTag = faqs.tag;
                }
                else
                {
                    this.activated = false;
                    this.manager.currentTag = null;
                }

            });

    }

    private getActivatedRoute(): ActivatedRoute
    {
        let route = this.router.routerState.root;

        while (route.firstChild) route = route.firstChild;

        return route;
    }

    public toggle(): void
    {
        this.expanded = !this.expanded;

        if (this.expanded) this.loadData();
    }

    private loadData(): void
    {
        this.manager.loadTag();
    }

}
