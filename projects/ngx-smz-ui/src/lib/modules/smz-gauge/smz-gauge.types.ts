import { Observable } from 'rxjs';

/**
 * Representa o estado de um Gauge (medidor), incluindo suas propriedades de configuração
 * e estilização, valores dinâmicos, e limites visuais.
 */
export interface SmzGaugeState {
  /**
   * Indica se o modo de depuração está ativado.
   * Permite mostrar informações adicionais para ajudar no desenvolvimento e troubleshooting.
   */
  debugMode: boolean;

  /**
   * Define o tamanho do medidor em pixels.
   */
  size: number;

  /**
   * Título do medidor exibido no topo.
   */
  title: string;

  /**
   * Estilo CSS aplicado ao título do medidor.
   */
  titleStyle: string;

  /**
   * Determina se o título do medidor deve ser exibido.
   */
  showTitle: boolean;

  /**
   * Valor atual do medidor, representado como um Observable de números.
   */
  value$: Observable<number> | null;

  /**
   * Tempo de "throttle" (limitação) aplicado ao valor do medidor, em milissegundos.
   * Controla a frequência de atualização do valor exibido.
   */
  valueThrottleTime: number;

  /**
   * Formato aplicado ao valor do medidor utilizando pipe.
   * Permite personalizar a exibição do valor, como formatação de números ou moedas.
   */
  valuePipeFormat: string;

  /**
   * Define o peso da fonte utilizada para exibir o valor do medidor.
   */
  valueFontWeight: string;

  /**
   * Define a cor da fonte utilizada para exibir o valor do medidor.
   */
  valueFontColor: string;

  /**
   * Formato aplicado aos valores mínimo e máximo do medidor utilizando pipe.
   */
  minMaxPipeFormat: string;

  /**
   * Define o peso da fonte utilizada para exibir os valores mínimo e máximo do medidor.
   */
  minMaxFontWeight: string;

  /**
   * Define a cor da fonte utilizada para exibir os valores mínimo e máximo do medidor.
   */
  minMaxFontColor: string;

  /**
   * Valor mínimo do medidor.
   */
  min: number;

  /**
   * Valor máximo do medidor.
   */
  max: number;

  /**
   * Indica se o valor mínimo deve ser exibido no medidor.
   */
  showMin: boolean;

  /**
   * Indica se o valor máximo deve ser exibido no medidor.
   */
  showMax: boolean;

  /**
   * Unidade de medida exibida no medidor.
   */
  unit: string;

  /**
   * Indica se a unidade de medida deve ser exibida no medidor.
   */
  showUnit: boolean;

  /**
   * Cor de fundo do medidor.
   */
  backgroundColor: string;

  /**
   * Limites definidos para o medidor, cada um com um valor e uma cor associada.
   * Permite visualmente destacar diferentes faixas de valores.
   */
  thresholds: SmzGaugeThreshold[];
}

/**
 * Representa um limite (threshold) para o medidor, associando um valor
 * específico a uma cor visual.
 */
export interface SmzGaugeThreshold {
  /**
   * Valor associado ao limite.
   */
  value: number;

  /**
   * Cor hexadecimal associada ao limite, usada para destacar visualmente o valor.
   */
  color: string;
}
