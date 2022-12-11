import { ObjectUtils } from 'primeng/utils';
import { SmzCardsBaseContext } from './smz-base-context';

export class SmzFlipCardContext extends SmzCardsBaseContext {
  protected states: { key: string, state: boolean }[] = [];
  protected propertyPath = 'id';

  // Quantidade de cartas que podem ficar viradas ao mesmo tempo. (-1 = sem restrição)
  private maxFlipCardsAllowed: number = -1;

  constructor() {
    super();
  }

  public reset(data: any[]): void {

    this.states = [];

    data?.forEach(data => {
      const key = ObjectUtils.resolveFieldData(data, this.propertyPath);
      this.states.push({ key, state: false });
    });

  }

  public setCounts(count: number): void {
    this.maxFlipCardsAllowed = count;
  }

  public flip(data: any): void {
    const key = ObjectUtils.resolveFieldData(data, this.propertyPath);
    const entity = this.states.find(x => x.key === key);

    if (entity.state == true) {
      // Virar para front
      entity.state = false;
      return;
    }

    if (this.maxFlipCardsAllowed > 0) {
      const flippedCount = this.states.filter(x => x.state == true).length;
      if (flippedCount >= this.maxFlipCardsAllowed) {
        return;
      }
    }

    // Virar para back
    entity.state = true;
  }

  public getFlipState(data: any): boolean {
    const key = ObjectUtils.resolveFieldData(data, this.propertyPath);
    const entity = this.states.find(x => x.key === key);
    return entity.state;
  }

}