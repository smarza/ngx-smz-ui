export class SmzFaqsConfig
{
    public databaseCacheTimeout: number;
    public creationClaim: string;
    public endpoint: string;

    public placeholders: {
        /** Como posso ajuda-lo ? */
        searchTitle: string;
        /** Digite palavras-chave para buscar respostas */
        searchPlaceholder: string;
        /** Peguntas Frequentes ? */
        contentTitle: string;
        /** Adicionar Conhecimento ? */
        creationTitle: string;
        /** Nenhum conteúdo foi encontrado ? */
        emptyMessage: string;
        /** Seja o primeiro a criar um conteúdo. ? */
        creationMessage: string;
        /** Caso precise, procure o suporte ou o administrador do seu sistema. ? */
        supportMessage: string;
        /** Refine sua busca e tente novamente. */
        noSearchResultsMessage: string;
    }

    public layouts: {
        positions: {
            'top': string;
            'middle': string;
            'bottom': string;
        }
    }
}
