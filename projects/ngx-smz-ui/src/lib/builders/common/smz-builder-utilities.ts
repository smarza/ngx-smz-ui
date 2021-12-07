import cloneDeep from 'lodash-es/cloneDeep';

interface BuilderUtilitiesCaches<T> {
  if: Cache<T>
}

interface Cache<T> {
  isActive: boolean,
  data: T
}

export class SmzBuilderUtilities<T> {
  protected that: T;
  protected cache: BuilderUtilitiesCaches<T> = {
    if: { isActive: false, data: null }
  };
  constructor() {
  }

  public if(condition: boolean): T {

    if (this.cache.if.isActive) throw new Error(`You cannot call more than one condition method at the same time.`);

    // Registrando flag de method condicional em execução
    this.cache.if.isActive = true;

    // Se a condição for nula
    if (!condition) {
      // Preparar modelo de backup para o endif retornar dados originais descartando todos os dados feitos pelos builders entre o IF e o ENDIF
      this.cache.if.data = cloneDeep(this.that);
    }

    return this.that;
  }

  public get endIf(): T {
    const data = conclude('endif', this.cache.if, this.that);

    // Limpando cache do modelo que seguirá
    data['cache'].data = null;
    data['cache'].if.isActive = false;

    return data;
  }

  public for(items: any[], callback: (i: T, item: any) => T): T {

    let result = this.that;

    items.forEach(
      item => {
        result = callback(result, item);
      }
    );

    return result;
  }

}


function conclude<T>(methodName: string, cache: Cache<T>, that: T): T
{
  if (!cache.isActive) throw new Error(`You cannot call ${methodName} without calling the opening method first.`);

  if (cache.data != null) {

    // Pegando modelo original sem as alterações feitas
    const newData = cache.data;

    // Retornando backup sem as alterações
    return newData;
  }
  else {

    // Retornando modelo com as alterações
    return that;
  }
}