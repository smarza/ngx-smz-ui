import { SmzTableBuilder } from '../../../../../builders/smz-tables/state-builder';
import { HttpBehaviorParameters } from '../../../../rbk-utils/http/base-api.service';
import { MenuCreation } from '../../../../smz-layouts/core/models/menu-creation';

export interface SmzAuthorizationUserState {
  table?: {
    defaultBuilder?: () => SmzTableBuilder;
    customBuilder?: () => SmzTableBuilder;
    useDefaultMenu?: boolean;
  }
  pageActions?: MenuCreation[];
  router?: {
      path: string,
      claim?: string
  },
  title?: string;
  httpBehavior?: Partial<HttpBehaviorParameters>;
  manageUserRolesUpdateClaim?: string;
  manageUserClaimsUpdateClaim?: string;
  avatarPlaceholderPath?: string;
  isVisible?: boolean;
}