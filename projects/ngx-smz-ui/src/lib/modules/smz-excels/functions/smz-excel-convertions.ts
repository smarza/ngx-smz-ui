export function getWidthInPoints(widthInPixeis: number, resolution: number = 72) {
  return Math.round(widthInPixeis * (resolution / 96));
}