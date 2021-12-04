import cloneDeep from 'lodash-es/cloneDeep';

export class SmzConditionalBuilder<T> {
  protected that: T;
  protected backup: T;
  private _currentConditionMethod: 'if';
  constructor() {

  }

  public if(condition: boolean): T {
    if (this._currentConditionMethod != null) throw new Error(`You cannot call more than one condition method at the same time.`);

    // Registrando flag de method condicional em execução
    this._currentConditionMethod = 'if';

    // Se a condição for nula
    if (!condition) {
      // Preparar modelo de backup para o endif retornar dados originais descartando todos os dados feitos pelos builders entre o IF e o ENDIF
      this.backup = cloneDeep(this.that);
    }

    return this.that;
  }

  public get endIf(): T {

    if (this._currentConditionMethod == null) throw new Error(`You cannot call endIf without calling a condition method first.`);

    if (this.backup != null) {

      // Pegando modelo original sem as alterações feitas
      const newThat = this.backup;

      // Limpando cache
      this.backup = null;
      this._currentConditionMethod = null;

      // Retornando backup sem as alterações
      return newThat;
    }
    else {

      // Retornando modelo com as alterações
      return this.that;
    }
  }
}