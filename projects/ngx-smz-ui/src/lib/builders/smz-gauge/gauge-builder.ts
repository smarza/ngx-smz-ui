import { Observable } from 'rxjs';
import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzGaugeState, SmzGaugeThreshold } from '../../modules/smz-gauge/smz-gauge.types';

/**
 * Classe para construir o estado de um Gauge (medidor) com configurações dinâmicas e personalizadas.
 * Utiliza o padrão de projeto Builder para facilitar a criação de configurações complexas.
 *
 * @example
 * ```typescript
 * // Exemplo de uso do SmzGaugeBuilder
 * import { SmzGaugeBuilder } from './path/to/SmzGaugeBuilder';
 * import { createRangeObservable } from './path/to/observable-helper';
 *
 * const gauge = new SmzGaugeBuilder()
 *   .withSize(250)
 *   .withTitle('Plano de Pintura')
 *   .withTitleStyle('font-bold text-4xl')
 *   .withValue(createRangeObservable(0, 100, 10000))
 *   .withValueThrottleTime(300)
 *   .withDecimalPlaces(2, false)
 *   .withRange(0, 100)
 *   .withUnit('%')
 *   .withBackgroundColor('#e6e6e6')
 *   .withFont('bold', '#000000')
 *   .withMinMaxFont('bold', '#000000')
 *   .addThreshold()
 *     .withValue(0)
 *     .withColor('#264653')
 *     .gauge
 *   .addThreshold()
 *     .withValue(25)
 *     .withColor('#2a9d8f')
 *     .gauge
 *   .addThreshold()
 *     .withValue(50)
 *     .withColor('#e9c46a')
 *     .gauge
 *   .addThreshold()
 *     .withValue(75)
 *     .withColor('#f4a261')
 *     .gauge
 *   .addThreshold()
 *     .withValue(100)
 *     .withColor('#e76f51')
 *     .gauge
 *   .build();
 * ```
 */
export class SmzGaugeBuilder extends SmzBuilderUtilities<SmzGaugeBuilder> {
  protected override that = this;
  private _state: SmzGaugeState = {
    debugMode: false,
    size: 200,
    title: '',
    titleStyle: 'font-bold text-2xl',
    showTitle: false,
    value$: null,
    valueThrottleTime: 300,
    valuePipeFormat: "1.0-0",
    valueFontWeight: "bold",
    valueFontColor: "#000000",
    minMaxPipeFormat: "1.0-0",
    minMaxFontWeight: "bold",
    minMaxFontColor: "#000000",
    min: 0,
    max: 100,
    showMin: true,
    showMax: true,
    unit: '',
    showUnit: false,
    backgroundColor: '#e6e6e6',
    thresholds: []
  };

  /**
   * Inicializa uma nova instância do SmzGaugeBuilder.
   */
  constructor() {
    super();
  }

  /**
   * Define o modo de depuração do medidor.
   * @param debugMode - Indica se o modo de depuração está ativado.
   * @returns A instância atual do SmzGaugeBuilder para encadeamento de métodos.
   */
  public withDebugMode(debugMode: boolean): SmzGaugeBuilder {
    this._state.debugMode = debugMode;
    return this;
  }

  /**
   * Define o tamanho do medidor em pixels.
   * @param size - O tamanho desejado em pixels. Deve ser maior ou igual a 100.
   * @throws Erro se o tamanho for menor que 100.
   * @returns A instância atual do SmzGaugeBuilder para encadeamento de métodos.
   */
  public withSize(size: number): SmzGaugeBuilder {
    if (size < 100) {
      throw new Error('SmzGaugeBuilder: Size must be a positive number');
    }
    this._state.size = size;
    return this;
  }

  /**
   * Define o título do medidor e ativa sua exibição.
   * @param title - O título a ser exibido.
   * @returns A instância atual do SmzGaugeBuilder para encadeamento de métodos.
   */
  public withTitle(title: string): SmzGaugeBuilder {
    this._state.title = title;
    this._state.showTitle = true;
    return this;
  }

  /**
   * Define o estilo CSS do título do medidor.
   * @param titleStyle - O estilo CSS a ser aplicado ao título.
   * @returns A instância atual do SmzGaugeBuilder para encadeamento de métodos.
   */
  public withTitleStyle(titleStyle: string): SmzGaugeBuilder {
    this._state.titleStyle = titleStyle;
    return this;
  }

  /**
   * Define o valor do medidor como um Observable.
   * @param value$ - O Observable que fornece os valores do medidor.
   * @returns A instância atual do SmzGaugeBuilder para encadeamento de métodos.
   */
  public withValue(value$: Observable<number>): SmzGaugeBuilder {
    this._state.value$ = value$;
    return this;
  }

  /**
   * Define o tempo de throttle para o valor do medidor.
   * @param valueThrottleTime - O tempo de throttle em milissegundos.
   * @returns A instância atual do SmzGaugeBuilder para encadeamento de métodos.
   */
  public withValueThrottleTime(valueThrottleTime: number): SmzGaugeBuilder {
    this._state.valueThrottleTime = valueThrottleTime;
    return this;
  }

  /**
   * Define o número de casas decimais para o valor do medidor e, opcionalmente, para os valores mínimo e máximo.
   * @param decimalPlaces - O número de casas decimais (deve ser entre 0 e 3).
   * @param includeMinMax - Se verdadeiro, aplica o formato também aos valores mínimo e máximo.
   * @throws Erro se o número de casas decimais for negativo ou maior que 3.
   * @returns A instância atual do SmzGaugeBuilder para encadeamento de métodos.
   */
  public withDecimalPlaces(decimalPlaces: number, includeMinMax: boolean = false): SmzGaugeBuilder {
    if (decimalPlaces < 0) {
      throw new Error('SmzGaugeBuilder: Decimal places must be a positive number');
    }

    if (decimalPlaces > 3) {
      throw new Error('SmzGaugeBuilder: Decimal places must be less than 3');
    }

    this._state.valuePipeFormat = `1.${decimalPlaces}-${decimalPlaces}`;

    if (includeMinMax) {
      this._state.minMaxPipeFormat = `1.${decimalPlaces}-${decimalPlaces}`;
    }

    return this;
  }

  /**
   * Define os valores mínimo e máximo do medidor.
   * @param min - O valor mínimo.
   * @param max - O valor máximo.
   * @returns A instância atual do SmzGaugeBuilder para encadeamento de métodos.
   */
  public withRange(min: number, max: number): SmzGaugeBuilder {

    if (this._state.thresholds.length > 0) {
      throw new Error('SmzGaugeBuilder: Range must be set before thresholds');
    }

    this._state.min = min;
    this._state.max = max;
    return this;
  }

  /**
   * Oculta os valores mínimo e máximo do medidor.
   * @returns A instância atual do SmzGaugeBuilder para encadeamento de métodos.
   */
  public hideMinMax(): SmzGaugeBuilder {
    this._state.showMin = false;
    this._state.showMax = false;
    return this;
  }

  /**
   * Define a unidade de medida do medidor e ativa sua exibição.
   * @param unit - A unidade de medida.
   * @returns A instância atual do SmzGaugeBuilder para encadeamento de métodos.
   */
  public withUnit(unit: string): SmzGaugeBuilder {
    this._state.unit = unit;
    this._state.showUnit = true;
    return this;
  }

  /**
   * Define o peso e a cor da fonte do valor do medidor.
   * @param fontWeight - O peso da fonte (ex.: "bold").
   * @param fontColor - A cor da fonte (ex.: "#000000").
   * @returns A instância atual do SmzGaugeBuilder para encadeamento de métodos.
   */
  public withFont(fontWeight: string, fontColor: string): SmzGaugeBuilder {
    this._state.valueFontWeight = fontWeight;
    this._state.valueFontColor = fontColor;
    return this;
  }

  /**
   * Define o peso e a cor da fonte para os valores mínimo e máximo do medidor.
   * @param fontWeight - O peso da fonte (ex.: "bold").
   * @param fontColor - A cor da fonte (ex.: "#000000").
   * @returns A instância atual do SmzGaugeBuilder para encadeamento de métodos.
   */
  public withMinMaxFont(fontWeight: string, fontColor: string): SmzGaugeBuilder {
    this._state.minMaxFontWeight = fontWeight;
    this._state.minMaxFontColor = fontColor;
    return this;
  }

  /**
   * Define a cor de fundo do medidor.
   * @param backgroundColor - A cor de fundo (ex.: "#e6e6e6").
   * @returns A instância atual do SmzGaugeBuilder para encadeamento de métodos.
   */
  public withBackgroundColor(backgroundColor: string): SmzGaugeBuilder {
    this._state.backgroundColor = backgroundColor;
    return this;
  }

  /**
   * Adiciona um novo limite (threshold) ao medidor.
   * @returns Uma instância do SmzGaugeThresholdBuilder para definir o limite.
   */
  public addThreshold(): SmzGaugeThresholdBuilder {
    const threshold: SmzGaugeThreshold = {
      value: 0,
      color: getRandomColor()
    };

    this._state.thresholds.push(threshold);
    return new SmzGaugeThresholdBuilder(this, threshold, this._state.min, this._state.max);
  }

  /**
   * Constrói e retorna o estado final do medidor, organizando os limites em ordem crescente de valor.
   * @returns O estado completo do SmzGauge.
   */
  public build(): SmzGaugeState {
    if (this._state.thresholds.length == 0) {
      throw new Error('SmzGaugeBuilder: Thresholds must be set before building');
    }

    this._state.thresholds.sort((a, b) => a.value - b.value);
    return this._state;
  }
}

/**
 * Gera uma cor hexadecimal aleatória.
 * @returns Uma string representando uma cor hexadecimal.
 */
function getRandomColor(): string {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

/**
 * Builder para definir os limites (thresholds) de um SmzGauge.
 * Permite a configuração de valores específicos e cores associadas.
 */
export class SmzGaugeThresholdBuilder extends SmzBuilderUtilities<SmzGaugeThresholdBuilder> {
  protected override that = this;

  /**
   * Inicializa uma nova instância do SmzGaugeThresholdBuilder.
   * @param _parent - O builder pai (SmzGaugeBuilder) ao qual este threshold pertence.
   * @param _threshold - O limite (threshold) sendo configurado.
   */
  constructor(private _parent: SmzGaugeBuilder, private _threshold: SmzGaugeThreshold, private _min: number, private _max: number) {
    super();
  }

  /**
   * Define o valor do limite.
   * @param value - O valor numérico do limite.
   * @returns A instância atual do SmzGaugeThresholdBuilder para encadeamento de métodos.
   */
  public withValue(value: number): SmzGaugeThresholdBuilder {
    if (value < this._min || value > this._max) {
      throw new Error('SmzGaugeThresholdBuilder: Value must be between min and max');
    }

    this._threshold.value = value;
    return this;
  }

  /**
   * Define a cor associada ao limite.
   * @param color - A cor hexadecimal a ser associada ao limite (ex.: "#FF0000").
   * @returns A instância atual do SmzGaugeThresholdBuilder para encadeamento de métodos.
   */
  public withColor(hexaColor: string): SmzGaugeThresholdBuilder {
    if (!hexaColor.startsWith('#')) {
      throw new Error('SmzGaugeThresholdBuilder: Color must be a hexadecimal string');
    }

    this._threshold.color = hexaColor;
    return this;
  }

  /**
   * Retorna ao builder do SmzGauge associado a este threshold.
   * @returns A instância do SmzGaugeBuilder.
   */
  public get gauge(): SmzGaugeBuilder {
    return this._parent;
  }

  /**
   * Constrói e retorna o limite configurado.
   * @returns O limite (SmzGaugeThreshold) completo.
   */
  public build(): SmzGaugeThreshold {
    return this._threshold;
  }
}
