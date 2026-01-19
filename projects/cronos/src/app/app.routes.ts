import { Routes } from '@angular/router';
import { ClaimDefinitions } from '@models/claim-definitions';
import { AnnualPlanningDetailsPageComponent } from '@pages/annual-planning-details/annual-planning-details-page.component';
import { AnnualPlanningListPageComponent } from '@pages/annual-planning-list/annual-planning-list-page.component';
import { AnnualPlanningScenarioDetailsPageComponent } from '@pages/annual-planning-scenario-details/annual-planning-scenario-details-page.component';
import { AnnualPlanningScenariosComparisonPageComponent } from '@pages/annual-planning-scenarios-comparison/annual-planning-scenarios-comparison-page.component';
import { HomePageComponent } from '@pages/home/home-page.component';
import { SsoRoutes } from '@pages/login-sso/sso.routes';
import { ANNUAL_PLANNING_DETAILS_PATH, ANNUAL_PLANNING_LIST_PATH, ANNUAL_PLANNING_SCENARIO_DETAILS_PATH, ANNUAL_PLANNING_SCENARIOS_COMPARISON_PATH, HOME_PATH } from '@routes';
import { ANNUAL_PLANNINGS_STATE_NAME } from '@state/database/annual-plannings/annual-plannings.state';
import { ANNUAL_PLANNINGS_FT_STATE_NAME } from '@state/features/annual-plannings/annual-plannings.state';
import { SCENARIOS_FT_STATE_NAME } from '@state/features/scenarios/scenarios.state';
import { RbkAuthGuard, RbkDatabaseStateGuard } from '@ngx-smz/core';
import { ErrorsRoutes } from '@ngx-smz/layout';
import { AppLayout } from '@ngx-smz/layout';

export const routes: Routes = [
  ...SsoRoutes, // SSO Customization
  ...ErrorsRoutes, // Error Page, Access Page, Not Found Page
  {
    path: '',
    canActivate: [RbkAuthGuard],
    children: [
      {
        path: '',
        canActivate: [RbkDatabaseStateGuard],
        data: {
          layout: { mode: 'full', contentPadding: '1em' },
          requiredStates: []
        },
        children: [
          {
            path: '',
            component: AppLayout,
            data: {
              smzUiRoot: true,
            },
            children: [
              { path: HOME_PATH, component: HomePageComponent },
              { path: '', redirectTo: HOME_PATH, pathMatch: 'full' },
              {
                path: ANNUAL_PLANNING_LIST_PATH,
                component: AnnualPlanningListPageComponent,
                canActivate: [RbkDatabaseStateGuard],
                data: {
                  title: 'Planejamentos Anuais',
                  claims: [ ClaimDefinitions.VIEW_ANNUAL_PLANNING ],
                  requiredStates: [ANNUAL_PLANNINGS_STATE_NAME]
                }
              },
              {
                path: ANNUAL_PLANNING_DETAILS_PATH,
                component: AnnualPlanningDetailsPageComponent,
                data: {
                  title: 'Planejamento Anual',
                  claims: [ ClaimDefinitions.VIEW_ANNUAL_PLANNING ],
                  requiredStates: [ANNUAL_PLANNINGS_STATE_NAME],
                  requiredFeatureStates: [ANNUAL_PLANNINGS_FT_STATE_NAME, SCENARIOS_FT_STATE_NAME]
                }
              },
              {
                path: ANNUAL_PLANNING_SCENARIOS_COMPARISON_PATH,
                component: AnnualPlanningScenariosComparisonPageComponent,
                data: {
                  title: 'Comparação de Cenários',
                  claims: [ ClaimDefinitions.VIEW_ANNUAL_PLANNING ]
                }
              },
              {
                path: ANNUAL_PLANNING_SCENARIO_DETAILS_PATH,
                component: AnnualPlanningScenarioDetailsPageComponent,
                data: {
                  title: 'Cenário de Planejamento Anual',
                  requiredFeatureStates: [SCENARIOS_FT_STATE_NAME],
                  claims: [ ClaimDefinitions.VIEW_ANNUAL_PLANNING ]
                }
              },
            ]
          }
        ]
      },
    ],
  },
];