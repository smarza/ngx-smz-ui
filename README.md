# 1. Setup

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

* Import the `NgxSmzLayoutsModule` in your `AppModule` and pass the initial configuration data. Also import the LayoutTheme Module of your choice (Ex. DiamondLayoutModule)

    Example:
    ```typescript
    @NgModule({
    declarations: [
      ...
    ],
    imports: [
      ...
      NgxSmzLayoutsModule.forRoot(smzLayoutsConfig),
      DiamondLayoutModule,
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
// s