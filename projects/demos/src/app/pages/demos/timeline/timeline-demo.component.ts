import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { NgxSmzTimelineModule, SmzTimelineState } from '@ngx-smz/core';
import { TIMELINE_USE_CASES, TimelineUseCase } from './timeline-use-cases';
import { DemoCodeBlockComponent } from '../../../components/demo-code-block/demo-code-block.component';
import { DemosTocService } from '../../../layout/demos-toc.service';

interface CachedTimelineUseCase {
  useCase: TimelineUseCase;
  state: SmzTimelineState<any>;
}

@Component({
  selector: 'app-timeline-demo',
  standalone: true,
  imports: [NgxSmzTimelineModule, DemoCodeBlockComponent],
  templateUrl: './timeline-demo.component.html',
  styleUrl: './timeline-demo.component.scss',
})
export class TimelineDemoComponent implements OnInit {
  cachedUseCases: CachedTimelineUseCase[] = [];

  private readonly tableOfContentsService = inject(DemosTocService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.cachedUseCases = TIMELINE_USE_CASES.map((useCase) => ({
      useCase,
      state: useCase.getConfig(),
    }));

    const tableOfContentsItems = TIMELINE_USE_CASES.map((useCase) => ({
      id: useCase.id,
      label: useCase.title,
    }));
    this.tableOfContentsService.setItems(tableOfContentsItems);

    this.destroyRef.onDestroy(() => this.tableOfContentsService.clear());
  }
}
