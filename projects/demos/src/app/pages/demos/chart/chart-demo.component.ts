import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { SmzChartModule } from '@ngx-smz/core';
import { CHART_USE_CASES, ChartUseCase } from './chart-use-cases';
import { DemoCodeBlockComponent } from '../../../components/demo-code-block/demo-code-block.component';
import { DemosTocService } from '../../../layout/demos-toc.service';

type ChartItem = { type: string; data: any; config: any };

@Component({
  selector: 'app-chart-demo',
  standalone: true,
  imports: [SmzChartModule, DemoCodeBlockComponent],
  templateUrl: './chart-demo.component.html',
  styleUrl: './chart-demo.component.scss',
})
export class ChartDemoComponent implements OnInit {
  readonly useCases = CHART_USE_CASES;

  private readonly toc = inject(DemosTocService);
  private readonly destroyRef = inject(DestroyRef);

  /** Cache: resultado de cada getConfig() chamado uma única vez (como no overview ao selecionar o nó). */
  private chartCache = new Map<string, ChartItem[]>();

  ngOnInit(): void {
    this.useCases.forEach((useCase) => {
      const charts = this.normalizeResult(useCase.getConfig());
      this.chartCache.set(useCase.id, charts);
    });

    this.toc.setItems(
      this.useCases.map((u) => ({ id: u.id, label: u.title })),
    );

    this.destroyRef.onDestroy(() => this.toc.clear());
  }

  getCharts(useCase: ChartUseCase): ChartItem[] {
    return this.chartCache.get(useCase.id) ?? [];
  }

  private normalizeResult(result: any): ChartItem[] {
    if (result == null) {
      return [];
    }

    const hasModel = typeof result === 'object' && 'model' in result;

    if (!hasModel) {
      const c = result as any;
      return c.type ? [{ type: c.type, data: c.data, config: c.config ?? c.options ?? {} }] : [];
    }

    const out: ChartItem[] = [];
    const r = result as { model?: any; cSharp?: any };

    if (r.model?.type) {
      out.push({ type: r.model.type, data: r.model.data, config: r.model.config ?? {} });
    }

    if (r.cSharp?.type) {
      out.push({ type: r.cSharp.type, data: r.cSharp.data, config: r.cSharp.config ?? {} });
    }

    return out;
  }
}
