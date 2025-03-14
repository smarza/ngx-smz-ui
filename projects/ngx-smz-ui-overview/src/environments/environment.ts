// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  version: 'development_v',
  databaseCacheTimeout: 2,
  // serverUrl: 'https://lib.horizon-solutions.ml',
  // authenticationApi: 'https://lib.horizon-solutions.ml',
  serverUrl: 'https://localhost:44380',
  authenticationApi: 'https://localhost:44380',
  // serverUrl: 'https://reefkeeper.com.br',
  // authenticationApi: 'https://reefkeeper.com.br',
  applicationId: 'SMZ-UI-OVERVIEW',
    baseHref: '/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

