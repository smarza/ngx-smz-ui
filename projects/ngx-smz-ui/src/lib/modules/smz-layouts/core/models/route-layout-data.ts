import { ReusableRouteConfig } from 'ngx-rbk-utils';
import { FaqsRouterConfig } from '../../../smz-faqs/models/faqs';

export interface SmzRouteData
{
  layout?: RouteLayoutData;
  appArea?: string;
  title?: string;
  clearReusableRoutes?: boolean;
  requiredStates?: string[];
  claim?: string;
  cacheStrategy?: ReusableRouteConfig;
  faqs?: FaqsRouterConfig;
}

export interface RouteLayoutData
{
  mode?: 'full' | 'menu-only' | 'none';
  hideFooter?: boolean;
  contentPadding?: string;
}