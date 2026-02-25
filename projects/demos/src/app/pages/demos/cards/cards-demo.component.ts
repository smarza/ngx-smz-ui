import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { NgxSmzCardsModule, SmzCardsState } from '@ngx-smz/core';
import { CARDS_USE_CASES, CardsUseCase } from './cards-use-cases';
import { DemoCodeBlockComponent } from '../../../components/demo-code-block/demo-code-block.component';
import { DemosTocService } from '../../../layout/demos-toc.service';

interface CachedCardsUseCase {
  useCase: CardsUseCase;
  state: SmzCardsState<any>;
}

@Component({
  selector: 'app-cards-demo',
  standalone: true,
  imports: [NgxSmzCardsModule, DemoCodeBlockComponent],
  templateUrl: './cards-demo.component.html',
  styleUrl: './cards-demo.component.scss',
})
export class CardsDemoComponent implements OnInit {
  cachedUseCases: CachedCardsUseCase[] = [];

  private readonly tableOfContentsService = inject(DemosTocService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.cachedUseCases = CARDS_USE_CASES.map((useCase) => ({
      useCase,
      state: useCase.getConfig(),
    }));

    const tableOfContentsItems = CARDS_USE_CASES.map((useCase) => ({
      id: useCase.id,
      label: useCase.title,
    }));
    this.tableOfContentsService.setItems(tableOfContentsItems);

    this.destroyRef.onDestroy(() => this.tableOfContentsService.clear());
  }
}
