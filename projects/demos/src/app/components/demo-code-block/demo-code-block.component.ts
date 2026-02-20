import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-demo-code-block',
  standalone: true,
  template: `
    <pre class="demos-code-block"><code>{{ code }}</code></pre>
  `,
  styles: [
    `
      .demos-code-block {
        margin: 0;
        padding: 1rem;
        border-radius: 0.375rem;
        background: var(--demos-input-bg, #1e293b);
        overflow-x: auto;
        font-size: 0.8125rem;
        line-height: 1.5;
      }
      .demos-code-block code {
        font-family: ui-monospace, monospace;
      }
    `,
  ],
})
export class DemoCodeBlockComponent {
  @Input() code = '';
}
