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

    const tocItems = this.useCases.map((u) => ({ id: u.id, label: u.title }));
    this.toc.setItems(tocItems);

    this.destroyRef.onDestroy(() => this.toc.clear());
  }

  getCharts(useCase: ChartUseCase): ChartItem[] {
    return this.chartCache.get(useCase.id) ?? [];
  }

  private normalizeResult(result: any): ChartItem[] {
    if (result == null) {
      return [];
    }

    const isModelShape =
      typeof result === 'object' && 'model' in result;

    if (!isModelShape) {
      return this.normalizeSingleChart(result);
    }

    return this.normalizeModelResult(result as { model?: any; cSharp?: any });
  }

  private normalizeSingleChart(raw: any): ChartItem[] {
    const hasType = raw?.type != null;

    if (!hasType) {
      return [];
    }

    const config = raw.config ?? raw.options ?? {};
    return [{ type: raw.type, data: raw.data, config }];
  }

  private normalizeModelResult(r: { model?: any; cSharp?: any }): ChartItem[] {
    const out: ChartItem[] = [];

    if (r.model?.type) {
      const config = r.model.config ?? {};
      out.push({ type: r.model.type, data: r.model.data, config });
    }

    if (r.cSharp?.type) {
      const config = r.cSharp.config ?? {};
      out.push({ type: r.cSharp.type, data: r.cSharp.data, config });
    }

    return out;
  }
}
