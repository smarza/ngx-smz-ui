import { WeatherHumidityData } from '@models/weather-humidity-data';

export interface WeatherHumidityResponse {
  success: boolean;
  data: WeatherHumidityData[];
}
