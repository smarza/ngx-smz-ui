import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { NgxSmzTablesModule, PrimeConfigService, SmzTableState } from '@ngx-smz/core';
import { TABLE_USE_CASES, TableUseCase } from './table-use-cases';
import { DemoCodeBlockComponent } from '../../../components/demo-code-block/demo-code-block.component';
import { DemosTocService } from '../../../layout/demos-toc.service';

interface CachedTableUseCase {
  useCase: TableUseCase;
  state: SmzTableState;
  data: any[];
}

@Component({
  selector: 'app-table-demo',
  standalone: true,
  imports: [NgxSmzTablesModule, DemoCodeBlockComponent],
  templateUrl: './table-demo.component.html',
  styleUrl: './table-demo.component.scss',
})
export class TableDemoComponent implements OnInit {
  cachedUseCases: CachedTableUseCase[] = [];

  private readonly tableOfContentsService = inject(DemosTocService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly primeConfigService = inject(PrimeConfigService);

  ngOnInit(): void {
    this.primeConfigService.init();

    this.cachedUseCases = TABLE_USE_CASES.map((useCase) => ({
      useCase,
      state: useCase.getConfig(),
      data: useCase.getData(),
    }));

    const tableOfContentsItems = TABLE_USE_CASES.map((useCase) => ({
      id: useCase.id,
      label: useCase.title,
    }));
    this.tableOfContentsService.setItems(tableOfContentsItems);

    this.destroyRef.onDestroy(() => this.tableOfContentsService.clear());
  }
}
