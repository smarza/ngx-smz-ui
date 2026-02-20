# Padrão de página de demo

Todas as páginas de demo de componentes devem seguir esta estrutura para manter consistência.

## Estrutura da página

1. **Título**  
   `<h1 class="demos-page-title">Nome do Componente</h1>`

2. **Descrição**  
   Um parágrafo com `demos-page-lead` explicando o que o componente faz e quando usar.

3. **Exemplo**  
   Seção com `<h2>Exemplo</h2>` e o componente renderizado (exemplo ao vivo).

4. **Código** (opcional)  
   Seção com `<h2>Uso</h2>` e bloco `<pre><code>...</code></pre>` com o trecho relevante (template ou TS).

5. **Notas / API** (opcional)  
   Seção com `<h2>Notas</h2>` ou inputs/outputs importantes, ou um aviso (estilo “caution” como na referência).

## Onde registrar

- **Rota:** em `src/app/app.routes.ts`, adicionar a rota em `children` do layout.
- **Menu:** em `src/app/layout/demo-nav.config.ts`, adicionar o item em `DEMO_NAV_SECTIONS`, na seção `Componentes`.

## Exemplo mínimo

```html
<h1 class="demos-page-title">Button</h1>
<p class="demos-page-lead">Botão padrão da biblioteca. Use para ações principais.</p>

<h2>Exemplo</h2>
<app-button-demo-example />

<h2>Uso</h2>
<pre><code>&lt;button pButton label="Clique"&gt;&lt;/button&gt;</code></pre>
```

Mantenha cada página em um único componente por demo (por exemplo `button-demo.component.ts`) e reutilize as classes globais (`demos-page-title`, `demos-page-lead`) e os headings `h2`/`h3` para o “On this page” no futuro.
