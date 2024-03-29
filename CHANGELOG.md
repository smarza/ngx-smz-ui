# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado no [Keep a Changelog](https://keepachangelog.com),
e este projeto adere ao [Versionamento Semântico](https://semver.org).

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