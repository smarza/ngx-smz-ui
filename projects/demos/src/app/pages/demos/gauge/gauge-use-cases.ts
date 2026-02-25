import { SmzGaugeBuilder, SmzGaugeState } from '@ngx-smz/core';
import { interval, map, of, takeWhile } from 'rxjs';

export interface GaugeUseCase {
  id: string;
  title: string;
  getConfig: () => SmzGaugeState;
  snippet: string;
}

function createRangeObservable(min: number, max: number, durationMs: number) {
  const step = (max - min) / durationMs;

  return interval(100).pipe(
    map((tick) => min + step * tick * 100),
    takeWhile((value) => value <= max)
  );
}

function buildBasicGauge(): SmzGaugeState {
  return new SmzGaugeBuilder()
    .withSize(250)
    .withTitle('CPU Usage')
    .withTitleStyle('font-bold text-2xl')
    .withValue(of(72))
    .withRange(0, 100)
    .withUnit('%')
    .withBackgroundColor('#e6e6e6')
    .withFont('bold', '#000000')
    .withMinMaxFont('bold', '#000000')
    .addThreshold()
      .withValue(30)
      .withColor('#2a9d8f')
      .gauge
    .addThreshold()
      .withValue(70)
      .withColor('#e9c46a')
      .gauge
    .addThreshold()
      .withValue(100)
      .withColor('#e76f51')
      .gauge
    .build();
}

function buildAnimatedGauge(): SmzGaugeState {
  return new SmzGaugeBuilder()
    .withSize(250)
    .withTitle('Progress')
    .withTitleStyle('font-bold text-2xl')
    .withValue(createRangeObservable(0, 100, 8000))
    .withValueThrottleTime(100)
    .withDecimalPlaces(1, false)
    .withRange(0, 100)
    .withUnit('%')
    .withBackgroundColor('#e6e6e6')
    .withFont('bold', '#000000')
    .withMinMaxFont('bold', '#000000')
    .addThreshold()
      .withValue(25)
      .withColor('#264653')
      .gauge
    .addThreshold()
      .withValue(50)
      .withColor('#2a9d8f')
      .gauge
    .addThreshold()
      .withValue(75)
      .withColor('#e9c46a')
      .gauge
    .addThreshold()
      .withValue(100)
      .withColor('#e76f51')
      .gauge
    .build();
}

function buildTemperatureGauge(): SmzGaugeState {
  return new SmzGaugeBuilder()
    .withSize(200)
    .withTitle('Temperature')
    .withTitleStyle('font-bold text-xl')
    .withValue(of(37.5))
    .withDecimalPlaces(1, false)
    .withRange(30, 45)
    .withUnit('°C')
    .withBackgroundColor('#e6e6e6')
    .withFont('bold', '#000000')
    .withMinMaxFont('bold', '#666666')
    .addThreshold()
      .withValue(36)
      .withColor('#3b82f6')
      .gauge
    .addThreshold()
      .withValue(38)
      .withColor('#22c55e')
      .gauge
    .addThreshold()
      .withValue(40)
      .withColor('#f59e0b')
      .gauge
    .addThreshold()
      .withValue(45)
      .withColor('#ef4444')
      .gauge
    .build();
}

function buildPrecisionGauge(): SmzGaugeState {
  return new SmzGaugeBuilder()
    .withSize(250)
    .withTitle('Pressure')
    .withTitleStyle('font-bold text-2xl')
    .withValue(createRangeObservable(40, 50, 10000))
    .withValueThrottleTime(100)
    .withDecimalPlaces(2, false)
    .withRange(40, 50)
    .withUnit('bar')
    .withBackgroundColor('#e6e6e6')
    .withFont('bold', '#000000')
    .withMinMaxFont('bold', '#000000')
    .addThreshold()
      .withValue(40)
      .withColor('#e76f51')
      .gauge
    .addThreshold()
      .withValue(45)
      .withColor('#e9c46a')
      .gauge
    .addThreshold()
      .withValue(50)
      .withColor('#264653')
      .gauge
    .build();
}

// ────────────────────────────────────────────────────────
// Snippets
// ────────────────────────────────────────────────────────

const SNIPPET_BASIC = `new SmzGaugeBuilder()
  .withSize(250)
  .withTitle('CPU Usage')
  .withTitleStyle('font-bold text-2xl')
  .withValue(72)
  .withRange(0, 100)
  .withUnit('%')
  .withBackgroundColor('#e6e6e6')
  .withFont('bold', '#000000')
  .withMinMaxFont('bold', '#000000')
  .addThreshold()
    .withValue(30).withColor('#2a9d8f').gauge
  .addThreshold()
    .withValue(70).withColor('#e9c46a').gauge
  .addThreshold()
    .withValue(100).withColor('#e76f51').gauge
  .build();`;

const SNIPPET_ANIMATED = `// Observable value animating from 0 to 100.
new SmzGaugeBuilder()
  .withSize(250)
  .withTitle('Progress')
  .withValue(createRangeObservable(0, 100, 8000))
  .withValueThrottleTime(100)
  .withDecimalPlaces(1, false)
  .withRange(0, 100)
  .withUnit('%')
  .addThreshold()
    .withValue(25).withColor('#264653').gauge
  .addThreshold()
    .withValue(50).withColor('#2a9d8f').gauge
  .addThreshold()
    .withValue(75).withColor('#e9c46a').gauge
  .addThreshold()
    .withValue(100).withColor('#e76f51').gauge
  .build();`;

const SNIPPET_TEMPERATURE = `new SmzGaugeBuilder()
  .withSize(200)
  .withTitle('Temperature')
  .withValue(37.5)
  .withDecimalPlaces(1, false)
  .withRange(30, 45)
  .withUnit('°C')
  .addThreshold()
    .withValue(36).withColor('#3b82f6').gauge
  .addThreshold()
    .withValue(38).withColor('#22c55e').gauge
  .addThreshold()
    .withValue(40).withColor('#f59e0b').gauge
  .addThreshold()
    .withValue(45).withColor('#ef4444').gauge
  .build();`;

const SNIPPET_PRECISION = `// Observable value with 2 decimal places (40–50 bar).
new SmzGaugeBuilder()
  .withSize(250)
  .withTitle('Pressure')
  .withValue(createRangeObservable(40, 50, 10000))
  .withValueThrottleTime(100)
  .withDecimalPlaces(2, false)
  .withRange(40, 50)
  .withUnit('bar')
  .addThreshold()
    .withValue(40).withColor('#e76f51').gauge
  .addThreshold()
    .withValue(45).withColor('#e9c46a').gauge
  .addThreshold()
    .withValue(50).withColor('#264653').gauge
  .build();`;

export const GAUGE_USE_CASES: GaugeUseCase[] = [
  { id: 'basic', title: 'Basic', getConfig: buildBasicGauge, snippet: SNIPPET_BASIC },
  { id: 'animated', title: 'Animated', getConfig: buildAnimatedGauge, snippet: SNIPPET_ANIMATED },
  { id: 'temperature', title: 'Temperature', getConfig: buildTemperatureGauge, snippet: SNIPPET_TEMPERATURE },
  { id: 'precision', title: 'Precision', getConfig: buildPrecisionGauge, snippet: SNIPPET_PRECISION },
];
