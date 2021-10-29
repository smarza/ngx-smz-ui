
import { VERTICAL_BAR } from '../data/chart-data-original';
import { DemoKeys } from '@demos/demo-keys';
import { VERTICAL_BAR_CSHARP } from '../data/chart-data-csharp';

export const ChartsDemo: { [key: string]: () => void } = {
  //
  [DemoKeys.CHARTS_VERTICAL_BAR]: () => {
    return { model: VERTICAL_BAR, cSharp: VERTICAL_BAR_CSHARP }
  },
}

