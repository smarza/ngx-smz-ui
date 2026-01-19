import { SimpleNamedEntity } from '@ngx-smz/core';

export interface ScenarioSystemResults {
  id: string;
  team: SimpleNamedEntity;
  hidroblastCenter: string;
  manHours: number;
  module: string;
  sector: string;
  sectorDisplayName: string;
  system: string;
  paintedArea: number;
  postPaintingCorrosion: number;
  postPaintingCorrodedArea: number;
  rtiAPost?: number;
  rtiBPost?: number;
  rtiCPost?: number;
  rtiDPost?: number;
  rtiPostIndex?: number;
}
