// import { environment } from '@environments/environment';
import { NgxsConfig } from '@ngxs/store';
import { NgxsRouterPluginOptions } from '@ngxs/router-plugin';
import { buildState } from '@ngx-smz/core';

export const STATES_MODULES = buildState();

export const OPTIONS_CONFIG: Partial<NgxsConfig> = {
  /**
   * Run in development mode. This will add additional debugging features:
   * - Object.freeze on the state and actions to guarantee immutability
   * todo: you need set production mode
   * import { environment } from '@env';
   * developmentMode: !environment.production
   */
  developmentMode: false // !environment.production
};

// export const DEVTOOLS_REDUX_CONFIG: NgxsDevtoolsOptions = {
//   /**
//    * Whether the dev tools is enabled or note. Useful for setting during production.
//    * todo: you need set production mode
//    * import { environment } from '@env';
//    * disabled: environment.production
//    */
//   disabled: false // environment.production
// };

// export const LOGGER_CONFIG: NgxsLoggerPluginOptions = {
//   /**
//    * Disable the logger. Useful for prod mode..
//    * todo: you need set production mode
//    * import { environment } from '@env';
//    * disabled: environment.production
//    */
//   disabled: true //environment.production
// };

export const ROUTE_CONFIG: NgxsRouterPluginOptions = {

};
