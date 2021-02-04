export interface SmzRouteData
{
  layout: RouteLayoutData;
  appArea: string;
  title: string;
  clearReusableRoutes: boolean;
}

export interface RouteLayoutData
{
  mode: 'layout' | 'none'
}