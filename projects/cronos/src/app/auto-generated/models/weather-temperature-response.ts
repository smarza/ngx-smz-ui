import { WeatherTemperatureData } from '@models/weather-temperature-data';

export interface WeatherTemperatureResponse {
  success: boolean;
  data: WeatherTemperatureData[];
}
