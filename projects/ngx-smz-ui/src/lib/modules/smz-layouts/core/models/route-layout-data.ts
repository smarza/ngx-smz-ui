import { ReusableRouteConfig } from 'ngx-rbk-utils';

export interface SmzRouteData
{
  layout?: RouteLayoutData;
  appArea?: string;
  title?: string;
  clearReusableRoutes?: boolean;
  requiredStates?: string[];
  claim?: string;
  cacheStrategy?: ReusableRouteConfig;
}

export interface RouteLayoutData
{
  mode?: 'layout' | 'none';
  contentPadding?: '0px' | '1em' | '2em';
}