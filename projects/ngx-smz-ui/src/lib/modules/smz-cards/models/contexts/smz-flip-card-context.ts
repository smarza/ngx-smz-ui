import { cloneDeep } from 'lodash-es';
import { ObjectUtils } from 'primeng/utils';
import { SmzCardsBaseContext } from './smz-base-context';
import { state } from '@angular/animations';


export type SmzFlipCardStatus = 'front' | 'back';
export type SmzFlipCardContextState = { key: string, status: SmzFlipCardStatus, timestamp: number };
export type SmzFlipCardChanges = { hasChanged: boolean, previous: SmzFlipCardContextState, current: SmzFlipCardContextState, all: SmzFlipCardContextState[] };

export class SmzFlipCardContext extends SmzCardsBaseContext {
  protected state: SmzFlipCardContextState[] = [];
  public propertyPath = 'id';

  // Quantidade de cartas que podem ficar viradas ao mesmo tempo. (-1 = sem restrição)
  private maxFlipCardsAllowed: number = -1;
  public flipBehavior: 'toggle' | 'none' = 'none';
  public unselectBehavior: 'none' | 'at-least-one-flipped' = 'none';
  public initialData: { key: any, status: SmzFlipCardStatus }[] = [];
  public dynamicInitialData: (data: any[]) => { key: any, status: SmzFlipCardStatus }[];
  public statusDataProperty: string;


  constructor() {
    super();
  }

  public reset(data: any[]): void {

    if (this.persisteStatus) {
      // Mantem o status
      this.resetKeepingStates(data);
    }
    else {
      // Usa sempre o status limpo
      this.cleanReset(data);
    }
  }

  public resetKeepingStates(data: any[]): void {

    this.state.forEach(x => x.timestamp = null);

    const timestamp = new Date().getTime();

    data?.forEach(item => {
      const key = ObjectUtils.resolveFieldData(item, this.propertyPath);

      let status: SmzFlipCardStatus = 'front';

      // Se houver statusDataProperty então o card pode iniciar em estados diferentes de frontal.
      if (this.statusDataProperty) {
        // Pega no dado a propriedade booleana chave que define se o card deverá iniciar virado ou não
        const value = ObjectUtils.resolveFieldData(item, this.statusDataProperty);

        if (value != null) {
          status = value == true ? 'back' : 'front';
        }
      }

      const match = this.state.find(x => x.key === key);

      if (match) {
        match.timestamp = timestamp;
      }
      else {
        this.state.push({ key, status, timestamp });
      }

    });

    this.state = this.state.filter(x => x.timestamp != null);

    const initialData = this.dynamicInitialData != null ? this.dynamicInitialData(data) : [];

    initialData.push(...this.initialData);

    initialData.forEach(item => {
      const entity = this.state.find(x => x.key === item.key);
      if (entity != null) {
        this.setFlipState(entity, item.status);
      }
    })

  }


  public cleanReset(data: any[]): void {

    this.state = [];

    const timestamp = new Date().getTime();

    data?.forEach(item => {
      const key = ObjectUtils.resolveFieldData(item, this.propertyPath);

      let status: SmzFlipCardStatus = 'front';

      // Se houver statusDataProperty então o card pode iniciar em estados diferentes de frontal.
      if (this.statusDataProperty) {
        // Pega no dado a propriedade booleana chave que define se o card deverá iniciar virado ou não
        const value = ObjectUtils.resolveFieldData(item, this.statusDataProperty);

        if (value != null) {
          status = value == true ? 'back' : 'front';
        }
      }

      this.state.push({ key, status, timestamp });
    });

    const initialData = this.dynamicInitialData != null ? this.dynamicInitialData(data) : [];

    initialData.push(...this.initialData);

    initialData.forEach(item => {
      const entity = this.state.find(x => x.key === item.key);
      if (entity != null) {
        this.setFlipState(entity, item.status);
      }
    })

  }

  public setCounts(count: number): void {
    this.maxFlipCardsAllowed = count;
  }

  public flip(data: any): SmzFlipCardChanges {
    const key = ObjectUtils.resolveFieldData(data, this.propertyPath);
    const entity = this.state.find(x => x.key === key);
    let backCount = this.state.filter(x => x.status == 'back').length;

    if (this.flipBehavior === 'toggle' && backCount >= this.maxFlipCardsAllowed) {
      this.state
        .filter(x => x.key != entity.key)
        .forEach(card => this.setFlipState(card, 'front'));
    }

    let previous = cloneDeep(entity);

    if (entity.status == 'back') {

      if (this.unselectBehavior === 'at-least-one-flipped') {
        backCount = this.state.filter(x => x.status == 'back').length;

        if (backCount > 1) {
          this.setFlipState(entity, 'front');
        }

      }
      else {
        this.setFlipState(entity, 'front');
      }

    }
    else if (this.maxFlipCardsAllowed > 0 && backCount < this.maxFlipCardsAllowed) {
      this.setFlipState(entity, 'back');
    }
    else {
      this.setFlipState(entity, 'back');
    }

    const hasChanged = previous.status !== entity.status;

    return { hasChanged, previous, current: entity, all: cloneDeep(this.state) };
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