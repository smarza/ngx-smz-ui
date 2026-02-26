import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { NgxSmzMultiTablesModule, PrimeConfigService, SmzMultiTablesState } from '@ngx-smz/core';
import { MULTI_TABLES_USE_CASES, MultiTablesUseCase } from './multi-tables-use-cases';
import { DemoCodeBlockComponent } from '../../../components/demo-code-block/demo-code-block.component';
import { DemosTocService } from '../../../layout/demos-toc.service';

interface CachedMultiTablesUseCase {
  useCase: MultiTablesUseCase;
  state: SmzMultiTablesState;
}

@Component({
  selector: 'app-multi-tables-demo',
  standalone: true,
  imports: [NgxSmzMultiTablesModule, DemoCodeBlockComponent],
  templateUrl: './multi-tables-demo.component.html',
  styleUrl: './multi-tables-demo.component.scss',
})
export class MultiTablesDemoComponent implements OnInit {
  cachedUseCases: CachedMultiTablesUseCase[] = [];

  private readonly tableOfContentsService = inject(DemosTocService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly primeConfigService = inject(PrimeConfigService);

  ngOnInit(): void {
    this.primeConfigService.init();

    this.cachedUseCases = MULTI_TABLES_USE_CASES.map((useCase) => ({
      useCase,
      state: useCase.getConfig(),
    }));

    const tableOfContentsItems = MULTI_TABLES_USE_CASES.map((useCase) => ({
      id: useCase.id,
      label: useCase.title,
    }));
    this.tableOfContentsService.setItems(tableOfContentsItems);

    this.destroyRef.onDestroy(() => this.tableOfContentsService.clear());
  }
}
