import { cloneDeep } from 'lodash-es';
import { ObjectUtils } from 'primeng/utils';
import { SmzCardsBaseContext } from './smz-base-context';


export type SmzFlipCardStatus = 'front' | 'back';
export type SmzFlipCardContextState = { key: string, status: SmzFlipCardStatus, timestamp: number };
export type SmzFlipCardChanges = { hasChanged: boolean, previous: SmzFlipCardContextState, current: SmzFlipCardContextState, all: SmzFlipCardContextState[] };

export class SmzFlipCardContext extends SmzCardsBaseContext {
  protected state: SmzFlipCardContextState[] = [];
  protected propertyPath = 'id';

  // Quantidade de cartas que podem ficar viradas ao mesmo tempo. (-1 = sem restrição)
  private maxFlipCardsAllowed: number = -1;
  public flipBehavior: 'toggle' | 'none' = 'none';

  constructor() {
    super();
  }

  public reset(data: any[]): void {

    this.state = [];

    const timestamp = new Date().getTime();

    data?.forEach(data => {
      const key = ObjectUtils.resolveFieldData(data, this.propertyPath);
      this.state.push({ key, status: 'front', timestamp });
    });

  }

  public setCounts(count: number): void {
    this.maxFlipCardsAllowed = count;
  }

  public flip(data: any): SmzFlipCardChanges {
    const key = ObjectUtils.resolveFieldData(data, this.propertyPath);
    const entity = this.state.find(x => x.key === key);
    const flippedCount = this.state.filter(x => x.status == 'back').length;

    console.log(data.id, this.flipBehavior);
    if (this.flipBehavior === 'toggle' && flippedCount >= this.maxFlipCardsAllowed) {
      this.state
        .filter(x => x.key != entity.key)
        .forEach(card => this.setFlipState(card, 'front'));
    }

    let previous = cloneDeep(entity);

    if (entity.status == 'back') {
      this.setFlipState(entity, 'front');
    }
    else if (this.maxFlipCardsAllowed > 0 && flippedCount < this.maxFlipCardsAllowed) {
      this.setFlipState(entity, 'back');
    }
    else {
      this.setFlipState(entity, 'back');
    }

    const hasChanged = previous.status !== entity.status;

    return { hasChanged, previous, current: entity, all: cloneDeep(this.state)};
  }

  public getFlipState(data: any): SmzFlipCardStatus {
    const key = ObjectUtils.resolveFieldData(data, this.propertyPath);
    const entity = this.state.find(x => x.key === key);
    return entity.status;
  }

  public setFlipState(card: SmzFlipCardContextState, status: 'front' | 'back'): void {
    card.timestamp = new Date().getTime();
    card.status = status;
  }

}