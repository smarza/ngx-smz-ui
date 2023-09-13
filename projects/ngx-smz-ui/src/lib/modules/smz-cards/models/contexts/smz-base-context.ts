
export class SmzCardsBaseContext {
  protected state: { key: string }[] = [];
  protected propertyPath: string;
  public persisteStatus = false;
  public reset(data: any[]): void {}

}