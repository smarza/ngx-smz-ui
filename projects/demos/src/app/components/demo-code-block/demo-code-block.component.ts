import { Component, Input, signal, ViewEncapsulation } from '@angular/core';
import { HighlightModule } from 'ngx-highlightjs';

@Component({
  selector: 'app-demo-code-block',
  standalone: true,
  imports: [HighlightModule],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'app-demo-code-block' },
  template: `
    <div class="demos-code-block-wrapper">
      <div class="demos-code-block-header">
        <button
          type="button"
          class="demos-code-block-copy"
          (click)="copyCode()"
          [attr.aria-label]="copyButtonLabel()"
        >
          {{ copyButtonLabel() }}
        </button>
      </div>

      <pre class="demos-code-block"><code
        [highlight]="code"
        [language]="language"
      ></code></pre>
    </div>
  `,
  styles: [
    `
      .app-demo-code-block .demos-code-block-wrapper {
        position: relative;
        border-radius: 0.375rem;
        background: var(--demos-code-bg, #1e293b);
        overflow: hidden;
      }

      .app-demo-code-block .demos-code-block-header {
        display: flex;
        justify-content: flex-end;
        padding: 0.25rem 0.5rem;
        border-bottom: 1px solid var(--demos-code-border, #334155);
      }

      .app-demo-code-block .demos-code-block-copy {
        margin: 1em;
        padding: 0.25rem 0.5rem;
        font-size: 0.75rem;
        border-radius: 0.25rem;
        border: none;
        background: var(--demos-code-btn-bg, #334155);
        color: var(--demos-code-btn-text, #e2e8f0);
        cursor: pointer;
      }

      .app-demo-code-block .demos-code-block-copy:hover {
        background: var(--demos-code-btn-hover, #475569);
      }

      .app-demo-code-block .demos-code-block {
        margin: 0;
        padding: 1rem;
        overflow-x: auto;
        font-size: 0.8125rem;
        line-height: 1.5;
        background: var(--demos-code-bg, #1e293b);
      }

      .app-demo-code-block .demos-code-block code {
        font-family: ui-monospace, monospace;
        background: transparent !important;
        padding: 0;
        color: #e2e8f0;
      }

      /* highlight.js: tema escuro, cores realistas (estilo IDE) */
      .demos-code-block .hljs {
        background: var(--demos-code-bg, #1e293b) !important;
        color: #e2e8f0;
      }
      .demos-code-block .hljs-keyword,
      .demos-code-block .hljs-selector-tag { color: #c084fc; }
      .demos-code-block .hljs-built_in { color: #38bdf8; }
      .demos-code-block .hljs-type,
      .demos-code-block .hljs-class .hljs-title { color: #fbbf24; }
      .demos-code-block .hljs-literal { color: #f472b6; }
      .demos-code-block .hljs-number { color: #6ee7b7; }
      .demos-code-block .hljs-string { color: #6ee7b7; }
      .demos-code-block .hljs-comment { color: #94a3b8; font-style: italic; }
      .demos-code-block .hljs-title.function_,
      .demos-code-block .hljs-title { color: #38bdf8; }
      .demos-code-block .hljs-params { color: #e2e8f0; }
      .demos-code-block .hljs-attr { color: #fbbf24; }
      .demos-code-block .hljs-variable,
      .demos-code-block .hljs-name { color: #e2e8f0; }
      .demos-code-block .hljs-symbol,
      .demos-code-block .hljs-meta { color: #c084fc; }
    `,
  ],
})
export class DemoCodeBlockComponent {
  @Input() code = '';

  @Input() language = 'typescript';

  readonly copied = signal(false);

  copyButtonLabel(): string {
    return this.copied() ? 'Copiado!' : 'Copiar código';
  }

  async copyCode(): Promise<void> {
    if (!this.code || !navigator.clipboard) {
      return;
    }

    try {
      await navigator.clipboard.writeText(this.code);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch {
      // ignore
    }
  }
}
