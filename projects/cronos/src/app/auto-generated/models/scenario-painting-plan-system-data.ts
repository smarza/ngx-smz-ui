

export interface ScenarioPaintingPlanSystemData {
  id: string;
  module: string;
  sector: string;
  system: string;
  area: number;
  productivity: number;
  corrosion: number;
  characteristic: string;
  temperature: number;
  humidity: number;
  windDirection: number;
  windIntensity: number;
  rtiAPre?: number;
  rtiBPre?: number;
  rtiCPre?: number;
  rtiDPre?: number;
  initialCorrodedArea: number;
  progression: number;
  corrosionForecast: number;
  corrodedAreaForecast: number;
  paintArea: number;
  requiredManHours?: number;
  team: string;
  hidroblastCenter: string;
  hidroblastCenterOperator: string;
  manHoursUsed: number;
  criticality: number;
  criticalityClass: string;
  rtiPreIndex?: number;
  rpp: string;
  epPriority: string;
  paintedArea: number;
  postPaintingCorrosion: number;
  postPaintingCorrodedArea: number;
  rtiAPost?: number;
  rtiBPost?: number;
  rtiCPost?: number;
  rtiDPost?: number;
  rtiPostIndex?: number;
}
