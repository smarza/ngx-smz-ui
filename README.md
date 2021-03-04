
* Install and setup all dependencies needed by the library
    * [primeng](https://www.npmjs.com/package/primeng)
    * [primeflex](https://github.com/primefaces/primeflex#readme)
    * [primeicons](https://github.com/primefaces/primeicons#readme)
    * [ngx-smz-dialogs](https://www.npmjs.com/package/ngx-smz-dialogs)
    * [ngx-rbk-utils](https://www.npmjs.com/package/ngx-rbk-utils)
    * [@ngxs/store](https://www.npmjs.com/package/@ngxs/store)
    * [@ngxs/router-plugin](https://www.npmjs.com/package/@ngxs/router-plugin)
    * [@auth0/angular-jwt](https://www.npmjs.com/package/@auth0/angular-jwt)
    * [animate.css](https://animate.style/)
    * [hover.css](https://github.com/IanLunn/Hover#readme)

* Install the library

        `npm install ngx-smz-ui`

# smz-layouts

# 1. Setup

* In your `angular.json` add the assets imports.

    ```typscript
      ...
      "architect": {
        "build": {
          ...
          "options": {
            ...
            "assets": [
              ...
              {
                "glob": "**/*",
                "input": "node_modules/ngx-smz-ui/resources",
                "output": "/assets/"
              }
            ],
            ...
          },
          ...
    ```

* In your `styles.scss` add styles imports.

    ```scss
    // SMZ-UI
    @import "~ngx-smz-ui/resources/scss/smz-ui.scss";
    ```

* Import the `NgxSmzLayoutsModule` in your `AppModule` and pass the initial configuration data. Also import the LayoutTheme Module of your choice (Ex. HephaestusLayoutModule)

    Example:
    ```typescript
    @NgModule({
    declarations: [
      ...
    ],
    imports: [
      ...
      NgxSmzLayoutsModule.forRoot(smzLayoutsConfig),
      HephaestusLayoutModule,
      ...
    ],
    })
    export class AppModule {
      ...
    }
    ```

* In your `AppComponent` add the layout component with the `<router-outlet></router-outlet>` tags to the html template.

    ```html
    <smz-ui-hephaestus-layout [menu]="menu" [profile]="profile" [notifications]="notifications">
      <router-outlet></router-outlet>
    </smz-ui-hephaestus-layout>
    ```

* In the `.forRoot()` method of the library you need to pass a configuration object. Please see the configuration section for the details.

    ```typescript
    @Component({
      selector: 'app-root',
      templateUrl: './app.component.html',
      styleUrls: ['./app.component.scss']
    })
    export class AppComponent {
      public menu: MenuItem[] = [];

      constructor() {

      }
    ```

* Define a `SmzRouteData` on every route of the application. This will guide the behavior of the layout.

    ```typescript
    import { NgModule } from '@angular/core';
    import { Routes, RouterModule } from '@angular/router';
    import { CommonModule } from '@angular/common';
    import { HomeComponent } from './home.component';
    import { SmzRouteData } from 'ngx-smz-ui';

    const data: SmzRouteData = {
      layout: {
        mode: 'layout'
      },
      title: 'Home',
      appArea: 'home',
      clearReusableRoutes: true
    };

    const routes: Routes = [
      {
        path: '',
        children: [
          {
            path: '',
            component: HomeComponent,
            data
          },
        ]
      },
    ];

    @NgModule({
      imports: [
        CommonModule,
        RouterModule.forChild(routes),
      ],
      exports: [],
      declarations: [
        HomeComponent
      ],
      providers: [

      ],
    })
    export class HomeModule { }
    ```

# 2. Configuration file

```typescript
    import { SmzLayoutsConfig, SmzMenuType, SmzSidebarState, SmzLayoutTheme, SmzContentTheme, SmzLoader } from 'ngx-smz-ui';

    export const smzLayoutsConfig: SmzLayoutsConfig = {
      debugMode: false,
      appLogo: {
          horizontal: {
              dark: 'assets/layout/images/horizontal-dark.svg',
              light: 'assets/layout/images/horizontal-light.svg'
          },
          vertical: {
              dark: 'assets/layout/images/vertical-dark.svg',
              light: 'assets/layout/images/vertical-light.svg'
          },
          typo: {
              dark: 'assets/layout/images/typo-dark.svg',
              light: 'assets/layout/images/typo-light.svg'
          },
          icon: {
              dark: 'assets/layout/images/icon-dark.svg',
              light: 'assets/layout/images/icon-light.svg'
          },
      },
      appName: 'Demo App',
      footerText: '© Your Organization - 2021',
      layout: {
          menuType: SmzMenuType.SLIM,
          sidebarState: SmzSidebarState.ACTIVE,
          layoutTheme: SmzLayoutTheme.DARKGRAY,
          contentTheme: SmzContentTheme.PRIMEONE_LIGHT,
          loader: {
              type: SmzLoader.CUBE,
              title: 'Carregando...',
              message: 'Aguarde por favor'
          },
          sidebarWidth: '16rem',
          sidebarSlimWidth: '6rem'
      },
      assistance: {
          isEnabled: true,
          sidebarData: {
              position: 'right'
          }
      },
      dialogs: {
          closeAllAfterNavigate: true,
      },
      applicationActions: {
          registerLogs: true,
      }
    };
```

# smz-tables

# 1. Setup

* Import the `NgxSmzTablesModule` in your `Module`.

    Example:
    ```typescript
    @NgModule({
    declarations: [
      ...
    ],
    imports: [
      ...
      NgxSmzTablesModule,
      ...
    ],
    })
    export class AppModule {
      ...
    }
    ```

* If you are not already using smz-layouts in the project, you will going to need some table styles, to do so, in your `styles.scss` add styles imports.

    ```scss
    // SMZ-UI
    @import "~ngx-smz-ui/resources/scss/smz-tables.scss";
    ```

# 2. Simple Use

* In the HTML of your component, add the following tag.

    ```html
    <smz-ui-table [items]="items$ | async" [config]="config">
    ```

* In the component, add the configuration for the table component.

    ```typescript
    export class ExampleComponent implements OnInit {
      ...
      public config: SmzTableConfig;

      constructor() {
        this.config = {
          currentPageReportTemplate: 'Mostrando {first} a {last} de {totalRecords} itens',
          isSelectable: true,
          rowHover: true,
          rows: 5,
          rowsPerPageOptions: [5, 10, 50, 100, 500],
          showActions: true,
          showCaption: true,
          showCurrentPageReport: true,
          showGlobalFilter: true,
          showPaginator: true,
          showClearFilter: true,
          title: 'Permissões de Trabalho',
          useCustomActions: false,
          customActionWidth: '5em',
          menu: [
            { label: 'Editar', icon: 'pi pi-fw pi-plus', command: (event) => this.test(event) },
            { separator: true },
            { label: 'Apagar', icon: 'pi pi-fw pi-download', command: (event) => this.test(event) },
          ],
          columns: [
            {
              field: 'number',
              header: 'Número',
            },
            {
              field: 'plant.name',
              header: 'Planta',
            },
            {
              field: 'campaign.name',
              header: 'Campanha',
            },
            {
              field: 'description',
              header: 'Descrição',
            },
            {
              contentType: SmzContentType.CALENDAR,
              field: 'date',
              header: 'Data',
            },
          ]
        };
      }
    ```

# 3. Advanced Use

* To customize the cell content or the action cell, add the pTemplate="content" or pTemplate="actions" tag in the HTML of your component.

    ```html
      <smz-ui-table [items]="items$ | async" [config]="config" [loading]="loading" (selectionChange)="test($event)">

        <!-- CONTEÚDOS COM OVERRIDE -->
        <ng-template pTemplate="content" let-item let-col="col">

          <ng-container [ngSwitch]="col.field">
            <ng-container *ngSwitchCase="'description'">
              >> {{ item.description }}
            </ng-container>

            <ng-container *ngSwitchCase="'price'">
              -- {{ item.price }}
            </ng-container>
          </ng-container>

        </ng-template>

        <!-- AÇÕES PERSONALIZADAS -->
        <ng-template pTemplate="actions" let-item>
          <button pButton type="button" class="p-button-secondary" icon="pi pi-cog" (click)="test(item)"></button>
        </ng-template>

      </smz-ui-table>
    ```

* In the component, add the configuration for the table component.
The custom content is going to be called just to the columns with contentData.useTemplate set to true.

    ```typescript
    export class ExampleComponent implements OnInit {
      ...
      public config: SmzTableConfig;

      constructor() {
        this.config = {
          currentPageReportTemplate: 'Mostrando {first} a {last} de {totalRecords} itens',
          isSelectable: true,
          rowHover: true,
          rows: 5,
          rowsPerPageOptions: [5, 10, 50, 100, 500],
          showActions: true,
          showCaption: true,
          showCurrentPageReport: true,
          showGlobalFilter: true,
          showPaginator: true,
          showClearFilter: true,
          title: 'Permissões de Trabalho',
          useCustomActions: false,
          customActionWidth: '5em',
          menu: [
            { label: 'Editar', icon: 'pi pi-fw pi-plus', command: (event) => this.test(event) },
            { separator: true },
            { label: 'Apagar', icon: 'pi pi-fw pi-download', command: (event) => this.test(event) },
          ],
          columns: [
            {
              contentType: SmzContentType.ICON,
              contentData: { useTemplate: false, matches: [ { icon: 'fas fa-check', class: 'green-text darken-3', value: true }, { icon: 'fas fa-times', class: 'red-text darken-2', value: false } ] },
              field: 'isActive',
              filterType: SmzFilterType.BOOLEAN,
              header: 'Situação',
              isGlobalFilterable: false,
              isOrderable: false,
              showFilter: true,
              width: '8em',
              isVisible: true,
            },
            {
              contentType: SmzContentType.TEXT,
              contentData: { useTemplate: false },
              field: 'number',
              filterType: SmzFilterType.TEXT,
              header: 'Número',
              isGlobalFilterable: true,
              isOrderable: false,
              showFilter: true,
              width: '8em',
              isVisible: true,
            },
            {
              contentType: SmzContentType.TEXT,
              contentData: { useTemplate: false },
              field: 'plant.name',
              filterType: SmzFilterType.DROPDOWN,
              header: 'Planta',
              isGlobalFilterable: true,
              isOrderable: true,
              showFilter: true,
              width: '8em',
              isVisible: true,
            },
            {
              contentType: SmzContentType.TEXT,
              contentData: { useTemplate: false },
              field: 'campaign.name',
              filterType: SmzFilterType.MULTI_SELECT,
              header: 'Campanha',
              isGlobalFilterable: true,
              isOrderable: true,
              showFilter: true,
              isVisible: true,
            },
            {
              contentType: SmzContentType.TEXT,
              contentData: { useTemplate: false },
              field: 'description',
              filterType: SmzFilterType.TEXT,
              header: 'Descrição',
              isGlobalFilterable: true,
              isOrderable: true,
              showFilter: true,
              isVisible: true,
            },
            {
              contentType: SmzContentType.CURRENCY,
              contentData: { useTemplate: true },
              field: 'price',
              filterType: SmzFilterType.CURRENCY,
              header: 'Preço',
              isGlobalFilterable: true,
              isOrderable: true,
              showFilter: true,
              width: '8em',
              isVisible: true,
            },
            {
              contentType: SmzContentType.CALENDAR,
              contentData: { useTemplate: false, format: 'shortDate' },
              field: 'date',
              filterType: SmzFilterType.DATE,
              header: 'Data',
              isGlobalFilterable: true,
              isOrderable: true,
              showFilter: true,
              width: '8em',
              isVisible: true,
            },
          ]
        };
      }
    ```