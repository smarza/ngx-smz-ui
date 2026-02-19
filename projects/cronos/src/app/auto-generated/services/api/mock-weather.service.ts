import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { BaseApiService } from '@ngx-smz/core';
import { WeatherWindResponse } from '@models/weather-wind-response';
import { WeatherHumidityResponse } from '@models/weather-humidity-response';
import { WeatherTemperatureResponse } from '@models/weather-temperature-response';


@Injectable({ providedIn: 'root' })
export class MockWeatherService extends BaseApiService {
  private endpoint = `${environment.serverUrl}/api/mock-weather`;

  constructor(private readonly http: HttpClient) {
    super();
  }

  public getMockWeatherWindAsync(): Observable<WeatherWindResponse> {
    return this.http.get<WeatherWindResponse>(`${this.endpoint}/v1/dadosaprovados/Wind`, this.generateDefaultHeaders({}));
  }
  public getMockWeatherHumidityAsync(): Observable<WeatherHumidityResponse> {
    return this.http.get<WeatherHumidityResponse>(`${this.endpoint}/v1/dadosaprovados/Humidity`, this.generateDefaultHeaders({}));
  }
  public getMockWeatherTemperatureAsync(): Observable<WeatherTemperatureResponse> {
    return this.http.get<WeatherTemperatureResponse>(`${this.endpoint}/v1/dadosaprovados/Temperature`, this.generateDefaultHeaders({}));
  }
}

