import cloneDeep from 'lodash-es/cloneDeep';
import { environment } from '../../environments/environment';

/**
 * Interface que define as caches utilizadas nas utilidades do builder.
 * @template T - O tipo do builder associado.
 */
interface BuilderUtilitiesCaches<T> {
  /**
   * Cache utilizada para armazenar o estado durante uma condição condicional.
   */
  if: Cache<T>;
}

/**
 * Interface que define a estrutura de uma cache.
 * @template T - O tipo de dados armazenados na cache.
 */
interface Cache<T> {
  /**
   * Indica se a cache está ativa.
   */
  isActive: boolean;

  /**
   * Dados armazenados na cache.
   */
  data: T | null;
}

/**
 * Classe base que fornece utilidades para builders, permitindo a execução de operações
 * condicionais e a aplicação de callbacks em listas.
 * @template T - O tipo do builder que estende esta classe.
 */
export class SmzBuilderUtilities<T> {
  /**
   * Instância do builder que estende esta classe.
   * @protected
   */
  protected that: T | null = null;

  /**
   * Estrutura de cache utilizada para armazenar estados durante operações condicionais.
   * @protected
   */
  protected cache: BuilderUtilitiesCaches<T> = {
    if: { isActive: false, data: null }
  };

  /**
   * Inicializa uma nova instância do SmzBuilderUtilities.
   */
  constructor() {}

  /**
   * Executa um bloco condicional dentro do builder, permitindo reverter as alterações
   * feitas se a condição não for atendida.
   * @param condition - A condição a ser avaliada. Se falsa, as alterações serão revertidas.
   * @returns A instância atual do builder para encadeamento de métodos.
   * @throws Erro se outro método condicional já estiver ativo.
   */
  public if(condition: boolean): T {
    if (this.cache.if.isActive) {
      throw new Error('You cannot call more than one condition method at the same time.');
    }

    // Registrando flag de método condicional em execução
    this.cache.if.isActive = true;

    // Se a condição não for atendida, criar um backup do estado atual
    if (!condition) {
      this.cache.if.data = cloneDeep(this.that);
    }

    return this.that as T;
  }

  /**
   * Executa um bloco condicional dentro do builder, aplicável apenas em ambiente de desenvolvimento.
   * @returns A instância atual do builder para encadeamento de métodos.
   * @throws Erro se outro método condicional já estiver ativo.
   */
  public ifDevelopment(): T {
    if (this.cache.if.isActive) {
      throw new Error('You cannot call more than one condition method at the same time.');
    }

    // Registrando flag de método condicional em execução
    this.cache.if.isActive = true;

    // Se estiver em ambiente de produção, criar um backup do estado atual
    if (environment.production) {
      this.cache.if.data = cloneDeep(this.that);
    }

    return this.that as T;
  }

  /**
   * Executa um bloco condicional dentro do builder, aplicável apenas em ambiente de produção.
   * @returns A instância atual do builder para encadeamento de métodos.
   * @throws Erro se outro método condicional já estiver ativo.
   */
  public ifProduction(): T {
    if (this.cache.if.isActive) {
      throw new Error('You cannot call more than one condition method at the same time.');
    }

    // Registrando flag de método condicional em execução
    this.cache.if.isActive = true;

    // Se não estiver em ambiente de produção, criar um backup do estado atual
    if (!environment.production) {
      this.cache.if.data = cloneDeep(this.that);
    }

    return this.that as T;
  }

  /**
   * Termina um bloco condicional e restaura o estado anterior se a condição não foi atendida.
   * @returns O estado final do builder, após avaliar e aplicar a condição.
   * @throws Erro se `endIf` for chamado sem um método condicional correspondente.
   */
  public get endIf(): T {
    const data = conclude('endif', this.cache.if, this.that);
    // Limpando cache após a finalização do bloco condicional
    (data as any)['cache'].data = null;
    (data as any)['cache'].if.isActive = false;

    return data as T;
  }

  /**
   * Executa um callback para cada item em uma lista, permitindo modificar o builder em cada iteração.
   * @param items - A lista de itens a serem processados.
   * @param callback - A função de callback a ser executada em cada item.
   * @returns O estado final do builder após a aplicação do callback em todos os itens.
   */
  public for(items: any[], callback: (builder: T, item: any, index: number) => T): T {
    let result = this.that;

    items.forEach((item, i) => {
      result = callback(result as T, item, i);
    });

    return result as T;
  }
}

/**
 * Função auxiliar que conclui a execução de um método condicional, restaurando o estado anterior
 * se necessário.
 * @template T - O tipo de dados associado ao builder.
 * @param methodName - O nome do método condicional sendo concluído.
 * @param cache - A cache associada ao método condicional.
 * @param that - O estado atual do builder.
 * @returns O estado final do builder após avaliar a condição.
 * @throws Erro se o método for chamado sem um método condicional correspondente.
 */
function conclude<T>(methodName: string, cache: Cache<T>, that: T): T {
  if (!cache.isActive) {
    throw new Error(`You cannot call ${methodName} without calling the opening method first.`);
  }

  if (cache.data != null) {
    // Retorna o estado original, descartando alterações feitas durante o bloco condicional
    return cache.data;
  } else {
    // Retorna o estado atual, mantendo as alterações feitas
    return that;
  }
}
