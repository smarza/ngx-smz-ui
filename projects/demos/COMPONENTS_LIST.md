# Lista de componentes – ngx-smz-ui (@ngx-smz/core)

Lista extraída do `public-api` da lib. Use para decidir quais terão página de demo e em qual ordem implementar.

---

## Módulos / componentes candidatos a demo

### Tabelas e dados
| Componente / Módulo        | Descrição breve              | Sugestão de rota  |
|---------------------------|------------------------------|-------------------|
| **Smz Table**             | Tabela avançada (colunas, filtros, menu, editável) | `table` |
| **Smz Easy Table**        | Tabela simplificada (standalone)                   | `easy-table` |
| **Smz Multi Tables**      | Múltiplas tabelas em abas / visões                 | `multi-tables` |

### Árvores
| Componente / Módulo        | Descrição breve              | Sugestão de rota  |
|---------------------------|------------------------------|-------------------|
| **Smz Tree**              | Árvore (tree view) com builder                     | `tree` |
| **Smz Tree With Details** | Árvore com painel de detalhes ao lado              | `tree-with-details` |

### Formulários (smz-forms)
| Componente / Módulo        | Descrição breve              | Sugestão de rota  |
|---------------------------|------------------------------|-------------------|
| **Smz Forms**             | Formulário dinâmico (form-group, form-submit)      | `forms` |
| Calendar                  | Controle de data                                  | (dentro de forms) |
| Checkbox / Checkbox Group | Checkbox e grupo                                 | (dentro de forms) |
| Color Picker               | Seletor de cor                                    | (dentro de forms) |
| Dropdown                   | Select / dropdown                                 | (dentro de forms) |
| File Upload                | Upload de arquivos                                | (dentro de forms) |
| Input Currency             | Campo moeda                                       | (dentro de forms) |
| Input Mask                 | Máscara de input                                  | (dentro de forms) |
| Input Number               | Campo numérico                                    | (dentro de forms) |
| Input Password             | Senha                                             | (dentro de forms) |
| Input Switch               | Toggle / switch                                   | (dentro de forms) |
| Input List / Tag Area / Autocomplete Tag Area | Listas e tags              | (dentro de forms) |
| Input Text / Text Area     | Texto e textarea                                  | (dentro de forms) |
| Linked Dropdown / Linked Multi Select | Dropdowns encadeados              | (dentro de forms) |
| Multi Select               | Multi-select                                      | (dentro de forms) |
| Radio Button               | Radio                                            | (dentro de forms) |
| Input Tree                  | Seleção em árvore                                 | (dentro de forms) |

*Sugestão: uma página “Forms” com subseções ou abas por tipo de controle.*

### Diálogos e feedback
| Componente / Módulo        | Descrição breve              | Sugestão de rota  |
|---------------------------|------------------------------|-------------------|
| **Smz Dialogs**           | Serviço de diálogos (builder, presets)            | `dialogs` |
| **Smz Toast**             | Toasts / notificações                             | `toast` |

### Gráficos e visual
| Componente / Módulo        | Descrição breve              | Sugestão de rota  |
|---------------------------|------------------------------|-------------------|
| **Smz Chart**             | Gráficos (Chart.js)                               | `chart` |
| **Smz Gauge**             | Medidor / gauge                                  | `gauge` |
| **Smz Timeline**          | Linha do tempo                                   | `timeline` |
| **Smz SVG**               | SVG com features (pan, zoom, etc.)                | `svg` |

### Conteúdo e layout
| Componente / Módulo        | Descrição breve              | Sugestão de rota  |
|---------------------------|------------------------------|-------------------|
| **Smz Cards**             | Grid de cards (flip, templates)                   | `cards` |
| **Smz Menu**              | Menu (componente de menu)                          | `menu` |
| **Smz Dock**              | Dock (barra de ícones / ações)                    | `dock` |
| **Smz Side Content**       | Conteúdo lateral                                 | `side-content` |
| **Smz Data Info**         | Exibição de dados (label + valor)                 | `data-info` |
| **Smz Info Date**         | Exibição de data                                 | `info-date` |
| **Smz HTML Viewer**       | Visualizador de HTML                             | `html-viewer` |
| **Smz Responsive**        | Componente responsivo                            | `responsive` |
| **Smz UI Block**          | Bloqueio de UI (loading/overlay)                  | `ui-block` |

### Documentos e export
| Componente / Módulo        | Descrição breve              | Sugestão de rota  |
|---------------------------|------------------------------|-------------------|
| **Smz Document**          | Documento (PDF, etc.)                             | `document` |
| **Smz Export Dialog**     | Diálogo de exportação                             | `export-dialog` |
| **Smz Excel**             | Serviço/definições Excel                          | (geralmente usado com tabelas) |

### Outros
| Componente / Módulo        | Descrição breve              | Sugestão de rota  |
|---------------------------|------------------------------|-------------------|
| **Smz Messages**          | Icon Message, Tag Message                         | `messages` |
| **Smz FAQs**              | Lista de perguntas frequentes                     | `faqs` |
| **Smz Comments**          | Comentários (smz-comments, mentionable textarea)   | `comments` |
| **Smz Submit**            | Botão/área de submit                              | `submit` |
| **Smz Viewport**          | Diretiva viewport (scroll/visibility)             | `viewport` |
| **Smz Drag & Drop**       | Diretivas smz-drag / smz-drop                      | `drag-drop` |
| **Smz UI Guides**         | Guias de UI (tours)                               | `ui-guides` |

---

## O que normalmente não vira página de demo

- **Layouts** (Hephaestus, Athena, New Athena): uso é mais “envolver o app”; pode ter uma página “Layout” mostrando variantes.
- **RBK / Access** (auth, guards, tenants, claims, roles, users): mais infraestrutura; opcional uma página “Access Control” resumida.
- **Login**: um fluxo só; pode ter uma página “Login” se fizer sentido.
- **Pipes e directives** (tooltip, ng-var, server-image, etc.): podem ser listados em uma página “Utilitários” ou cada um em seção própria, conforme prioridade.
- **Builders e state**: documentação de API; não precisam de “página visual” de demo, mas podem aparecer em exemplos de código nas páginas dos componentes.

---

## Próximo passo

1. Escolher da tabela acima os componentes que terão **uma página de demo**.
2. Em `src/app/layout/demo-nav.config.ts`, adicionar cada um em `DEMO_NAV_SECTIONS` na seção **Componentes**.
3. Em `src/app/app.routes.ts`, adicionar a rota com lazy load para o componente de demo.
4. Criar a página seguindo o padrão em `DEMO_PAGE_STANDARD.md`.
