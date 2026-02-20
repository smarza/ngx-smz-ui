/**
 * Configuração da navegação do site de demos.
 * Adicione aqui cada novo componente que tiver página de demo.
 */
export interface DemoNavItem {
  path: string;
  label: string;
}

export interface DemoNavSection {
  id: string;
  label: string;
  items: DemoNavItem[];
}

export const DEMO_NAV_SECTIONS: DemoNavSection[] = [
  {
    id: 'intro',
    label: 'Intro',
    items: [
      { path: '', label: 'Início' },
    ],
  },
  {
    id: 'components',
    label: 'Componentes',
    items: [
      // Lista completa em COMPONENTS_LIST.md — descomente ao criar cada demo.
      // { path: 'table', label: 'Table' },
      // { path: 'easy-table', label: 'Easy Table' },
      // { path: 'multi-tables', label: 'Multi Tables' },
      // { path: 'tree', label: 'Tree' },
      // { path: 'tree-with-details', label: 'Tree With Details' },
      // { path: 'forms', label: 'Forms' },
      // { path: 'dialogs', label: 'Dialogs' },
      // { path: 'toast', label: 'Toast' },
      { path: 'chart', label: 'Chart' },
      // { path: 'gauge', label: 'Gauge' },
      // { path: 'timeline', label: 'Timeline' },
      // { path: 'svg', label: 'SVG' },
      // { path: 'cards', label: 'Cards' },
      // { path: 'menu', label: 'Menu' },
      // { path: 'dock', label: 'Dock' },
      // { path: 'side-content', label: 'Side Content' },
      // { path: 'data-info', label: 'Data Info' },
      // { path: 'info-date', label: 'Info Date' },
      // { path: 'html-viewer', label: 'HTML Viewer' },
      // { path: 'responsive', label: 'Responsive' },
      // { path: 'ui-block', label: 'UI Block' },
      // { path: 'document', label: 'Document' },
      // { path: 'export-dialog', label: 'Export Dialog' },
      // { path: 'messages', label: 'Messages' },
      // { path: 'faqs', label: 'FAQs' },
      // { path: 'comments', label: 'Comments' },
      // { path: 'submit', label: 'Submit' },
      // { path: 'viewport', label: 'Viewport' },
      // { path: 'drag-drop', label: 'Drag & Drop' },
      // { path: 'ui-guides', label: 'UI Guides' },
    ],
  },
];
