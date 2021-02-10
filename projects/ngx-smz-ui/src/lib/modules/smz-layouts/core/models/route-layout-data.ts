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
  mode: 'layout' | 'none'
}