import { State, Action, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ToastActions, replaceItem } from '@ngx-smz/core';
import { AnnualPlanningsActions } from './annual-plannings.actions';
import { AnnualPlanningsService } from '@services/api/annual-plannings.service';
import { AnnualPlanningListItem } from '@models/annual-planning-list-item';
import { ApiDownloadsService } from '@services/api/api-downloads.service';
import { CreateAnnualPlanningFromSpreadsheetResponse } from '@models/create-annual-planning-from-spreadsheet-response';
import { Navigate } from '@ngxs/router-plugin';
import { ANNUAL_PLANNING_LIST_PAGE_ROUTE } from '@routes';

export const ANNUAL_PLANNINGS_STATE_NAME = 'annualPlannings';

export interface AnnualPlanningsStateModel {
  items: AnnualPlanningListItem[];
  errors: string[];
  lastUpdated?: Date;
}

@State<AnnualPlanningsStateModel>({
  name: ANNUAL_PLANNINGS_STATE_NAME,
  defaults: {
    items: [],
    errors: [],
    lastUpdated: null
  }
})

@Injectable()
export class AnnualPlanningsState {
  constructor(private readonly apiService: AnnualPlanningsService, private apiDownloadsService: ApiDownloadsService) { }

  @Action(AnnualPlanningsActions.LoadAll)
  public loadAll$(ctx: StateContext<AnnualPlanningsStateModel>): Observable<AnnualPlanningListItem[]> {
    return this.apiService.allAsync().pipe(
      tap((result: AnnualPlanningListItem[]) => {
        ctx.patchState({
          lastUpdated: new Date(),
          errors: [],
          items: result,
        });
      })
    );
  }

  @Action(AnnualPlanningsActions.LoadAllSilent)
  public loadAllSilent$(ctx: StateContext<AnnualPlanningsStateModel>): Observable<AnnualPlanningListItem[]> {
    return this.apiService
      .withParameters<AnnualPlanningsService>({ loadingBehavior: 'none' })
      .allAsync().pipe(
        tap((result: AnnualPlanningListItem[]) => {
          ctx.patchState({
            lastUpdated: new Date(),
            errors: [],
            items: result,
          });
        })
      );
  }

  @Action(AnnualPlanningsActions.CreateFromGiants)
  public onCreateFromGiants$(ctx: StateContext<AnnualPlanningsStateModel>, action: AnnualPlanningsActions.CreateFromGiants): Observable<AnnualPlanningListItem> {
    return this.apiService.createFromGiantsAsync(action.data).pipe(
      tap((result: AnnualPlanningListItem) => {
        ctx.dispatch(new ToastActions.Success('Planejamento Anual criado com sucesso'));
        ctx.patchState({
          items: [ result, ...ctx.getState().items ],
          errors: []
        });
      })
    );
  }

  @Action(AnnualPlanningsActions.CreateFromSpreadsheet)
  public onCreateFromSpreadsheet$(ctx: StateContext<AnnualPlanningsStateModel>, action: AnnualPlanningsActions.CreateFromSpreadsheet): Observable<CreateAnnualPlanningFromSpreadsheetResponse> {
    return this.apiService.createFromSpreadsheetAsync(action.data).pipe(
      tap((result: CreateAnnualPlanningFromSpreadsheetResponse) => {
        if (result.errors.length > 0) {
          ctx.patchState({
            errors: result.errors,
          });
        }
        else {
          ctx.dispatch(new ToastActions.Success('Planejamento Anual criado com sucesso'));
          ctx.patchState({
            items: [ result.annualPlanning, ...ctx.getState().items ],
            errors: []
          });
        }
      })
    );
  }

  @Action(AnnualPlanningsActions.Update)
  public update$(ctx: StateContext<AnnualPlanningsStateModel>, action: AnnualPlanningsActions.Update): Observable<AnnualPlanningListItem> {
    return this.apiService.updateAsync(action.data).pipe(
      tap((result: AnnualPlanningListItem) => {
        ctx.dispatch(new ToastActions.Success('Planejamento Anual atualizado com sucesso'));
        ctx.patchState({
          items: replaceItem(ctx.getState().items, result)
        });
      })
    );
  }

  @Action(AnnualPlanningsActions.CalculatePreliminaryResults)
  public calculatePreliminaryResults$(ctx: StateContext<AnnualPlanningsStateModel>, action: AnnualPlanningsActions.CalculatePreliminaryResults): Observable<AnnualPlanningListItem> {
    return this.apiService.calculatePreliminaryResultsAsync(action.data).pipe(
      tap((result: AnnualPlanningListItem) => {
        ctx.patchState({
          items: replaceItem(ctx.getState().items, result)
        });
        if (action.data.fetchNewWeatherData) {
          ctx.dispatch(new AnnualPlanningsActions.Clear);
          ctx.dispatch(new ToastActions.Success('Dados climáticos enviados para atualização no próximo ciclo de cálculo pré-exploratório'));
          ctx.dispatch(new Navigate(ANNUAL_PLANNING_LIST_PAGE_ROUTE));
        }
        else if (action.data.fetchNewGiantsData) {
          ctx.dispatch(new AnnualPlanningsActions.Clear);
          ctx.dispatch(new ToastActions.Success('Dados de inspeção do Giants enviados para atualização no próximo ciclo de cálculo pré-exploratório'));
          ctx.dispatch(new Navigate(ANNUAL_PLANNING_LIST_PAGE_ROUTE));
        }
        else {
          ctx.dispatch(new ToastActions.Success('Planejamento Anual enviado para a fila de cálculo'));
        }
      })
    );
  }

  @Action(AnnualPlanningsActions.Delete)
  public delete$(ctx: StateContext<AnnualPlanningsStateModel>, action: AnnualPlanningsActions.Delete): Observable<void> {
    return this.apiService.deleteAsync(action.id).pipe(
      tap(() => {
        ctx.dispatch(new ToastActions.Success('Planejamento Anual excluído com sucesso'));
        ctx.patchState({
          items: [ ...ctx.getState().items.filter(x => x.id !== action.id) ]
        });
      })
    );
  }

  @Action(AnnualPlanningsActions.DownloadRtiData)
  public onDownloadRtiData(ctx: StateContext<AnnualPlanningsStateModel>, action: AnnualPlanningsActions.DownloadRtiData): void {
    this.apiDownloadsService.downloadAnnualPlanningRtiData(action.annualPlanningId, action.outputType);
  }

  @Action(AnnualPlanningsActions.DownloadInspectionData)
  public onDownloadInspectionData(ctx: StateContext<AnnualPlanningsStateModel>, action: AnnualPlanningsActions.DownloadInspectionData): void {
    this.apiDownloadsService.downloadAnnualPlanningInspectionData(action.annualPlanningId, action.outputType);
  }

  @Action(AnnualPlanningsActions.DownloadPaintingPlan)
  public onDownloadPaintingPlan(ctx: StateContext<AnnualPlanningsStateModel>, action: AnnualPlanningsActions.DownloadPaintingPlan): void {
    this.apiDownloadsService.downloadPaintingPlan(action.annualPlanningId, action.systemIds, action.selectedColumns);
  }

  @Action(AnnualPlanningsActions.DownloadPaintingPlanForEnviron)
  public onDownloadPaintingPlanForEnviron(ctx: StateContext<AnnualPlanningsStateModel>, action: AnnualPlanningsActions.DownloadPaintingPlanForEnviron): void {
    this.apiDownloadsService.downloadPaintingPlanForEnviron(action.data);
  }

  @Action(AnnualPlanningsActions.Clear)
  public clear(ctx: StateContext<AnnualPlanningsStateModel>): void {
    ctx.patchState({
      items: [],
      lastUpdated: null
    });
  }
}
