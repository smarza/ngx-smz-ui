export class NeutralDatePoint {
  date: Date;
  value: number;
  serieId: string;
  data: any[];

  constructor(serieId: string, date: Date, value: number, data: any[] = null) {
    this.serieId = serieId;
    this.date = date;
    this.value = value;
    this.data = data ?? [];
  }
}
