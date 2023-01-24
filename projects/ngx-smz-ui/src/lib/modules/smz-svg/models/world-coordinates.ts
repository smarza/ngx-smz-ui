
export interface SmzSvgRefPoint { longitude: number; latitude: number; rootPosX: number; rootPosY: number; }

export class SmzSvgWorldCoordinates {
  private refPoints: SmzSvgRefPoint[] = [];

  private linearCoeficientX: number;
  private linearCoeficientY: number;

  private xCompensation: number;

  private yCompensation: number;

  constructor(
    private worldWidth: number,
    private worldHeight: number,
    private mapWidth: number,
    private mapHeight: number
  ) {}

  public convert(lon: number, lat: number): { x: number, y: number } {

    const x = (this.refPoints[0].rootPosX + (lon - this.refPoints[0].longitude) * this.linearCoeficientX) + this.xCompensation;
    const y = (this.refPoints[0].rootPosY + (lat - this.refPoints[0].latitude) * this.linearCoeficientY) + this.yCompensation;

    return { x: x, y: y };
  }

  public setRefPoint(points: SmzSvgRefPoint[]): void {
    this.refPoints.push(...points);
    this.calcLinearCoeficients();
    this.calcScaleFactor();
  }

  private calcLinearCoeficients(): void {
    this.linearCoeficientX = (this.refPoints[1].rootPosX - this.refPoints[0].rootPosX) / (this.refPoints[1].longitude - this.refPoints[0].longitude);
    this.linearCoeficientY = (this.refPoints[1].rootPosY - this.refPoints[0].rootPosY) / (this.refPoints[1].latitude - this.refPoints[0].latitude);
  }

  private calcScaleFactor(): void {
    this.xCompensation = (this.worldWidth - this.mapWidth) / 2;
    this.yCompensation = (this.worldHeight - this.mapHeight) / 2;
  }

  public getWorldWidth(): number {
    return this.worldWidth;
  }

}

