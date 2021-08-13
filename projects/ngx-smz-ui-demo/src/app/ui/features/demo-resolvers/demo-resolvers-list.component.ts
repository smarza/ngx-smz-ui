import { Component, OnInit } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Select, Store } from '@ngxs/store';
import { SmzTableBuilder, SmzTableState } from 'ngx-smz-ui';
import { Observable } from 'rxjs';
import { ShopDetails } from '@models/shop';
import { ShopsDbSelectors } from '@states/database/shops/shops.selector';

@Component({
  selector: 'app-demo-reolvers-details',
  template: `<smz-ui-table #smzTable [items]="items$ | async" [state]="tableState"></smz-ui-table>`
})

export class DemoResolversListComponent implements OnInit {
  @Select(ShopsDbSelectors.all) public items$: Observable<ShopDetails[]>
  public tableState: SmzTableState;
  constructor(private store: Store) {

    this.tableState = new SmzTableBuilder()
    .setTitle('Demo Resolvers List')
    .menu()
      .item('Details')
        .setCallback((event: any) => this.store.dispatch(new Navigate(['resolvers/details', event.id])))
        .menu
      .table
    .columns()
      .text('name', 'Nome')
        .columns
      .table
  .build();

  }

  ngOnInit() { }
}