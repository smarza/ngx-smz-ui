import { ReusableRouteConfig } from '../../../rbk-utils/utils/reusable-route';
import { FaqsRouterConfig } from '../../../smz-faqs/models/faqs';

export interface SmzRouteData
{
  layout?: RouteLayoutData;
  appArea?: string;
  title?: string;
  clearReusableRoutes?: boolean;
  requiredStates?: string[];
  requiredFeatureStates?: string[],
  claim?: string;
  cacheStrategy?: ReusableRouteConfig;
  faqs?: FaqsRouterConfig;
}

export interface RouteLayoutData
{
  mode?: 'full' | 'menu-only' | 'topbar-only' | 'none' | 'custom';
  hideFooter?: boolean;
  contentPadding?: string;
  contentStyleClass?: string;
}