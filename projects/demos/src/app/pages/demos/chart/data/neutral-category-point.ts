export class NeutralCategoryPoint {
  category: string;
  value: number;
  serieId: string;
  data: any[];

  constructor(category: string, value: number, data: any[]);
  constructor(serieId: string, category: string, value: number, data: any[]);
  constructor(...constructorArguments: any[]) {
    if (constructorArguments.length === 3) {
      this.category = constructorArguments[0];
      this.value = constructorArguments[1];
      this.data = constructorArguments[2] ?? [];
    } else {
      this.serieId = constructorArguments[0];
      this.category = constructorArguments[1];
      this.value = constructorArguments[2];
      this.data = constructorArguments[3] ?? [];
    }
  }
}
