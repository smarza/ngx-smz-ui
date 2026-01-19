import { Pipe, PipeTransform } from '@angular/core';
import { AnnualPlanningDetails } from '@models/annual-planning-details';
import { SmzTableState, SmzTableBuilder, nameof } from '@ngx-smz/core';
import { Store } from '@ngxs/store';
import { AnnualPlanningsFtSelectors } from '@state/features/annual-plannings/annual-plannings.selectors';
import { ScenarioPaintingPlanSystemData } from '@models/scenario-painting-plan-system-data';

@Pipe({
  name: 'updateTableState',
  standalone: true
})
export class UpdateTableStatePipe implements PipeTransform {
  constructor(private store: Store) {}

  public transform(annualPlanning: AnnualPlanningDetails): SmzTableState {
    return new SmzTableBuilder()
      .addSource(this.store.select(AnnualPlanningsFtSelectors.getPaintingPlanSystemData))
      .setTitle(`${annualPlanning.selectedPlan.name}`)
      .enableClearFilters()
      .enableGlobalFilter()
      .enableColumnVisibility(false)
      .useTableEmptyMessage()
      .disableRowHoverEffect()
      .useStrippedStyle()
      .usePagination()
      .setPaginationPageOptions([15, 25, 50, 100, 500])
      .setPaginationDefaultRows(15)
      .setSize('small')
      .columns()
        .text(nameof<ScenarioPaintingPlanSystemData>('id'), 'Identificador', '18em')
          .columns
        .text(nameof<ScenarioPaintingPlanSystemData>('module'), 'Módulo', '8em')
          .columns
        .text(nameof<ScenarioPaintingPlanSystemData>('sector'), 'Setor', '8em')
          .columns
        .text(nameof<ScenarioPaintingPlanSystemData>('system'), 'Sistema', '10em')
          .columns
        .text(nameof<ScenarioPaintingPlanSystemData>('area'), 'Área', '10em')
          .columns
        .text(nameof<ScenarioPaintingPlanSystemData>('productivity'), 'Produtividade', '12em')
          .columns
        .text(nameof<ScenarioPaintingPlanSystemData>('corrosion'), 'Corrosão', '10em')
          .columns
        .text(nameof<ScenarioPaintingPlanSystemData>('characteristic'), 'Característica', '12em')
          .columns
        .text(nameof<ScenarioPaintingPlanSystemData>('temperature'), 'Temperatura', '11em')
          .columns
        .text(nameof<ScenarioPaintingPlanSystemData>('humidity'), 'Umidade', '10em')
          .columns
        .text(nameof<ScenarioPaintingPlanSystemData>('windDirection'), 'Direção do Vento', '15em')
          .columns
        .text(nameof<ScenarioPaintingPlanSystemData>('windIntensity'), 'Intensidade do Vento', '16em')
          .columns
        .if(annualPlanning.hasRtiData)
          .text(nameof<ScenarioPaintingPlanSystemData>('rtiAPre'), 'RTI A Pré', '11em')
            .columns
          .text(nameof<ScenarioPaintingPlanSystemData>('rtiBPre'), 'RTI B Pré', '11em')
            .columns
          .text(nameof<ScenarioPaintingPlanSystemData>('rtiCPre'), 'RTI C Pré', '11em')
            .columns
          .text(nameof<ScenarioPaintingPlanSystemData>('rtiDPre'), 'RTI D Pré', '11em')
            .columns
          .endIf
        .text(nameof<ScenarioPaintingPlanSystemData>('initialCorrodedArea'), 'Área Corroída Inicial', '17em')
          .columns
        .text(nameof<ScenarioPaintingPlanSystemData>('progression'), 'Avanço', '10em')
          .columns
        .text(nameof<ScenarioPaintingPlanSystemData>('corrosionForecast'), 'Corrosão Prevista', '16em')
          .columns
        .text(nameof<ScenarioPaintingPlanSystemData>('corrodedAreaForecast'), 'Área Corroída Prevista', '18em')
          .columns
        .text(nameof<ScenarioPaintingPlanSystemData>('paintArea'), 'Área a Pintar', '12em')
          .columns
        .text(nameof<ScenarioPaintingPlanSystemData>('requiredManHours'), 'HH Necessário', '14em')
          .columns
        .text(nameof<ScenarioPaintingPlanSystemData>('criticality'), 'Criticidade', '12em')
          .columns
        .text(nameof<ScenarioPaintingPlanSystemData>('criticalityClass'), 'Classe de Criticidade', '17em')
          .columns
        .if(annualPlanning.hasRtiData)
          .text(nameof<ScenarioPaintingPlanSystemData>('rtiPreIndex'), 'Indice RTI Pré', '14em')
            .columns
          .text(nameof<ScenarioPaintingPlanSystemData>('rpp'), 'RPP', '6em')
            .columns
          .text(nameof<ScenarioPaintingPlanSystemData>('epPriority'), 'Prioridade E&P', '14em')
            .columns
          .endIf
        .if(this.store.selectSnapshot(AnnualPlanningsFtSelectors.shouldConsiderProximity))
          .text(nameof<ScenarioPaintingPlanSystemData>('hidroblastCenter'), 'Centro de Hidrojato', '15em')
            .columns
          .text(nameof<ScenarioPaintingPlanSystemData>('hidroblastCenterOperator'), 'Operador do Hidrojato', '17em')
            .columns
          .endIf
        .text(nameof<ScenarioPaintingPlanSystemData>('team'), 'Plano de Pintura', '15em')
          .columns
        .text(nameof<ScenarioPaintingPlanSystemData>('paintedArea'), 'Área Pintada', '12em')
          .columns
        .text(nameof<ScenarioPaintingPlanSystemData>('manHoursUsed'), 'HH Utilizado', '12em')
          .columns
        .text(nameof<ScenarioPaintingPlanSystemData>('postPaintingCorrosion'), 'Corrosão Pós Pintura', '16em')
          .columns
        .text(nameof<ScenarioPaintingPlanSystemData>('postPaintingCorrodedArea'), 'Área Corroída Pós Pintura', '18em')
          .columns
        .if(annualPlanning.hasRtiData)
          .text(nameof<ScenarioPaintingPlanSystemData>('rtiPostIndex'), 'Indice RTI Pós', '14em')
            .columns
          .text(nameof<ScenarioPaintingPlanSystemData>('rtiAPost'), 'RTI A Pós', '11em')
            .columns
          .text(nameof<ScenarioPaintingPlanSystemData>('rtiBPost'), 'RTI B Pós', '11em')
            .columns
          .text(nameof<ScenarioPaintingPlanSystemData>('rtiCPost'), 'RTI C Pós', '11em')
            .columns
          .text(nameof<ScenarioPaintingPlanSystemData>('rtiDPost'), 'RTI D Pós', '11em')
            .columns
          .endIf
        .table
      .build();
  }
}