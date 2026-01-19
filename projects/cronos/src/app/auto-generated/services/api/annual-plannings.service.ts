import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { BaseApiService } from '@ngx-smz/core';
import { AnnualPlanningListItem } from '@models/annual-planning-list-item';
import { fixDates } from '@ngx-smz/core';
import { SelectPaintingPlan } from '@models/select-painting-plan';
import { AnnualPlanningDetails } from '@models/annual-planning-details';
import { CreateAnnualPlanningFromGiants } from '@models/create-annual-planning-from-giants';
import { CreateAnnualPlanningFromSpreadsheet } from '@models/create-annual-planning-from-spreadsheet';
import { CreateAnnualPlanningFromSpreadsheetResponse } from '@models/create-annual-planning-from-spreadsheet-response';
import { UpdateAnnualPlanning } from '@models/update-annual-planning';
import { UpdateInspectionDataFromSpreadsheet } from '@models/update-inspection-data-from-spreadsheet';
import { UpdateInspectionDataFromSpreadsheetResponse } from '@models/update-inspection-data-from-spreadsheet-response';
import { UpdateRtiData } from '@models/update-rti-data';
import { ScenarioListItem } from '@models/scenario-list-item';
import { CalculatePreliminaryResults } from '@models/calculate-preliminary-results';
import { AnnualPlanningHistory } from '@models/annual-planning-history';
import { map } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class AnnualPlanningsService extends BaseApiService {
  private endpoint = `${environment.serverUrl}/api/annual-plannings`;

  constructor(private readonly http: HttpClient) {
    super();
  }

  public allAsync(): Observable<AnnualPlanningListItem[]> {
    return this.http.get<AnnualPlanningListItem[]>(`${this.endpoint}`, this.generateDefaultHeaders({})).pipe(
      fixDates()
    );
  }
  public selectPaintingPlan(data: SelectPaintingPlan): Observable<AnnualPlanningDetails> {
    return this.http.post<AnnualPlanningDetails>(`${this.endpoint}/select-plan`, data, this.generateDefaultHeaders({})).pipe(
      fixDates()
    );
  }
  public createFromGiantsAsync(data: CreateAnnualPlanningFromGiants): Observable<AnnualPlanningListItem> {
    return this.http.post<AnnualPlanningListItem>(`${this.endpoint}/create-from-giants`, data, this.generateDefaultHeaders({})).pipe(
      fixDates()
    );
  }
  public createFromSpreadsheetAsync(data: CreateAnnualPlanningFromSpreadsheet): Observable<CreateAnnualPlanningFromSpreadsheetResponse> {
    return this.http.post<CreateAnnualPlanningFromSpreadsheetResponse>(`${this.endpoint}/create-from-spreadsheet`, data, this.generateDefaultHeaders({}));
  }
  public updateAsync(data: UpdateAnnualPlanning): Observable<AnnualPlanningListItem> {
    return this.http.put<AnnualPlanningListItem>(`${this.endpoint}`, data, this.generateDefaultHeaders({})).pipe(
      fixDates()
    );
  }
  public deleteAsync(id: string): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`, this.generateDefaultHeaders({}));
  }
  public updateInspectionDataSpreadsheetAsync(data: UpdateInspectionDataFromSpreadsheet): Observable<UpdateInspectionDataFromSpreadsheetResponse> {
    return this.http.post<UpdateInspectionDataFromSpreadsheetResponse>(`${this.endpoint}/update/inspection-data-spreadsheet`, data, this.generateDefaultHeaders({}));
  }
  public updateRtiDataAsync(data: UpdateRtiData): Observable<AnnualPlanningDetails> {
    return this.http.post<AnnualPlanningDetails>(`${this.endpoint}/update/rti-data`, data, this.generateDefaultHeaders({})).pipe(
      fixDates()
    );
  }
  public getAnnualPlanningDetailsAsync(id: string): Observable<AnnualPlanningDetails> {
    return this.http.get<AnnualPlanningDetails>(`${this.endpoint}/${id}`, this.generateDefaultHeaders({})).pipe(
      fixDates(),
      map(x => {
        const firstScenario = x.scenarios[0];
        const duplicatedScenarios = x.scenarios.slice(1).flatMap(y => Array.from({ length: 10 }, (_, i) => ({ ...y, id: y.id + (i + 1).toString() })));
        return { ...x, scenarios: [firstScenario, ...duplicatedScenarios] };
      }),
      tap(x => console.log('x', x))
    );
  }
  public getAnnualPlanningScenarioListItemsAsync(planningId: string): Observable<ScenarioListItem[]> {
    return this.http.get<ScenarioListItem[]>(`${this.endpoint}/scenarios/${planningId}`, this.generateDefaultHeaders({})).pipe(
      fixDates()
    );
  }
  public calculatePreliminaryResultsAsync(data: CalculatePreliminaryResults): Observable<AnnualPlanningListItem> {
    return this.http.post<AnnualPlanningListItem>(`${this.endpoint}/calculate/preliminary`, data, this.generateDefaultHeaders({})).pipe(
      fixDates()
    );
  }
  public getAnnualPlanningHistoryAsync(id: string): Observable<AnnualPlanningHistory[]> {
    return this.http.get<AnnualPlanningHistory[]>(`${this.endpoint}/history/${id}`, this.generateDefaultHeaders({})).pipe(
      fixDates()
    );
  }
}

