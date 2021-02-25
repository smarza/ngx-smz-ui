export interface SmzRouteData
{
  layout?: RouteLayoutData;
  appArea?: string;
  title?: string;
  clearReusableRoutes?: boolean;
  requiredStates?: string[];
}

export interface RouteLayoutData
{
  mode?: 'layout' | 'none';
  contentPadding?: '0px' | '1em' | '2em';
}