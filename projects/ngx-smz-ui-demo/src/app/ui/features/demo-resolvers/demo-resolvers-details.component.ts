import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ShopDetails } from '@models/shop';
import { ShopsDbSelectors } from '@states/database/shops/shops.selector';

@Component({
  selector: 'app-demo-reolvers-details',
  template: `
    Details Works!

    <h2>From Route Resolve</h2>
    <div>
    {{ routeData$ | async | json }}
    </div>

    <h2>From Store</h2>
    <div>
    {{ shop$ | async | json }}
    </div>
  `
})

export class DemoResolversDetailsComponent implements OnInit {
  public routeData$: Observable<ShopDetails>;
  @Select(ShopsDbSelectors.current) public shop$: Observable<ShopDetails>;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.routeData$ = this.activatedRoute.data.pipe(map((data) => data?.details));
  }
}