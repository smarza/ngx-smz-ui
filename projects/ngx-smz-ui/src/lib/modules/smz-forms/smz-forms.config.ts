import { SmzFormsBehaviorsConfig } from './models/behaviors';
import { ValidationMessage } from './models/advanced';
import { SmzFormsValidatorsPreset } from './models/controls';
import { SmzControlTypes } from './models/control-types';
import { SmzTemplate } from '../../common/models/templates';

export class SmzFormsConfig
{
    public behaviors?: SmzFormsBehaviorsConfig;
    public validators?: SmzFormsValidatorsPreset;
    public validationMessages?: ValidationMessage[];
    public multipleErrorMessagesLabel?: string;
    public controlTypes?: { [key: number]: SmzControlTypes };

}
export class SmzFormsPresets
{
    public groupTemplates?: SmzTemplate;
    public formTemplates?: SmzTemplate;
    public inputTemplates?: SmzTemplate;
    /**
    * Define a escala para todas as medidas de estilo do form
    * Entre com número inteiro, sendo que 1 é o padrão.
    */
    public globalStyleScale?: number;
    /**
    * Define o valor do espaçamento entre os elementos.
    * Entre com px ou rem, sempre acrescentando a unidade de medida.
    */
    public spacer?: string;

}
