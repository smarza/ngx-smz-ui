# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado no [Keep a Changelog](https://keepachangelog.com),
e este projeto adere ao [Versionamento Semântico](https://semver.org).

## [17.2.9] - 2025-01-29
Adicionado metodo que permite forçar o filtro do data transform da tabela para ser o valor transformado ao inves do original. Útil para casos onde o valor transformado já é o final e não contém metadados ou HTML.

## [17.2.8] - 2025-01-29
Correção dos filtros da coluna Data Transform da tabela.

## [17.2.7] - 2025-01-28
Implementação de tratamento de erro para os casos onde a imagem do avatar retorna 404. Agora o placeholder será colocado na imagem na barra superior.

## [17.2.6] - 2025-01-28
Implementação de tratamento de erro no componente de Input Text Button.

## [17.0.0-rc.2] - 2024-05-08
Merge das features que estavam na Main

## [17.0.0-rc.1] - 2024-05-06
Migração para o Angular 17 e Prime 17

## [16.6.6] - 2024-05-02
Ajustes na mecânica de login para permitir customização externa.

## [16.6.2] - 2024-04-18
Correção da mensagem "Entre com suas credenciais xxx" na tela de login.

## [16.6.1] - 2024-04-09
Fix no pipe que captura os dados da coluna dataTransform da tabela (funcionalidade publicada na 16.4.14).
Fix no input de arquivos, onde ele tentava executar o FileReader em um arquivo mesmo quando a opção de binário estivesse selecionada. Agora, o input só executa o FileReader quando o output for base64. Para binário, nenhuma manipulação é realizada, possibilitando selecionar arquivos maiores de 2gb sem travamento ou sobrecarga para os browsers.

Breaking Changes:
O fluent dos validadores de form não possuem mais o retorno diretamente para o group:
ANTES: .validators().required().group
AGORA: .validators().required().input.group
Isso foi modificado para garantir que o retorno ao grupo será feito pelos builders dos inputs pois cada um deles pode realizar uma verificação individual. Do jeito antigo, os validadores bypassavam essas verificações causando bugs ocultos.

## [16.5.7] - 2024-04-02
Funcionalidade que permite ou bloqueia a inserção de itens customizados no autocomplete area tag.

## [16.5.6] - 2024-04-01
Opção para permitir ou proíbir valores personalizados no Autocomplete Tag Area

## [16.5.5] - 2024-03-28
Novo Input Autocomplete Tag Area

## [16.5.3] - 2024-03-28
Fix no input TagArea.

## [16.5.2] - 2024-03-26
Implementação do Repositório de Forms: Agora, os formulários abertos são mantidos em um repositório unificado, facilitando a interação e o acesso cruzado entre diferentes forms. Isso permite que comportamentos customizados em um form específico possam interagir com outros forms abertos simultaneamente.

Group Reaction no Custom Behavior: Com a nova implementação do repositório de forms, o "Group Reaction" dentro do custom behavior foi aprimorado. Agora, é possível alterar a visibilidade de um grupo em um form baseando-se em mudanças ocorridas em um dropdown de outro form. Essa feature amplia significativamente as possibilidades de interação dinâmica entre diferentes partes de uma aplicação, melhorando a experiência do usuário ao permitir reações mais complexas e integradas entre os formulários.

## [16.5.0] - 2024-03-14 (Testado com primeng-16.0.2)
Adicionado um componente de input de árvore ao formulário, permitindo seleções simples, múltiplas ou por checkbox através da configuração Fluent.

## [16.4.17] - 2024-03-01
Adicionado um novo recurso de cache que armazena o último Tenant utilizado para login na aplicação. Isso proporciona uma experiência de usuário mais ágil, permitindo uma reautenticação mais rápida e eficiente em usos subsequentes da aplicação.

## [16.4.16] - 2024-02-27
Adicionada a Diretiva smzResponsiveBreakpoints: Uma nova diretiva foi introduzida para permitir a criação de layouts responsivos de maneira mais intuitiva e flexível. Esta diretiva permite mostrar ou esconder elementos com base nos tamanhos de tela especificados através de media queries.

## [16.4.15] - 2024-02-27
Adicionado suporte para aceitar templates diferentes para versão landscape e portrait na seção de extras da topbar no tema New Athenas.
Adicionada flag (hideResponsiveMenuButton) para esconder o botão de acionar menu lateral nos casos de portrait.

## [16.4.14] - 2024-02-09
Adicionado suporte para adicionar um dado alternativo para filtros nas colunas de DataTransform, Icon e Custom na tabela.
Agora a tabela adiciona um novo campo por item para cada uma dessas colunas para armazenar o dado a ser renderizado (_dom_) ou filtrado (_filterable_), dessa forma todo o cálculo é feito apenas uma vez, facilitando a renderização e a busca pelos dados.

## [16.4.13] - 2024-02-09
Fix no filtro global em colunas com dataTransform

## [16.4.12] - 2024-02-09
Adicionando suporte para filtro global em colunas com dataTransform

## [16.4.11] - 2024-02-09
Adicionada funcionalidade para filtrar elementos string com multiselect na tabela (SmzFilterType.MULTI_SELECT_STRING).
A mecanica de produzir o dado para as colunas com dataTransform foi refeito para suportar o novo filtro. Agora o dado é pré transformado apenas quando detectada qualquer modificação nos dados da tabela, resultando em melhoria significativa de performance. Antes o dado era transformado durante a criação do elemento DOM.

## [16.4.4] - 2023-11-22

### Adicionado
Adicionada a opção para definir a rota autenticada e não autenticada pelo fluente de configuração

## [16.4.3] - 2023-11-10

### Adicionado
Adicionado suporte para Tooltip nos botões de ação inline da tabela.

## [16.3.3] - 2023-11-01

### Melhorias
- SmzUiTree - Lógica de Seleção Aprimorada:
Introduzimos uma lógica de seleção melhorada para a SmzUiTree.
Agora, a árvore considera tanto preenchimentos parciais quanto totais ao selecionar nós.
Se todos os filhos de um nó estiverem completamente selecionados até o final do seu branch, esse nó é considerado totalmente selecionado.
Se alguns (mas não todos) filhos de um nó estiverem selecionados, o nó é marcado como parcialmente selecionado (partialSelected = true).

Nota importante: os itens selecionados na árvore agora passaram a incluir os pais. Atentar para filtrar pelos itens selecionados que possuem leaf = true para identificar apenas os nós finais selecionados.

## [16.3.1] - 2023-10-06

### Adicionado
- Adicionado suporte para mensagens de erro da versão 7.1.1 (Rbk) do backend.
Agora o frontend suporta mensagens de erro nos formatos: string, string[] e { errors: string[] };

## [16.2.51] - 2023-09-13

### Breaking Changes
- O método "addInputWithContext" nos builders de Cards foi renomeado para "addDataToInput"

### Adicionado
- Adicionada suporte para compartilhar o contexto de um card em components back e front.

## [16.2.5] - 2023-09-13

### Adicionado
- Adicionada a opção para persistir o estado de um card durante a mudança dos dados.

## [16.2.3] - 2023-08-30

### Adicionado
- Adicionado uma nova opção no Fluent que permite forçar o login a utilizar apenas letras minúsculas.

## [16.1.2] - 2023-08-14

### Novas Funcionalidades
- Implementação de interfaces genéricas no builder de Cards.
- Adição do método setStylesConditionally no builder de criar Cards.

### Melhorias
- Mudança de posicionamento do dropdown de seleção de origens de dados na visualização em Card.

## [16.0.9] - 2023-08-10

### Adicionado
- Um novo recurso, chamado addButtonWithCondition, foi implementado para permitir que os desenvolvedores adicionem botões condicionados na tela de erro. Isso significa que esses botões só serão exibidos com base em certas condições, oferecendo uma experiência mais personalizada ao usuário final, dependendo das circunstâncias que causaram o erro.

## [16.0.8] - 2023-08-10

### Melhoria
- O recurso de uiDefinitions agora é automaticamente adicionado aos required database states.
- O módulo de login agora carrega a lista de Tenants automaticamente se o projeto tiver configurado para suportar múltiplos Tenants.

### Correção
- O DatabaseStateGuard foi atualizado para carregar a lista de Tenants quando o projeto estiver habilitado para usar o TenantSwitch. Antes, a lista só era carregada se o projeto não fosse configurado como single Tenant.

## [16.0.7] - 2023-08-09

### Adicionado
- Novo método overrideCacheTimeout para permitir a alteração do tempo de cache do estado do database.

## [16.0.6] - 2023-08-09

### Alterado
- Botão de Edição em Editable Table: A funcionalidade do botão de editar na 'editable table' foi modificada. Anteriormente, o botão sumia ao ser desabilitado. A partir desta versão, ele permanecerá visível, mas estará desabilitado, indicando que a ação de edição não pode ser executada naquele momento.

## [16.0.6] - 2023-08-09

### Alterado
- Botão de Edição em Editable Table: A funcionalidade do botão de editar na 'editable table' foi modificada. Anteriormente, o botão sumia ao ser desabilitado. A partir desta versão, ele permanecerá visível, mas estará desabilitado, indicando que a ação de edição não pode ser executada naquele momento.

## [16.0.5] - 2023-08-08

### Adicionado
- Adicionado setUpdateActionCondition na editable table: Este método permite aos desenvolvedores controlar a visibilidade do botão de edição para cada item específico da tabela, oferecendo mais flexibilidade na interface da tabela editável.
- Adicionado setRemoveActionCondition na editable table: Similarmente ao método acima, este permite aos desenvolvedores determinar quando o botão de remoção deve ser visível para cada item da tabela


## [16.0.4] - 2023-08-07

### Adicionado
- A funcionalidade de busca global na tabela foi aprimorada para suportar a busca por células que contenham um array de objetos SimpleNamedEntity.


## [16.0.3] - 2023-08-02

### Ajustado
- Demo de Modules: Melhoramos o demo dos módulos para apresentar de forma mais clara e efetiva as funcionalidades disponíveis.

### Corrigido
- Change Detection na inicialização da tabela: Resolvemos um problema que estava afetando a detecção de mudanças na inicialização da tabela. Agora, qualquer alteração realizada será corretamente detectada e refletida na tabela.

### Adicionado
- Nome de arquivo padrão para exportação da tabela para excel: Implementamos uma nova funcionalidade que adiciona um nome de arquivo padrão quando você exporta a tabela para Excel. Isso facilita o processo de exportação e organiza melhor os arquivos exportados.

## [16.0.2] - 2023-07-19

### Adicionado
- Adicionadas as propriedades tagsContainerStyleClass e infosContainerStyleClass para personalização do componente de Cards com template Info-A.

## [16.0.1] - 2023-07-19

### Adicionado
- Adição de novas propriedades de estilo para o componente de Cards: Três novas propriedades foram introduzidas para permitir a estilização personalizada do componente de Cards.
  > dataViewContentStyles: Permite aplicar estilos personalizados ao conteúdo da visualização de dados no Card.
  > dataViewStyleClass: Fornece uma maneira de aplicar uma classe de estilo personalizado à visualização de dados no Card.
  > gridStyleClass: Facilita a aplicação de uma classe de estilo personalizada à grade do Card.
- Adição de opção para mostrar/esconder dropdown de seleção de layout no componente de Cards: Foi implementada uma nova funcionalidade que permite ao usuário decidir se deseja exibir ou ocultar o dropdown de seleção de layout no componente de Cards.

### Corrigido
- Resolução de conflito de estilos no Card do tipo Info-A: Foi corrigido um problema de conflito de estilos que estava ocorrendo com o Card do tipo Info-A

## [16.0.0] - 2023-07-17

### Adicionado
- Foi adicionado suporte ao Angular 16 para o tema New Athena.

## [15.4.13] - 2023-07-07

### Adicionado
- Suporte a pesquisa do filtro de seleção de colunas da tabela.

## [15.4.12] - 2023-07-07

### Fix
- Recurso de personalização de estilo para cada célula da tabela através da nova propriedade cellStyleClass.

## [15.4.11] - 2023-07-07

### Adicionado
- Adicionado recurso de personalização de estilo para cada célula da tabela através da nova propriedade cellStyleClass. Através desta propriedade, os usuários agora podem definir classes de estilo customizadas para o container principal de cada célula na tabela.

## [15.4.10] - 2023-07-06

### Adicionado
- Adição da propriedade preserveLayoutInSmallDevices na tabela, permitindo controle sobre se o layout da tabela deverá permanecer o mesmo para dispositivos com telas menores.

### Melhorado
- Melhorias na responsividade do módulo de notificações, otimizando a exibição e interação em diferentes tamanhos de tela.

## [15.4.9] - 2023-07-06

### Adicionado
- Modo debug para identificar os diferentes breakpoints de resolução na interface. Esta adição irá ajudar na detecção de resoluções de tela específicas, aprimorando a experiência do usuário em diferentes dispositivos.

### Alterado
- Ajustes na estratégia de detecção de mudanças nos componentes de troca de domínio, topbar e topbar actions. Isso garantirá uma melhor sincronização e atualização desses componentes, proporcionando uma experiência de usuário mais fluida e consistente.

### Suporte
- Suporte no tailwindcss para as variáveis de secondary-color e secondary-color-text. Essa atualização permite que os desenvolvedores manipulem mais facilmente as cores secundárias na folha de estilo, contribuindo para uma personalização mais flexível e consistente.

## [15.4.8] - 2023-07-05

### Novas funcionalidades
- Adicionadas as diretivas ngIfLandscape e ngIfPortrait, permitindo a implementação de comportamentos específicos para cada orientação de tela. (#1)
- Implementado o componente smzResponsive, que facilita a criação de templates responsivos adaptados para as orientações Landscape e Portrait. (#2)

### Melhorias
- Realizadas melhorias de responsividade na topbar do tema New Athenas, aprimorando a experiência do usuário em diferentes formatos de tela. (#3)
- O componente de notificações foi aprimorado para ser responsivo, passando a aparecer em overlay para dispositivos em orientação landscape e em diálogo para dispositivos em orientação portrait. (#4)
- O componente de trocar Tenant foi atualizado para ser responsivo, agora sendo apresentado em dropdown para dispositivos em orientação landscape e em diálogo para dispositivos em orientação portrait. (#5)

### Alterações técnicas
- Adicionada a classe setContainerStyles no DialogBuilder, possibilitando a personalização das classes de estilo da div de conteúdo. (#6)

### Commits

- #1 Adicionadas diretivas para orientações de tela.
- #2 Componente para templates responsivos implementado.
- #3 Melhorias de responsividade na topbar do tema New Athenas.
- #4 Componente de notificações agora responsivo.
- #5 Componente de trocar Tenant agora responsivo.
- #6 Personalização de estilos no DialogBuilder adicionada.

## [15.4.7] - 2023-07-05

### Adicionado

#### Tabela
- Adicionada funcionalidade de botões de ação nos cabeçalhos de tabelas