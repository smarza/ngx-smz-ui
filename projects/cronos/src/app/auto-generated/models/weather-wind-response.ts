import { WeatherWindData } from '@models/weather-wind-data';

export interface WeatherWindResponse {
  success: boolean;
  data: WeatherWindData[];
}
