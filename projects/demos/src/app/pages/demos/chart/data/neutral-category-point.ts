export class NeutralCategoryPoint {
  category: string;
  value: number;
  serieId: string;
  data: any[];

  constructor(category: string, value: number, data: any[]);
  constructor(serieId: string, category: string, value: number, data: any[]);
  constructor(...params: any[]) {
    if (params.length === 3) {
      this.category = params[0];
      this.value = params[1];
      this.data = params[2] ?? [];
    } else {
      this.serieId = params[0];
      this.category = params[1];
      this.value = params[2];
      this.data = params[3] ?? [];
    }
  }
}
