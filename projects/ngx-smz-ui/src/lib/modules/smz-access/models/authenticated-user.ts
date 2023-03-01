

export interface AuthenticatedUser {
  isAuthenticated: boolean;
  hasTenant: boolean;
  hasNoTenant: boolean;
  claims: string[];
  username: string;
  tenant: string;
}
