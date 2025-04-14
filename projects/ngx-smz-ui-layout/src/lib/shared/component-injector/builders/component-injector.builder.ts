import { ComponentType } from '@angular/cdk/overlay';
import { ComponentDataBase, InjectableComponent } from '../interfaces/injectable';

export class BaseComponentInjectorBuilder<TCaller, TItem extends InjectableComponent<ComponentDataBase>> {
  protected _caller: TCaller;
  protected _item: TItem;

  constructor(caller: TCaller, item: TItem, component: ComponentType<ComponentDataBase> | null) {
    this._caller = caller;
    this._item = item;
    this._item.component = component;
  }

  public addInput<T>(inputKey: string, inputData: T): this {
    this._item.inputs.push({ key: inputKey, data: inputData });
    return this;
  }

  public addOutput<T>(outputKey: string, outputCallback: (data: T) => void): this {
    this._item.outputs.push({ key: outputKey, callback: outputCallback });
    return this;
  }

  public build(): TItem {
    return this._item as TItem;
  }

}

export class ComponentInjectorBuilder<TCaller, TItem extends InjectableComponent<ComponentDataBase>> extends BaseComponentInjectorBuilder<TCaller, TItem> {
  public get back(): TCaller {
    return this._caller;
  }
}