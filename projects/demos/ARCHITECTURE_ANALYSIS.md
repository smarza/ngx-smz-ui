# Análise da arquitetura de demos (overview) e sugestão de simplificação

## Como funciona hoje (overview)

### 1. Três pontos de registro para cada caso de uso

- **`demo-keys.ts`**: enum com uma chave por caso (ex.: `TABLE_BASIC`, `CARDS_IMAGE_WITH_DETAILS`). Hoje ~140 entradas.
- **`demos/functions/*.ts`**: um objeto por categoria (ex.: `TablesDemo`, `CardsDemo`), indexado por `DemoKeys`. Cada entrada tem:
  - `code: () => State` — função que retorna o state do componente (e cujo `.toString()` é usado para mostrar “o código”).
  - Às vezes `items$` ou outros dados.
- **`demo-tree.ts`**: árvore manual (`TreeDemoData`) onde cada folha tem:
  - `label`, `key: DemoKeys.XXX`, `demoType` ('table' | 'chart' | 'cards' | …),
  - `data: TablesDemo[DemoKeys.TABLE_BASIC]` (referência ao objeto em functions).

Para **adicionar um novo demo** é preciso: (1) novo enum em DemoKeys, (2) nova entrada no objeto da categoria em functions, (3) novo nó na árvore em demo-tree.ts.

### 2. Componentes “container” por categoria

- **`home/components/demo-*.component.ts`**: um componente por tipo (demo-table, demo-chart, demo-cards, etc.).
- Cada um recebe `[node]="selectedNode"` e usa `node.data` (o objeto de functions) para:
  - Obter state: `event.code()` (e às vezes `event.items$`).
  - Passar para o componente real da lib (smz-ui-table, smz-ui-chart, etc.).
- O **home** usa um `@switch (selectedNode?.demoType)` para decidir qual componente renderizar.

### 3. Exibição do “código”

- Na aba “Código”, o template usa:
  - `selectedNode.data?.code ?? selectedNode.data` (função ou objeto).
  - Pipe `onlyBuildCode`: chama `.toString()` na função e extrai o corpo (entre `{` e `}`).
  - Pipe `removeOneTab`: remove indentação.
- Ou seja: o código exibido é o **código-fonte da função** que gera o state, dependendo de o bundle não minificar (ou preservar nomes) para o `.toString()` ficar legível.

### 4. Fluxo resumido

```
TreeDemoData (árvore) → usuário escolhe nó
  → selectedNode.data = TablesDemo[DemoKeys.TABLE_BASIC]
  → demoType = 'table' → renderiza <app-demo-table [node]="selectedNode">
  → DemoTableComponent: state = node.data.code(), items$ = node.data.items$
  → smz-ui-table [state]="state" [items]="items$ | async"
  → Aba Código: demo-code-block [code]="node.data.code" → pipes → .toString() da função
```

---

## Pontos fracos (por que fica difícil de manter)

1. **Tripla inscrição**: qualquer novo caso exige alterar enum + functions + tree. Fácil esquecer um ou quebrar a correspondência (key errada, data apontando para outro demo).
2. **Árvore gigante e repetitiva**: `demo-tree.ts` com centenas de nós, todos no mesmo formato. Difícil de navegar e refatorar.
3. **Acoplamento ao app**: functions importam `Store`, `GlobalInjector`, `DemoFeatureSelectors`, dados do overview (uidefinitions, etc.). Os demos não são “apenas a lib”.
4. **Código exibido frágil**: depender de `function.toString()` quebra com minificação/obfuscação em produção. Hoje funciona em dev; em prod pode virar `function(){return n.build()}`.
5. **Contrato inconsistente**: em alguns demos `node.data` é `() => void` (dialogs), em outros `{ code, items$ }`. O code-block e os componentes precisam tratar vários formatos.
6. **Um componente container por categoria**: cada novo “tipo” de demo (novo demoType) exige novo case no switch do home e um novo componente wrapper.

---

## Sugestão: arquitetura mais simples para o projeto **demos**

Objetivo: **um lugar só para definir um demo**, **código sempre como texto** (não depender de `.toString()`), e **menos arquivos “de infra”**.

### Princípio: “Cada caso de uso = uma página (ou um bloco) com exemplo + snippet”

- Cada **página** de demo (ex.: `/table`, `/table/basic`, `/cards`) é um **componente que contém**:
  - O exemplo ao vivo (uso real do componente da lib).
  - Um ou mais blocos de código como **string** (snippets), exibidos com highlight.
- Não há enum global, nem árvore manual, nem “função que gera state e cujo toString é o código”. O que roda e o que se mostra são explícitos no próprio componente (ou em dados locais).

### Opção recomendada: **página por componente + snippets estáticos**

Estrutura sugerida:

```
projects/demos/src/app/pages/demos/
  table/
    table-demo.component.ts     ← rota /table
    table-demo.component.html   ← título, descrição, N seções “Exemplo” + “Código”
  cards/
    cards-demo.component.ts
    cards-demo.component.html
  ...
```

- Dentro de cada página (ex.: table):
  - Vários **casos** podem ser seções na mesma página (h2 “Básico”, h2 “Com filtros”, etc.).
  - Cada caso = um bloco que renderiza o componente (ex.: `<smz-ui-table ...>`) + um `<pre><code>{{ snippet }}</code></pre>` (ou componente reutilizável `demo-code-block` que recebe `snippet: string`).
- Snippets podem ser:
  - Constantes no próprio componente: `readonly snippetBasic = \`new SmzTableBuilder()...\`;`
  - Ou arquivos `.code.ts` que exportam strings (só para manter o .ts separado do template, se preferir).

Vantagens:

- **Um único lugar por caso**: o componente da página é o único que sabe daquele exemplo e do snippet. Não há enum nem árvore para manter.
- **Código sempre correto**: é string; não depende de minificação. Você pode copiar do próprio código que chama o builder e colar no snippet (ou gerar via script se quiser).
- **Navegação**: o menu lateral (já no layout do demos) aponta para rotas (`/table`, `/cards`). Não precisa de árvore dinâmica; a lista de itens no menu é a lista de páginas.
- **Menos conceitos**: não existe “demoType”, “node.data”, “code()”. Só “página com exemplo e texto de código”.
- **Reuso**: um único `DemoCodeBlockComponent` que recebe `code: string` e opcionalmente `language`. O highlight (e.g. highlight.js) já resolve.

Se quiser **mostrar “o código que gera este state”** igual ao overview: dentro do componente você chama o builder, guarda o state em uma propriedade, e usa o **mesmo trecho** como string no snippet (duplicado mas explícito). Ou você mantém um único `getState()` e um snippet manual que você mantém alinhado ao getState() (por exemplo num comentário “snippet must match getStateBasic()”).

### Alternativa: **registry único (sem enum, tree gerada)**

Se quiser manter “lista dinâmica” e “um componente runner por tipo”:

- **Um único registro** por demo, por exemplo:
  - `demos/registry.ts`: array de `{ id, path, label, category, demoType, run: () => ({ state, items$? }), code: string }`.
  - O menu é gerado a partir desse array (por categoria).
  - A rota pode ser `/demo/:id`; o componente de layout carrega o registro pelo id, usa `demoType` para escolher o runner (table, chart, …) e passa `run()` e `code` (string).
- Assim você continua com um “runner” por tipo (table, chart, etc.), mas **cada caso de uso** é uma linha no array, com `code` como string (não função). Sem enum, sem árvore manual.

Ainda assim, a exibição do código fica estável (sempre string) e o “único lugar” do demo é a entrada do registry.

---

## Resumo da recomendação

| Aspecto              | Overview (atual)              | Sugestão para demos                          |
|----------------------|-------------------------------|----------------------------------------------|
| Onde um demo é definido | Enum + functions + tree (3 lugares) | Um só: a página (componente + snippet) ou 1 linha no registry |
| Código exibido       | `.toString()` da função       | String (snippet)                             |
| Navegação            | Árvore dinâmica (TreeDemoData)| Menu = rotas (uma por componente/categoria) |
| Novos casos          | Alterar 3 arquivos            | Alterar 1: nova seção na página ou nova entrada no registry |
| Acoplamento          | Store, selectors, overview   | Apenas a lib; dados mock locais na página    |

Implementar no projeto **demos** a opção **“página por componente + snippets estáticos”** mantém o padrão que você já documentou (`DEMO_PAGE_STANDARD.md`), elimina a tripla inscrição e a dependência de `function.toString()`, e deixa a manutenção previsível: uma página por componente da lib, com exemplos e código ao lado.
