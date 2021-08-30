# NGX-RBK-UTILS
# 1. Setup

* Install and setup all dependencies needed by the library
    * [primeng](https://www.npmjs.com/package/primeng)
    * [ngx-smz](https://www.npmjs.com/package/ngx-smz)
    * [@ngxs/store](https://www.npmjs.com/package/@ngxs/store)
    * [@ngxs/router-plugin](https://www.npmjs.com/package/@ngxs/router-plugin)
    * [@auth0/angular-jwt](https://www.npmjs.com/package/@auth0/angular-jwt)

* Install the library

        `npm install ngx-rbk-utils`

* Import the `NgxRbkUtilsModule` in your `AppModule` and pass the `buildState()` function in the `NgxsModule.forRoot()` method. Also import the `ToastModule` from `primeng`. Also add a provider for `NgxRbkUtilsConfig`

   > IMPORTANT: you must import the module BEFORE all other `ngxs` modules

    Example:
    ```typescript
    @NgModule({
    declarations: [
      ...
    ],
    imports: [
      ...
      NgxRbkUtilsModule.forRoot(rbkConfig),  // before NGXS modules
      ...
      NgxsModule.forRoot(buildState(), { developmentMode: !environment.production }),  // call the buildState()
      NgxsRouterPluginModule.forRoot(),
      NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production}),
      ...
    ],
    providers: [{ provide: NgxRbkUtilsConfig, useValue: rbkConfig }],
    bootstrap: []
    })
    export class AppModule {
      ...
    }
    ```

* In the constructor of the `AppModule`, inject the NGRX `Store` and dispatch the following action:

    ```typescript
    export class AppModule {
    constructor(private store: Store) {
        this.store.dispatch(new ApplicationActions.NgRxInitialized());
    }
    }
    ```
* Stil in `AppModule`, define the following as provider:

  ```typescript
    providers: [{ provide: NgxRbkUtilsConfig, useValue: rbkConfig }
  ```
  Obs: This is required for injection of NgxRbkUtilsConfig into auth.guard

* In your `AppComponent` inject the `BoilerplateService` and call the `.init()` method.

    ```typescript
    constructor(private boilerplateService: BoilerplateService) {
        this.boilerplateService.init();
    }
    ```

* In the `.forRoot()` method of the library you need to pass a configuration object. Please see the configuration section for the details.


* Define your `AppStateModel` for intellisense purposes

    ```typescript
    import { AppStateModel as RootStateModel } from 'ngx-rbk-utils';

    export interface AppStateModel extends RootStateModel
    {
        database: {
            state1: State1StateModel,
            state2: State2DbStateModel,
            state3: State3DbStateModel,
        },

        features: {
            feature1: Feature1StateModel,
            feature2: Feature2StateModel,
        };
    }
    ```

* Add `<p-toast>` and `<smz-general-dialog>` to your `app.component.html`

* Make sure you don't import `MessageService` from `primeng` in any of modules/components or the `ToastActions` from the library will not work

* In the constructor of your error page, clear the local storage with (or at least clear the properties that store the accessToken and the refreshTokemn):
```typescript
constructor() {
  localStorage.clear();
}
```

# 2. Configuration file

```typescript
import { NgxRbkUtilsConfig } from 'ngx-rbk-utils';

export const rbkConfig: NgxRbkUtilsConfig = {
    // Application name, will be shown in the browser's tab name
    applicationName: string,
    useTitleService?: boolean, // Flag to indicate wheter the TitleService should be initialized or not.
    routes: {
        // Url path of the landing page of your application, this will be  used to redirect the user when he tries to access a protected route and is not authenticated. Ex.: '/'
        nonAuthenticatedRoute: string,
        // Url path of the authenticated root page of your application, this will be  used to redirect the user when he tries to access a protected route, is  authenticated but does not have access to it. Ex.: '/editor'
        authenticatedRoute: string,
        // Url path of the login page of your application, this will be used to redirect the user if the library fails to refresh the JWT access token. Ex.: '/login'
        login: string,
        // Url path of the error page of your application this will be used to redirect the user if a request fail with the following status:
        // 500, 0 or unmapped status. Ex.: '/error
        error: string
    },
    authentication: {
        login: {
            // Full url of your login endpoint, must be POST and accepts the following object: { username: string, password: string }
            url: string,
            // How you want to handle the errors returned by this endpoint, possible values are 'toast', 'dialog' nad 'none'
            errorHandlingType: string,
            // Name of the access token property in the endpoint response
            responsePropertyName: string,
            // How you want to handle the loading state on the store, possible values are 'global', 'local' and 'none'
            loadingBehavior: string,
        },
        refreshToken: {
            // Full url of your login endpoint, must be POST and accepts the following object: { username: string, password: string }
            url: `https://dev.meuencartedigital.com.br/auth/refresh-token`,
            // How you want to handle the errors returned by this endpoint, possible values are 'toast', 'dialog' nad 'none'
            loadingBehavior: 'none',
            // Name of the access token property in the endpoint response
            errorHandlingType: 'toast',
            // How you want to handle the loading state on the store, possible values are 'global', 'local' and 'none'
            responsePropertyName: 'refreshToken',
            // Optional extra properties you can pass to refresh token api for validation. ex: {username: 'name', applicationId:'appId'}
            extraProperties: {[name: string]: string}
        },
        // Array of configuration objects for claims that need to be read from the access token. Please see the authorization section for more details
        accessTokenClaims: {claimName: string, propertyName: string, type: string} []
    },
    state: {
        // Setup for the database part of the state
        database: {[name: string]: DatabaseStateParameters},
        // Setup for the feature part of the state
        feature: {[name: string]: DatabaseStateParameters}
    },
    httpBehaviors: {
        // Default parameters to be used in all HTTP requests on services that inherit from BaseApiService
        defaultParameters: {
            compression: false,
            authentication: true,
            needToRefreshToken: true,
            loadingBehavior: 'global',
            errorHandlingType: 'toast',
            localLoadingTag: null,
            restoreStateOnError: true
        }
    },
    // Default contiguration for the PrimeNG Toast
    toastConfig: {
        severity: 'success',
        life: 3000,
        sticky: false,
        closable: true,
        successTitle: 'SUCESSO',
        errorTitle: 'ERRO',
        warningTitle: 'AVISO',
        infoTitle: 'INFORMAÇÃO',
    },
    // Default dialog titles
    dialogsConfig: {
        errorDialogTitle: 'ERRO',
        warningDialogTitle: 'ALERTA'
    }
};
```


# 3. Features

## Actions

The library uses many internal `NGXS` actions and exposes a series of them to the user. The following list constains the actions of the library, organized by namespace:

---

#### DatabaseActions

* `Clear`: cleans the `DatabaseStore`, using the callbacks specified in the config file (this action is automatically called when the `ApplicationActions.Logout` action is dispatched).

* `Restore`: re-emits the entire database store, in its current state, to force UI updates. This action can be manually dispatched but it's automatically dispatched everytime an http request returns a code different than 200. This behavior can be overrided for each individual request using the `restoreStateOnError` property in the `httpBehaviors` section of the config file.

---

#### FeatureActions

* `Clear`: cleans the `FeatureStore`, using the callbacks specified in the config file. (this action is automatically called when the `ApplicationActions.Logout` action is dispatched).

* `Restore`: re-emits the entire features store, in its current state, to force UI updates. This action can be manually dispatched but it's automatically dispatched everytime an http request returns a code different than 200. This behavior can be overrided for each individual request using the `restoreStateOnError` property in the `httpBehaviors` section of the config file.

---

#### GlobalActions

* `Clear`: cleans the `GlobalStore`, using the default data (this action is automatically called when the `ApplicationActions.Logout` action is dispatched).

* `Restore`: re-emits the entire global store, in its current state, to force UI updates. This action can be manually dispatched but it's automatically dispatched everytime an http request returns a code different than 200. This behavior can be overrided for each individual request using the `restoreStateOnError` property in the `httpBehaviors` section of the config file.

---

### AuthenticationActions

> The `RemoteLogin` and `Logout` actions should be manually fired by the client application.

* `RemoteLogin`: this action should be fired by the client application when the user clicks a LOGIN button. It will fire the login http request using the parameters of the config file. If this succeeds the `RemoteLoginSuccess` actions is dispatched. If it fails the error is handled either by showing a dialog with the error or a toast as set in the config file. The config section of the login request in the config file allows the user to pass extra static parameters with the login http request.

* `Logout`: this action should be manually dispatched when the user sign out.

> The following actions are automatically dispatched inside the library, in common use cases there is no need to dispatch or handle them:

* `LocalLogin`: when this action is dispatched the library tries to authenticate using the access token in the browser local storage.

* `LocalLoginSuccess`: this action is dispatched when the library successfully authenticate the user using the data stored in the local storage. This action automatically starts the process of loading the database stores from your API.

* `LocalLoginFailure`: this action is dispatched when the library failed to authenticate using the data in the local storage.

* `RemoteLoginSuccess`: this actions is dispatched when the login http resquests returns `200` and it automatically dispatched a `Navigate` action to the `authenticatedRoot` route path in the config file.

* `RefreshTokenSuccess`: this action is dispatched everytime an access token is successfully refreshed.

---

### ApplicationActions

`IMPORTANT`: these actions are not meant to be dispatched by the client application, they are for internal use only. But since they will show in the Redux Dev Tools, they will be described here.

* `HandleHttpErrorWithDialog`: this action is dispatched when an error handling flag in the config file set to `dialog`.

* `HandleHttpErrorWithToast`: this action is dispatched when an error handling flag in the config file set to `toast`.

* `StartGlobalLoading`: this action is dispatched when an http request is fired with the loading behavior flag set to `global` nad no other request is in progress.

* `StopGlobalLoading`: this action is dispatched when the last http request in progress is finished.

* `NgRxInitialized`: this actions is dispatched to flag when `NGXS` is initialized in the client application.

* `PushLocalLoading`: this action is dispatched when an http request is started with the loading behavior flag set to `toast`

* `PopLocalLoading`: this action is dispatched when an http request with the loading behavior flag set to `toast` is finished

---

## Selectors

The library automatically creates the `global` piece of the store containing application and authentication related data. To use this data the user manually query the store or use the selectors already exposed by the library:

### AuthenticationSelectors

* `accessToken`: returns the access token as `string`

* `refreshToken`: returns the refresh token as `string`

* `isAuthenticated`: returns true if the user is authenticated

* `userdata`: return the whole object constructed using the JWT token data. Since its properties are dynamic (set in the config file) this selector returns an object of type `any` and should be cast to your user model as can be seen in the example below.

    ```typescript
    const data = this.store.selectSnapshot(AuthenticationSelectors.userdata) as MyUserModel
    ```

* `username`: returns the name of user as it is in the JWT access token in the claim, but only if a property `username` is setup in the `accessTokenClaims` property in the config file.

* `hasGroupOfClaimAccess`: receives an array of claims and returns true if the user has all claims in its access token. The claims can have a domain or not. More details in the `Claims Domain` section

* `hasClaimAccess`: receives a claim and returns true if the user has this claim in its access token. The claim can have a domain or not. More details in the `Claims Domain` section

---

### ApplicationSelectors

* `globalIsLoading`: returns true if there is any http request (using the `global` in the loading behavior flag) in progress.

* `isDatabaseStateInitialized`: returns true if all pieces of the `database` store are initialized.

* `isWaitingRequest`: receives a string containing a local loading http tag and returns true if there is any http request with this tag in progress.

---

## Database state auto initialization

One of the main features of this library is to easy the burden of loading shared states (called as database states here) and knowing if their data is already loaded.

In the concept of database stores all data that should be readibly available to the application and shared between components should be loaded before component initialization.

This way all this loading is centralized in a single part of the code and you don't have to manually fire their load actions in multiple parts of the code.

This approach works very well and make the perfect balance between performance and resources. Only the states needed for a given component will be loaded and only if they are not ready.

One of the greatest features of `NGXS` is also the one that can gives more headaches in some scenarios, the `selectSnapshot` function. When the users enters your application using a route that needs certain data to render something, Angular will load the component before the data arrive from the backend and you're using `selectSnapshot` instead of `select` from NGXS.

The obvious solution is to use the `select` function. But in many cases the `select` is an overkill since it returns an `Observable` and it's a lot easier to work directly with the results of a variable. This is specially true for the contents of dropdown or lists. For this reason we prefer to use the `selectSnapshot` feature of NGXS, but this gets the value of the state in the moment it was called and it's never updated again. So we need to be sure to call it only we are sure that the data is loaded in the store.

To solve this problem the library exposes a route guard called `RbkDatabaseGuard`. You specify the states that are needed for a given route and it makes this data to be ready before letting Angular load the component.

The following code show how the setup is made in the route:

```typescript
{
    path: 'my-route',
    canActivate: [ RbkAuthGuard, RbkDatabaseStateGuard ],
    component: MyComponent,
    data: { title: 'Title', breadcrumb: 'Title', requiredStates: ['accounts', 'categories'] },
}
```

As can be seen, the `RbkDatabaseStateGuard` is being used in the `canActivate` property of the route and the required states for the route are specified in the array of the `requiredStates` property of the `data` property.

The values used in the `requiredStates` property must match the names of the states in the configuration file.

> Rembember that if any of the required states needs authentication, the `RbkAuthGuard` guard must be specified before the `RbkDatabaseStateGuard` guard.

There is also the `DatabaseSelectors.areStatesInitialized` selector that lets you manually check if some states are initialized or not. It receives an array of strings representing the states you want to check.

With the route approach you don't have to bother with anything in your component, when Angular reaches it you can be 100% sure that all required states are ready.

### States Setup

For this feature to work properly the states must be set in the configuration file like this:

```typescript
state: {
    database: {
        transactions: {                                  // <- State name (same name used in the state class in the @State() decorator)
            state: TrasactionsDbState,                   // <- State class
            loadAction: TransactionsDbActions.LoadAll,   // <- Action used to load the state
            clearFunction: getTransactionsInitialState,  // <- Function to restore this state to it's initial value
            cacheTimeout: 5                              // <- Cache timeout (in minutes)
        },
        categories: {
            state: CategoriesDbState,
            loadAction: CategoriesDbActions.LoadAll,
            clearFunction: getCategoriesInitialState,
            cacheTimeout: 1
        },
        accounts: {
            state: AccountsDbState,
            loadAction: AccountsDbActions.LoadAll,
            clearFunction: getAccountTypesInitialState,
            cacheTimeout: 1
        },
        accountTypes: {
            state: AccountTypesDbState,
            loadAction: AccountTypesDbActions.LoadAll,
            clearFunction: getAccountsInitialState,
            cacheTimeout: 1
        },
    },

    // The feature state configuration only requires the state and clear function property
    feature: {
        categoriesManager: {
            state: CategoriesManagerState,
            clearFunction: getCategoriesManagerInitialState
        },
        accountsManager: {
            state: AccountsManagerState,
            clearFunction: getAccountsManagerInitialState
        },
    }
},
```
> `IMPORTANT:` this feature will only work if the states used as requirements for the routes have a `lastUpdated` property that is initialized with `null` and set with the current time when it's first populated.

---

## Authentication and authorization
### Route authentication guard
The library provides an authentication route guard called `RbkAuthGuard`.

The checks made by the guard are the following:

* if the route does not need any special claim, return the value in the `AuthenticationSelectors.isAuthenticated` selector

* if the route needs any special claim, it should be passed to the router like this:

    ```typescript
    const routes: Routes = [
    {
        path: 'authenticated-route',
        component: AuthenticatedRouteComponent,
        canActivate: [ RbkAuthGuard ],
        data: { title: 'My Route', breadcrumb: 'My Route', claim: 'CAN_ACCESS_MY_AUTHENTICATED_ROUTE' },
        children: [
        ...
        ]
    },
    ];
    ```
* when the route needs any special claim, the guard will search for that claim in the user data, if the user is authenticated and he has the needed claim the access is allowed.

* when the route needs any special claim and the guard doesn't find that claim directly in the user data, it will try to find a claim in the format `{{domain}}|{{claim}}`. The domain is read from the `domain` property in the user data. If you need to use this domain feature, you need to set it in the `accessTokenClaims` property in the config file.

---

### rbkCanAccess pipe

This pipe is used to restrict access of HTML components using `*ngIf`. For instance, the following sample renders the `div` only if the user has the `IS_ADMIN` claim in the JWT token.

```typescript
export class MyComponent {
  public isAdminClaim = 'IS_ADMIN';

  constructor() {
  }
}
```

```html
<div *ngIf="!(isAdminClaim | rbkCanAccess)">
</div>
```

---

## Global error handling
All http errors are automatically handled by the library through interceptors. This behavior is set in the config file by the `httpBehaviors` property and can be overrided individually for each request, like this:

```typescript
return this.http.post(url, body,
    this.generateDefaultHeaders({
        errorHandlingType: 'toast',
    }));
```

There are three possible values: `toast`, `dialog` and `none`.

Every time request returns an error, all the states are emmited again, in their current state, force UI refresh. This behavior can be overrided for each individual request using the `restoreStateOnError` property in the `httpBehaviors` section of the config file.

## Loading flag

The library offers three ways of handling in progress http requests:

* GLOBAL: when am http request is started, the loading flag in the store is set. If another request is started before the previous is finished, the flag will remain set. Only when the last request is finished the flag will be set to false. This flag can be observed using the `ApplicationSelectors.globalIsLoading` selector.

* LOCAL: with this option an individual flag is set for each request and they can be observed using the `ApplicationSelectors.isWaitingRequest` selector, passing the `id` used in the http request. The following sample shows how to use this option for a give request:

```typescript
return this.http.post(url, body,
    this.generateDefaultHeaders({
        loadingBehavior: 'local',
        localLoadingTag: 'my-request-id'
    }));
```

* NONE: none of the store loading flags will be set.

You can set the default values for all http requests in the `httpBehaviors` property of the config file. But this value can be individually overriden on each request like in the examples above.

## Http request behaviors
To fully use all the features of the library, all the http services must inherit from the `BaseApiService`. This way all requests will use the default values set in the config file, but if any value needs to be overriden it should be done using the `generateDefaultHeaders` method of te base class. The following sample shows how to do this:

```typescript
return this.http.post(url, body,
    this.generateDefaultHeaders({
        errorHandlingType: 'dialog',
        loadingBehavior: 'local',
        localLoadingTag: 'my-request-id',
        compression: true,
        authentication: true,
        needToRefreshToken: true
    }));
```

> Note that there is no need to set all values, only the ones that are actually needed.


## Title service
This service is used to set the title that will be displayed in the browser tab. The title needs to be set in the route, and if it's not set the service will try to infere it from the route name. The following example show how the title is set in the route.

```typescript
    {
        path: 'my-route',
        component: MyComponent,
        data: { title: 'My Title' },
    }
```
The example above will set the tab title to `XX > My Title`, in which the `XX` is the value of the `applicationName` property in the config file.

The `TitleService` is already injected by the library.

## Breadcrum service

This service constructs a breadcrum object to be used in the application breadcrum (really!). It's used the same way as the `TitleService` and it uses the same property of the route.

The `BreadcrumService` is already injected by the library.

## UI utilities

* `rbkTableClearExtension`: this directive is used to help with the cleaning of filters in `Table` and `TreeTable` components. It extends them by appending the `clear` methods to them. It must be used in the table and every filter input that needs to be cleared must use the `rbkInputClearExtension` directive. Below is a sample of how it should be used.

```html
<p-treeTable #dt [tableClearExtension]="dt" ...>
    <ng-template pTemplate="colgroup">
        ...
    </ng-template>

    <ng-template pTemplate="header">
        <tr>
            ...
        </tr>

        <tr>
            <th><input #input1 [inputClearExtension]="{ table: dt, component: input1 }" pInputText type="text" (input)="dt.filter($event.target.value, 'productHtml', 'contains')"></th>

            <th><p-multiSelect #input2 [inputClearExtension]="{ table: dt, component: input2 }" (onChange)="dt.filter($event.value, 'details.warehouse.id', 'simplenamed')" appendTo="body"></p-multiSelect></th>
        </tr>
    </ng-template>

    <ng-template pTemplate="body" let-rowNode let-rowData="rowData">
        ...
    </ng-template>
</p-treeTable>
```

## Utility functions

* `replaceArrayItem:`: replaces an item in a given array by other with the same `id`. The items must have an `id`. It's used to help with state updates.

* `isWithinTime:`: verifies if the data of a specific database store is still valid given the maximum age in minutes.

* `orderArrayByProperty:`: sort an array of objects by a given property.

* `isEmpty:`: checks wheter a string is `null`, `undefined` or `''`.

* `clearArray:`: removes all elements of an array.

* `flattenObject:`: when dialog data is returned by the `ngx-smz` dialogs, it may have many properties of type `SimpleNamedEntity`, and this data is usually used to be send to an API, which probably needs a property `employeeId` of type `string` instead of a property `employee` of type `{ id: string, name: string}`. This function does this kind of transformation in the object, it finds all object propertyes that have an `id` property and converts it to `{{propertyName}}id`. It also has a generic type to cast the data to the specified type.

The following example shows the input of the function the what the output would be.

```typescript
    // Use (result will be of type 'MyType')
    const result = flattenObject<MyType>(input);

    // input
    {
        id: '2',
        color: '#4d3a8f',
        category: {
            id: '9',
            name: 'My category',
            icon: 'fa fas-home'
        },
        order: 19,
        parent: {
            id: '3',
            name: 'My parent'
        }
    }

    // output
    {
        id: '2',
        color: '#4d3a8f',
        categoryId: '9',
        order: 19,
        parentId: '3'
    }
```

* `fixDateProperties:`: converts any date property stored as string or number to a Date object. The property name must starts with `date` or ends with `Date`. The operation is done in the same object passed to the function as a parameter. If the date is stored as epoch it can be either in seconds or miliseconds.

##  RXJS custom operators

* `fixDates`: this operator do the same as the `fixDateProperties`, but wrapped in a more convenient way for objects coming from an http request.



# NGX-SMZ-UI MIGRATION GUIDE

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