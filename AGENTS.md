# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

Angular 21 component library monorepo (`ngx-smz-ui`) containing two publishable libraries (`@ngx-smz/core`, `@ngx-smz/layout`) and three demo/showcase apps (`playground`, `overview`, `demos`). Built on PrimeNG, NGXS, and Tailwind CSS.

### Development workflow

Both libraries **must be built** before any demo app can be served, because apps import from `@ngx-smz/core` and `@ngx-smz/layout` via TypeScript path aliases pointing to `dist/`.

1. Build `@ngx-smz/core`: `npx ng build ngx-smz-ui --configuration development`
2. Build `@ngx-smz/layout`: `npx ng build ngx-smz-ui-layout --configuration development`
3. Serve an app (e.g. demos): `npm run start:demos`

For watch mode during active development, use `npm run build-watch:smz-ui` and `npm run build-watch:smz-ui-layout` in separate terminals. See `package.json` scripts and `.vscode/tasks.json` for all available commands.

### Which demo app to use

- **`demos`** (port 4105): Self-contained component showcase. No external backend needed. Best for testing library changes.
- **`playground`** (port 4201): Has missing files (`@environments/environment`, `login-sso` component) that are likely gitignored. May not build without those.
- **`overview`** (port 4104): Requires an external .NET backend at `https://localhost:44380` which is not included in this repo.

### Linting

ESLint is configured via `.eslintrc.js` (v8 format). The config requires `eslint@8`, `@typescript-eslint/parser@7`, `@typescript-eslint/eslint-plugin@7`, `@angular-eslint/eslint-plugin`, and `eslint-plugin-import` as devDependencies. These are not tracked in the original `package.json` — they must be installed separately.

Run: `npx eslint 'projects/ngx-smz-ui/src/**/*.ts'`

Note: The existing codebase has many pre-existing lint errors (indentation, no-explicit-any, etc.) — these are not regressions.

### Testing

No `.spec.ts` test files exist in the codebase. Karma/Jasmine infrastructure is configured in `angular.json` but unused.

### Key gotchas

- The `@ngx-smz/core` library build must complete **before** starting `@ngx-smz/layout` build (layout depends on core).
- Library builds output to `dist/ngx-smz-ui` and `dist/ngx-smz-ui-layout` respectively.
- Node.js v22 and npm 10.x are required (matches `package.json` Angular 21 dependencies).
