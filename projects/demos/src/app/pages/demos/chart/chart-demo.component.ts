import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { SmzChartModule } from '@ngx-smz/core';
import { CHART_USE_CASES, ChartUseCase } from './chart-use-cases';
import { DemoCodeBlockComponent } from '../../../components/demo-code-block/demo-code-block.component';
import { DemosTocService } from '../../../layout/demos-toc.service';

type NormalizedChartItem = { type: string; data: any; config: any };

@Component({
  selector: 'app-chart-demo',
  standalone: true,
  imports: [SmzChartModule, DemoCodeBlockComponent],
  templateUrl: './chart-demo.component.html',
  styleUrl: './chart-demo.component.scss',
})
export class ChartDemoComponent implements OnInit {
  readonly useCases = CHART_USE_CASES;

  private readonly tableOfContentsService = inject(DemosTocService);
  private readonly destroyRef = inject(DestroyRef);

  /** Cache: resultado de cada getConfig() chamado uma única vez (como no overview ao selecionar o nó). */
  private cachedChartItemsByUseCaseId = new Map<string, NormalizedChartItem[]>();

  ngOnInit(): void {
    this.useCases.forEach((useCase) => {
      const normalizedCharts = this.normalizeResult(useCase.getConfig());
      this.cachedChartItemsByUseCaseId.set(useCase.id, normalizedCharts);
    });

    const tableOfContentsItems = this.useCases.map((useCase) => ({
      id: useCase.id,
      label: useCase.title,
    }));
    this.tableOfContentsService.setItems(tableOfContentsItems);

    this.destroyRef.onDestroy(() => this.tableOfContentsService.clear());
  }

  getChartsForUseCase(useCase: ChartUseCase): NormalizedChartItem[] {
    return this.cachedChartItemsByUseCaseId.get(useCase.id) ?? [];
  }

  private normalizeResult(result: any): NormalizedChartItem[] {
    if (result == null) {
      return [];
    }

    const hasModelShape = typeof result === 'object' && 'model' in result;

    if (!hasModelShape) {
      return this.normalizeSingleChart(result);
    }

    return this.normalizeModelResult(result as { model?: any; cSharp?: any });
  }

  private normalizeSingleChart(rawChartResult: any): NormalizedChartItem[] {
    const hasType = rawChartResult?.type != null;

    if (!hasType) {
      return [];
    }

    const config = rawChartResult.config ?? rawChartResult.options ?? {};
    return [
      {
        type: rawChartResult.type,
        data: rawChartResult.data,
        config,
      },
    ];
  }

  private normalizeModelResult(resultWithModelAndCSharp: {
    model?: any;
    cSharp?: any;
  }): NormalizedChartItem[] {
    const normalizedCharts: NormalizedChartItem[] = [];

    if (resultWithModelAndCSharp.model?.type) {
      const modelConfig = resultWithModelAndCSharp.model.config ?? {};
      normalizedCharts.push({
        type: resultWithModelAndCSharp.model.type,
        data: resultWithModelAndCSharp.model.data,
        config: modelConfig,
      });
    }

    if (resultWithModelAndCSharp.cSharp?.type) {
      const cSharpConfig = resultWithModelAndCSharp.cSharp.config ?? {};
      normalizedCharts.push({
        type: resultWithModelAndCSharp.cSharp.type,
        data: resultWithModelAndCSharp.cSharp.data,
        config: cSharpConfig,
      });
    }

    return normalizedCharts;
  }
}
