import { SmzEasyTableBuilder } from './state-builder';

export class SmzEasyTableOptimizationsBuilder {
  constructor(private _tableBuilder: SmzEasyTableBuilder) {
    this._tableBuilder._state.config.throttle.isEnabled = true;
    this._tableBuilder._state.globalSearch.isOptimized = true;
  }

  public disable(...optimizations: Array<'data-source' | 'global-search'>): SmzEasyTableOptimizationsBuilder {

    optimizations.forEach(optimization => {
      switch (optimization) {
        case 'data-source':
          this._tableBuilder._state.config.throttle.isEnabled = false;
          break;

        case 'global-search':
          this._tableBuilder._state.globalSearch.isOptimized = false;
          break;

        default:
          break;
      }
    });

    return this;
  }

  public disableDataSourceOtimization(miliseconds: number): SmzEasyTableOptimizationsBuilder {
    this._tableBuilder._state.config.throttle.method = 'fixed';
    this._tableBuilder._state.config.throttle.interval = miliseconds;
    return this;
  }
  public setDataSourceOtimization(method: 'auto' | 'fixed', initialInterval: number = 500, autoIncrementation: number = 200): SmzEasyTableOptimizationsBuilder {
    // autoIncrementation é o próximo intervalo de segurança.
    // Ele será calculado com base em xxx% sobre último tempo de preparação do dado.
    // Exemplo autoIncrementation = 200, significa que o próximo intervalo será 200% ou seja o dobro do último tempo de processamento registrado.
    // Isso evitará traffic jam no fluxo de dados.
    // Esta otimização irá garantir que o primeiro e o ultimo dado sejam visualizados na tabela, porém os intermediários serão administrados por esse intervalo seguro.

    this._tableBuilder._state.config.throttle.method = method;
    this._tableBuilder._state.config.throttle.interval = initialInterval;
    this._tableBuilder._state.config.throttle.incrementPercentage = autoIncrementation;
    return this;
  }

  public setGlobalSearchOtimization(initialInterval: number = 500, autoIncrementation: number = 200): SmzEasyTableOptimizationsBuilder {
    this._tableBuilder._state.globalSearch.isOptimized = true;
    this._tableBuilder._state.globalSearch.interval = initialInterval;
    this._tableBuilder._state.globalSearch.incrementPercentage = autoIncrementation;
    return this;
  }

  public get table(): SmzEasyTableBuilder {
    return this._tableBuilder;
  }

}
