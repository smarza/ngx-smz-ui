import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { NgxSmzDocumentsModule, SmzDocumentState } from '@ngx-smz/core';
import { DOCUMENT_USE_CASES, DocumentUseCase } from './document-use-cases';
import { DemoCodeBlockComponent } from '../../../components/demo-code-block/demo-code-block.component';
import { DemosTocService } from '../../../layout/demos-toc.service';

interface CachedDocumentUseCase {
  useCase: DocumentUseCase;
  state: SmzDocumentState;
}

@Component({
  selector: 'app-document-demo',
  standalone: true,
  imports: [NgxSmzDocumentsModule, DemoCodeBlockComponent],
  templateUrl: './document-demo.component.html',
  styleUrl: './document-demo.component.scss',
})
export class DocumentDemoComponent implements OnInit {
  cachedUseCases: CachedDocumentUseCase[] = [];

  private readonly tableOfContentsService = inject(DemosTocService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.cachedUseCases = DOCUMENT_USE_CASES.map((useCase) => ({
      useCase,
      state: useCase.getConfig(),
    }));

    const tableOfContentsItems = DOCUMENT_USE_CASES.map((useCase) => ({
      id: useCase.id,
      label: useCase.title,
    }));
    this.tableOfContentsService.setItems(tableOfContentsItems);

    this.destroyRef.onDestroy(() => this.tableOfContentsService.clear());
  }
}
