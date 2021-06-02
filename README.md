# MIGRATION GUIDE

## Packages.json
* npm i tailwindcss
* npm i @fortawesome/fontawesome-free

## Angular.json
```typscript
...
"styles": [
    "projects/ngx-smz-demo/src/styles.scss",
    "node_modules/primeng/resources/primeng.min.css",
    "node_modules/primeicons/primeicons.css",
    "node_modules/primeflex/primeflex.min.css",
    "node_modules/@fortawesome/fontawesome-free/css/all.min.css"
  ],
...
```


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

## Setup

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
                "output": "/"
              }
            ],
            ...
          },
          ...
    ```

* In your `styles.scss` add styles imports.

    ```scss
    // SMZ-UI
    @import "~ngx-smz-ui/resources/assets/scss/smz-ui.scss";
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
* To customize the topbar content, you can use the ng-template tag `<ng-template pTemplate="headerExtras">Your code here.</ng-template>`.

    ```html
    <smz-ui-hephaestus-layout [menu]="menu" [profile]="profile" [notifications]="notifications">
      <router-outlet></router-outlet>

      <ng-template pTemplate="headerExtras">
        Your code here.
      </ng-template>

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

## Configuration file

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

# smz-data-info

## Setup

* Import the `NgxDataInfoModule` in the `Module` that you are going to use it.

    Example:
    ```typescript
    @NgModule({
    declarations: [
      ...
    ],
    imports: [
      ...
      NgxDataInfoModule,
      ...
    ],
    })
    export class SomeModule {
      ...
    }
    ```

## Simple Use

* In the HTML of your component, add the following tag.

    ```html
        <smz-data-info
            [image]="'assets/images/tables/empty.svg'"
            [message]="'No data was found.'"
            [callbackInfo]="'But you can update if you want.'"
            [callbackLabel]="'UPDATE'"
            (clicked)="someCallback()">
        </smz-data-info>
    ```

# smz-ui-table

See the `smz-ui-table` [documentation](tables.md).