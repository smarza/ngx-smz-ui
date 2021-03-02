import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SmzTableConfig } from 'ngx-smz-ui';
import { SmzControlType } from 'ngx-smz-dialogs';
import { DemoTableDataService } from './data-service/demo-tables-data-service';

const jsonData = '[{"id":"6eaed794-e6ba-4d61-9c2c-08d8da43305f","number":"PT-0001","description":"Permissão de trabalho de exemplo 1","plant":{"id":"2d164cb8-c7e2-4aba-2433-08d8da432fcf","name":"P-76"},"campaign":{"id":"f2f9690a-198d-4209-613f-08d8da433018","name":"Parada de Produção de P76"}},{"id":"80d2a15a-d3e9-4fde-9c2e-08d8da43305f","number":"PT-0002","description":"Permissão de trabalho de exemplo 2","plant":{"id":"2d164cb8-c7e2-4aba-2433-08d8da432fcf","name":"P-76"},"campaign":{"id":"f2f9690a-198d-4209-613f-08d8da433018","name":"Parada de Produção de P76"}}, {"id":"6eaed794-e6ba-4d61-9c2c-08d8da433058","number":"PT-0003","description":"Permissão de trabalho de exemplo 3","plant":{"id":"2d164cb8-c7e2-4aba-2433-08d8da432fcy","name":"P-74"},"campaign":{"id":"f2f9690a-198d-4209-613f-08d8da433016","name":"Parada de Produção de P74"}}]';

@Component({
  selector: 'app-demo-tables',
  templateUrl: './demo-tables.component.html',
  providers: [DemoTableDataService]
})

export class DemoTablesComponent implements OnInit {
  public items: any[];
  public items$: Observable<any[]>;
  public config: SmzTableConfig;
  constructor(private dataService: DemoTableDataService) { }

  ngOnInit() {
    this.items$ = this.dataService.getCustomersLarge();
    this.items = JSON.parse(jsonData);

    this.setupTableConfig();
  }

  public test(event: any): void
  {
    console.log('test', event);
  }

  public setupTableConfig(): void {
    this.config = {
      showCaption: true,
      showGlobalFilter: true,
      isSelectable: true,
      showActions: true,
      title: 'Permissões de Trabalho',
      columns: [
        {
          controlType: SmzControlType.TEXT,
          field: 'number',
          header: 'Número',
          isGlobalFilterable: true,
          showFilter: true,
          isOrderable: false,
        },
        {
          controlType: SmzControlType.DROPDOWN,
          field: 'plant',
          header: 'Planta',
          isGlobalFilterable: true,
          showFilter: true,
          isOrderable: true,
        },
        {
          controlType: SmzControlType.DROPDOWN,
          field: 'campaign',
          header: 'Campanha',
          isGlobalFilterable: true,
          showFilter: true,
          isOrderable: true,
        },
        {
          controlType: SmzControlType.TEXT,
          field: 'description',
          header: 'Descrição',
          isGlobalFilterable: true,
          showFilter: true,
          isOrderable: true,
        }
      ]
    };
  }

}