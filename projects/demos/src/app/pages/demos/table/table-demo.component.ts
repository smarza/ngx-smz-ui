import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { NgxSmzTablesModule } from '@ngx-smz/core';
import { TABLE_USE_CASES, TableUseCase } from './table-use-cases';
import { DemoCodeBlockComponent } from '../../../components/demo-code-block/demo-code-block.component';
import { DemosTocService } from '../../../layout/demos-toc.service';

@Component({
  selector: 'app-table-demo',
  standalone: true,
  imports: [NgxSmzTablesModule, DemoCodeBlockComponent],
  templateUrl: './table-demo.component.html',
  styleUrl: './table-demo.component.scss',
})
export class TableDemoComponent implements OnInit {
  readonly useCases = TABLE_USE_CASES;

  private readonly tableOfContentsService = inject(DemosTocService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const tableOfContentsItems = this.useCases.map((useCase) => ({
      id: useCase.id,
      label: useCase.title,
    }));
    this.tableOfContentsService.setItems(tableOfContentsItems);

    this.destroyRef.onDestroy(() => this.tableOfContentsService.clear());
  }
}
