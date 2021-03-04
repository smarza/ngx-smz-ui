import { SmzControlType } from 'ngx-smz-dialogs';
import { SmzContentType, SmzContentTypes } from './content-types';
import { SmzFilterType } from './filter-types';

export interface SmzTableColumn {
  /**
  * Nome da propriedade. Pode usar concatenando: ex: person.name
  */
  field: string;
  /**
  * Texto visível no header e na versão responsiva
  */
  header: string;
  /**
  * Tipo do conteúdo que será aplicado automaticamente na célula.
  */
  contentType?: SmzContentType;

  /**
  * Configurações para o conteúdo da célula
  */
  contentData?: SmzContentTypes;

  /**
  * Define se uma coluna estará visível
  */
  isVisible?: boolean;
  /**
  * Tipo do Filtro
  */
  filterType?: SmzFilterType;
  /**
  * Define se a coluna estará disponível na busca global
  */
  isGlobalFilterable?: boolean;
  /**
  * Define se coluna poderá ser ordenada
  */
  isOrderable?: boolean;

  /**
  * Define se o filtro da coluna estará visível
  */
  showFilter?: boolean;

  /**
  * Define a largura da coluna. Favor informar número com medida (ex. '100px' ou '6em').
  */
  width?: string;
}

export interface SmzTableContextColumn extends SmzTableColumn {

}