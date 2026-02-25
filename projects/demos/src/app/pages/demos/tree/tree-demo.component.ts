import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { NgxSmzTreesModule } from '@ngx-smz/core';
import { TREE_USE_CASES, TreeUseCase } from './tree-use-cases';
import { DemoCodeBlockComponent } from '../../../components/demo-code-block/demo-code-block.component';
import { DemosTocService } from '../../../layout/demos-toc.service';
import { SmzTreeState } from '@ngx-smz/core';

interface CachedTreeUseCase {
  useCase: TreeUseCase;
  state: SmzTreeState;
  data: any[];
}

@Component({
  selector: 'app-tree-demo',
  standalone: true,
  imports: [NgxSmzTreesModule, DemoCodeBlockComponent],
  templateUrl: './tree-demo.component.html',
  styleUrl: './tree-demo.component.scss',
})
export class TreeDemoComponent implements OnInit {
  cachedUseCases: CachedTreeUseCase[] = [];

  private readonly tableOfContentsService = inject(DemosTocService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.cachedUseCases = TREE_USE_CASES.map((useCase) => ({
      useCase,
      state: useCase.getConfig(),
      data: useCase.getData(),
    }));

    const tableOfContentsItems = TREE_USE_CASES.map((useCase) => ({
      id: useCase.id,
      label: useCase.title,
    }));
    this.tableOfContentsService.setItems(tableOfContentsItems);

    this.destroyRef.onDestroy(() => this.tableOfContentsService.clear());
  }
}
