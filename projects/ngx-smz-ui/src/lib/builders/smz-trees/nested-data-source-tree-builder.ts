import { SmzTreeNestedData } from '../../modules/smz-trees/models/tree-state';
import { createTreeFromNestedData } from '../common/utils';
import { SmzTreeBuilder } from './tree-builder';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzDataSourceTreeBuilder } from './data-source-tree-builder';

export class SmzNestedDataSourceTreeBuilder extends SmzBuilderUtilities<SmzNestedDataSourceTreeBuilder> {
  protected that = this;
  private _nestedConfig: SmzTreeNestedData = null;
  constructor(private _treeBuilder: SmzTreeBuilder, private _dataSourceBuilder: SmzDataSourceTreeBuilder, type: string) {
    super();

    this._nestedConfig = {
      type,
      labelKey: 'name',
      valueKey: 'id',
      nodeOverridesConfig: {
        nodeOverrides: {},
        conditionalSelection: () => undefined
      },
      group: {
        makeChildrenAsGroup: false,
        label: null,
        key: null,
        type: null,
        nodeOverridesConfig: {
          nodeOverrides: {},
          conditionalSelection: () => undefined
        },
      },
      dataType: 'same',
      children: []
    };

  }

  public addChild(key: string): SmzNestedChildTreeBuilder<SmzNestedDataSourceTreeBuilder> {

    const child: SmzTreeNestedData = {
      key,
      type: key,
      labelKey: 'name',
      valueKey: 'id',
      nodeOverridesConfig: {
        nodeOverrides: {},
        conditionalSelection: () => undefined
      },
      group: {
        makeChildrenAsGroup: false,
        label: null,
        key: null,
        type: null,
        nodeOverridesConfig: {
          nodeOverrides: {},
          conditionalSelection: () => undefined
        },
      },
      dataType: 'same',
      children: []
    };

    this._nestedConfig.children.push(child);

    return new SmzNestedChildTreeBuilder(this.that, child);
  }

  public makeAsGroup(label: string): SmzNestedGroupTreeBuilder<SmzNestedDataSourceTreeBuilder> {
    return new SmzNestedGroupTreeBuilder<SmzNestedDataSourceTreeBuilder>(this.that, this._nestedConfig, label);
  }

  public setIcon(icon: string): SmzNestedDataSourceTreeBuilder {
    this._nestedConfig.nodeOverridesConfig.nodeOverrides.icon = icon;
    return this.that;
  }

  public setType(type: string): SmzNestedDataSourceTreeBuilder {
    this._nestedConfig.type = type;
    return this.that;
  }

  public setDataAsSimpleNamedEntity(): SmzNestedDataSourceTreeBuilder {
    this._nestedConfig.dataType = 'simpleNamedEntity';
    return this.that;
  }

  public disableSelection(): SmzNestedDataSourceTreeBuilder {
    this._nestedConfig.nodeOverridesConfig.nodeOverrides.selectable = false;
    return this.that;
  }

  public conditionalSelection(callback: (item: any) => boolean): SmzNestedDataSourceTreeBuilder {
    this._nestedConfig.nodeOverridesConfig.conditionalSelection = callback;
    return this.that;
  }

  public get dataSource(): SmzDataSourceTreeBuilder {

    if (this._nestedConfig != null) {
      this._treeBuilder._state.content.dataTransform = (items: any[]) => {
        return createTreeFromNestedData(items, this._nestedConfig);
      }
    }

    return this._dataSourceBuilder;
  }

}

export class SmzNestedChildTreeBuilder<TBuilder> extends SmzBuilderUtilities<SmzNestedChildTreeBuilder<TBuilder>> {
  protected that = this;
  constructor(private _builder: TBuilder, private _nestedConfig: SmzTreeNestedData) {
    super();
  }

  public addChild(key: string): SmzNestedChildTreeBuilder<SmzNestedChildTreeBuilder<TBuilder>> {

    const child: SmzTreeNestedData = {
      key,
      type: key,
      labelKey: 'name',
      valueKey: 'id',
      nodeOverridesConfig: {
        nodeOverrides: {},
        conditionalSelection: () => undefined
      },
      group: {
        makeChildrenAsGroup: false,
        label: null,
        key: null,
        type: null,
        nodeOverridesConfig: {
          nodeOverrides: {},
          conditionalSelection: () => undefined
        },
      },
      dataType: 'same',
      children: []
    };

    this._nestedConfig.children.push(child);

    return new SmzNestedChildTreeBuilder<SmzNestedChildTreeBuilder<TBuilder>>(this.that, child);
  }

  public makeAsGroup(label: string): SmzNestedGroupTreeBuilder<SmzNestedChildTreeBuilder<TBuilder>> {
    return new SmzNestedGroupTreeBuilder<SmzNestedChildTreeBuilder<TBuilder>>(this.that, this._nestedConfig, label);
  }

  public setDataAsSimpleNamedEntity(): SmzNestedChildTreeBuilder<TBuilder> {
    this._nestedConfig.dataType = 'simpleNamedEntity';
    return this.that;
  }

  public removeParentPropertiesFromData(): SmzNestedChildTreeBuilder<TBuilder> {
    this._nestedConfig.dataType = 'clean';
    return this.that;
  }

  public setIcon(icon: string): SmzNestedChildTreeBuilder<TBuilder> {
    this._nestedConfig.nodeOverridesConfig.nodeOverrides.icon = icon;
    return this.that;
  }

  public setType(type: string): SmzNestedChildTreeBuilder<TBuilder> {
    this._nestedConfig.type = type;
    return this.that;
  }

  public disableSelection(): SmzNestedChildTreeBuilder<TBuilder> {
    this._nestedConfig.nodeOverridesConfig.nodeOverrides.selectable = false;
    return this.that;
  }

  public conditionalSelection(callback: (item: any) => boolean): SmzNestedChildTreeBuilder<TBuilder> {
    this._nestedConfig.nodeOverridesConfig.conditionalSelection = callback;
    return this.that;
  }

  public get back(): TBuilder {
    return this._builder;
  }

}

export class SmzNestedGroupTreeBuilder<TBuilder> extends SmzBuilderUtilities<SmzNestedGroupTreeBuilder<TBuilder>> {
  protected that = this;
  constructor(private _builder: TBuilder, private _nestedConfig: SmzTreeNestedData, private label: string) {
    super();

    _nestedConfig.group.makeChildrenAsGroup = true;
    this._nestedConfig.group.label = label;
  }

  public setKey(key: string): SmzNestedGroupTreeBuilder<TBuilder> {
    this._nestedConfig.group.key = key;
    return this.that;
  }

  public setType(type: string): SmzNestedGroupTreeBuilder<TBuilder> {
    this._nestedConfig.group.type = type;
    return this.that;
  }

  public setIcon(icon: string): SmzNestedGroupTreeBuilder<TBuilder> {
    this._nestedConfig.group.nodeOverridesConfig.nodeOverrides.icon = icon;
    return this.that;
  }

  public setDataAsSimpleNamedEntity(): SmzNestedGroupTreeBuilder<TBuilder> {
    this._nestedConfig.dataType = 'simpleNamedEntity';
    return this.that;
  }

  public disableSelection(): SmzNestedGroupTreeBuilder<TBuilder> {
    this._nestedConfig.group.nodeOverridesConfig.nodeOverrides.selectable = false;
    return this.that;
  }

  public conditionalSelection(callback: (item: any) => boolean): SmzNestedGroupTreeBuilder<TBuilder> {
    this._nestedConfig.group.nodeOverridesConfig.conditionalSelection = callback;
    return this.that;
  }

  public get child(): TBuilder {
    return this._builder;
  }

}