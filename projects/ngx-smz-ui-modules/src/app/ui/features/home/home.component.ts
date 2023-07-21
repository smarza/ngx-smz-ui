import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AuthenticationSelectors, SmzDialogsService, SmzTableBuilder, SmzTableState } from 'ngx-smz-ui';
import { Observable } from 'rxjs';
import { UserData } from '@models/user-data';
import { LARGE_TABLE_DATA } from '../../../../../../ngx-smz-ui-overview/src/app/demos/data/large-table';

@Component({
  selector: 'app-home',
  templateUrl: `home.component.html`,
})
export class HomeComponent
{
  @Select(AuthenticationSelectors.userdata) public userdata$: Observable<UserData>;
  public state: SmzTableState = new SmzTableBuilder()
    .setTitle('Auto Sized Columns with Large Data')
    .enableGlobalFilter()
    .enableClearFilters()
    .setEmptyFeedbackMessage('Nenhuma inconsistência encontrada')
    .setEmptyFeedbackImage('assets/images/server-checkmark.svg')
    .enableColumnVisibility(true)
    .usePagination()
    .setPaginationPageOptions([10, 15, 25, 100, 200])
    .setPaginationDefaultRows(10)
    .useGridStyle()
    .setSize('small')
    .useStrippedStyle()
    .disableRowHoverEffect()
    .excel()
      .excel
    .menu()
      .item('Consultar')
        .setCallback((event: any) => console.log('---'))
        .menu
      .table
    .columns()
      .text('tag', 'tag', 'auto').columns
      .text('plant', 'plant', 'auto').columns
      .text('area', 'area', 'auto').hide().columns
      .text('unit', 'unit', 'auto').columns
      .text('status.name', 'status', 'auto').columns
      .text('service', 'service', 'auto').columns
      .text('description', 'description', 'auto').columns
      .table
    .resizeIgnoringCheck(
        { property: 'plant', width: '12em'},
      )
  .build()
  public items = LARGE_TABLE_DATA;

  constructor(private dialogs: SmzDialogsService, private store: Store)
  {

  }

}
