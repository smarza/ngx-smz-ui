import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { BaseApiService } from '@ngx-smz/core';
import { ScenarioDetails } from '@models/scenario-details';
import { fixDates } from '@ngx-smz/core';
import { CreateScenarioWithCorrosionGoalStrategy } from '@models/create-scenario-with-corrosion-goal-strategy';
import { ScenarioListItem } from '@models/scenario-list-item';
import { CreateScenarioWithAvailableManHourStrategy } from '@models/create-scenario-with-available-man-hour-strategy';
import { CreateScenarioWithCriticityStrategy } from '@models/create-scenario-with-criticity-strategy';
import { CreateScenarioWithRtiStrategy } from '@models/create-scenario-with-rti-strategy';
import { CreateScenarioWithPrioritizationStrategy } from '@models/create-scenario-with-prioritization-strategy';
import { UpdateScenarioWithCorrosionGoalStrategy } from '@models/update-scenario-with-corrosion-goal-strategy';
import { UpdateScenarioWithAvailableManHourStrategy } from '@models/update-scenario-with-available-man-hour-strategy';
import { UpdateScenarioWithCriticityStrategy } from '@models/update-scenario-with-criticity-strategy';
import { UpdateScenarioWithRtiStrategy } from '@models/update-scenario-with-rti-strategy';
import { UpdateScenarioWithPrioritizationStrategy } from '@models/update-scenario-with-prioritization-strategy';
import { UpdateScenarioPostOptimization } from '@models/update-scenario-post-optimization';
import { CalculateScenarioResults } from '@models/calculate-scenario-results';
import { CompareScenarios } from '@models/compare-scenarios';
import { ScenarioComparison } from '@models/scenario-comparison';


@Injectable({ providedIn: 'root' })
export class ScenariosService extends BaseApiService {
  private endpoint = `${environment.serverUrl}/api/scenarios`;

  constructor(private readonly http: HttpClient) {
    super();
  }

  public getScenarioDetailsAsync(id: string): Observable<ScenarioDetails> {
    return this.http.get<ScenarioDetails>(`${this.endpoint}/${id}`, this.generateDefaultHeaders({})).pipe(
      fixDates()
    );
  }
  public createWithCorrosionGoalStrategyAsync(data: CreateScenarioWithCorrosionGoalStrategy): Observable<ScenarioListItem> {
    return this.http.post<ScenarioListItem>(`${this.endpoint}/create-corrosion-goal`, data, this.generateDefaultHeaders({})).pipe(
      fixDates()
    );
  }
  public createWithAvailableManHourStrategyAsync(data: CreateScenarioWithAvailableManHourStrategy): Observable<ScenarioListItem> {
    return this.http.post<ScenarioListItem>(`${this.endpoint}/create-available-man-hour`, data, this.generateDefaultHeaders({})).pipe(
      fixDates()
    );
  }
  public createWithCriticityStrategyAsync(data: CreateScenarioWithCriticityStrategy): Observable<ScenarioListItem> {
    return this.http.post<ScenarioListItem>(`${this.endpoint}/create-criticity`, data, this.generateDefaultHeaders({})).pipe(
      fixDates()
    );
  }
  public createWithRtiStrategyAsync(data: CreateScenarioWithRtiStrategy): Observable<ScenarioListItem> {
    return this.http.post<ScenarioListItem>(`${this.endpoint}/create-rti`, data, this.generateDefaultHeaders({})).pipe(
      fixDates()
    );
  }
  public createWithPrioritizationStrategyAsync(data: CreateScenarioWithPrioritizationStrategy): Observable<ScenarioListItem> {
    return this.http.post<ScenarioListItem>(`${this.endpoint}/create-prioritization`, data, this.generateDefaultHeaders({})).pipe(
      fixDates()
    );
  }
  public updateWithCorrosionGoalStrategyAsync(data: UpdateScenarioWithCorrosionGoalStrategy): Observable<void> {
    return this.http.post<void>(`${this.endpoint}/update-corrosion-goal`, data, this.generateDefaultHeaders({}));
  }
  public updateWithAvailableManHourStrategyAsync(data: UpdateScenarioWithAvailableManHourStrategy): Observable<void> {
    return this.http.post<void>(`${this.endpoint}/update-available-man-hour`, data, this.generateDefaultHeaders({}));
  }
  public updateWithCriticityStrategyAsync(data: UpdateScenarioWithCriticityStrategy): Observable<void> {
    return this.http.post<void>(`${this.endpoint}/update-criticity`, data, this.generateDefaultHeaders({}));
  }
  public updateWithRtiStrategyAsync(data: UpdateScenarioWithRtiStrategy): Observable<void> {
    return this.http.post<void>(`${this.endpoint}/update-rti`, data, this.generateDefaultHeaders({}));
  }
  public updateWithPrioritizationStrategyAsync(data: UpdateScenarioWithPrioritizationStrategy): Observable<void> {
    return this.http.post<void>(`${this.endpoint}/update-prioritization`, data, this.generateDefaultHeaders({}));
  }
  public updateScenarioPostOptimizationAsync(data: UpdateScenarioPostOptimization): Observable<ScenarioListItem> {
    return this.http.post<ScenarioListItem>(`${this.endpoint}/update-post-optimization`, data, this.generateDefaultHeaders({})).pipe(
      fixDates()
    );
  }
  public deleteAsync(id: string): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`, this.generateDefaultHeaders({}));
  }
  public calculateScenarioResultsAsync(data: CalculateScenarioResults): Observable<ScenarioListItem> {
    return this.http.post<ScenarioListItem>(`${this.endpoint}/calculate/scenario`, data, this.generateDefaultHeaders({})).pipe(
      fixDates()
    );
  }
  public compareScenariosAsync(data: CompareScenarios): Observable<ScenarioComparison> {
    return this.http.post<ScenarioComparison>(`${this.endpoint}/compare`, data, this.generateDefaultHeaders({})).pipe(
      fixDates()
    );
  }
}

