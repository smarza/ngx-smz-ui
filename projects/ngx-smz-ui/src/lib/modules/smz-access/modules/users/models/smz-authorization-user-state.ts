import { SmzTableBuilder } from '../../../../../builders/smz-tables/state-builder';
import { HttpBehaviorParameters } from '../../../../rbk-utils/http/base-api.service';
import { SmzMenuItem } from '../../../../smz-menu/models/smz-menu-item';

export interface SmzAuthorizationUserState<TData> {
  table?: {
    customBuilder?: () => SmzTableBuilder<TData>;
    useDefaultMenu?: boolean;
  }
  pageActions?: SmzMenuItem[];
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
  removalBehavior?: 'deletion' | 'deactivation';
}