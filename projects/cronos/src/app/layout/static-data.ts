import { ANNUAL_PLANNING_LIST_PAGE_ROUTE } from '@routes';
import { AuthClaimDefinitions, USERS_PAGE_ROUTE } from '@ngx-smz/core';
import { MenuItem } from 'primeng/api';
import { ClaimDefinitions } from '@models/claim-definitions';

// TODO: Verificar como implementar CLAIMS na nova navbar
export const INITIAL_SIDEBAR: MenuItem[] = [
  {
    label: 'Planejamento de Pintura',
    items: [
      { label: 'Planejamento Anual', icon: 'fa-solid fa-gauge', routerLink: ANNUAL_PLANNING_LIST_PAGE_ROUTE, claims: [ ClaimDefinitions.VIEW_ANNUAL_PLANNING ] },
    ]
  },
  {
    label: 'SISTEMA',
    items: [
      { label: 'Usuários', icon: 'fa-solid fa-user', routerLink: USERS_PAGE_ROUTE, claims: [ AuthClaimDefinitions.MANAGE_USERS ] },
    ]
  }
];