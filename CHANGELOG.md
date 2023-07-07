# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado no [Keep a Changelog](https://keepachangelog.com),
e este projeto adere ao [Versionamento Semântico](https://semver.org).

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