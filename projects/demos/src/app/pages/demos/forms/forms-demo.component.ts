import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { NgxSmzFormsModule } from '@ngx-smz/core';
import { FORMS_USE_CASES, FormUseCase } from './forms-use-cases';
import { DemoCodeBlockComponent } from '../../../components/demo-code-block/demo-code-block.component';
import { DemosTocService } from '../../../layout/demos-toc.service';

@Component({
  selector: 'app-forms-demo',
  standalone: true,
  imports: [NgxSmzFormsModule, DemoCodeBlockComponent],
  templateUrl: './forms-demo.component.html',
  styleUrl: './forms-demo.component.scss',
})
export class FormsDemoComponent implements OnInit {
  readonly useCases = FORMS_USE_CASES;

  private readonly tableOfContentsService = inject(DemosTocService);
  private readonly destroyRef = inject(DestroyRef);

  /** Cache: config de cada use case (getConfig chamado uma única vez). */
  private cachedConfigByUseCaseId = new Map<string, ReturnType<FormUseCase['getConfig']>>();

  ngOnInit(): void {
    this.useCases.forEach((useCase) => {
      this.cachedConfigByUseCaseId.set(useCase.id, useCase.getConfig());
    });

    const tableOfContentsItems = this.useCases.map((useCase) => ({
      id: useCase.id,
      label: useCase.title,
    }));
    this.tableOfContentsService.setItems(tableOfContentsItems);

    this.destroyRef.onDestroy(() => this.tableOfContentsService.clear());
  }

  getConfigForUseCase(useCase: FormUseCase): ReturnType<FormUseCase['getConfig']> | undefined {
    return this.cachedConfigByUseCaseId.get(useCase.id);
  }
}
