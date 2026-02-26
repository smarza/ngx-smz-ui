import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { SmzGaugeComponent, SmzGaugeState } from '@ngx-smz/core';
import { GAUGE_USE_CASES, GaugeUseCase } from './gauge-use-cases';
import { DemoCodeBlockComponent } from '../../../components/demo-code-block/demo-code-block.component';
import { DemosTocService } from '../../../layout/demos-toc.service';

interface CachedGaugeUseCase {
  useCase: GaugeUseCase;
  state: SmzGaugeState;
}

@Component({
  selector: 'app-gauge-demo',
  standalone: true,
  imports: [SmzGaugeComponent, DemoCodeBlockComponent],
  templateUrl: './gauge-demo.component.html',
  styleUrl: './gauge-demo.component.scss',
})
export class GaugeDemoComponent implements OnInit {
  cachedUseCases: CachedGaugeUseCase[] = [];

  private readonly tableOfContentsService = inject(DemosTocService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.cachedUseCases = GAUGE_USE_CASES.map((useCase) => ({
      useCase,
      state: useCase.getConfig(),
    }));

    const tableOfContentsItems = GAUGE_USE_CASES.map((useCase) => ({
      id: useCase.id,
      label: useCase.title,
    }));
    this.tableOfContentsService.setItems(tableOfContentsItems);

    this.destroyRef.onDestroy(() => this.tableOfContentsService.clear());
  }
}
