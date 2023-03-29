export interface BaseUserData {
  username: string;
  roles: string[];
  picture: string;
  tenant: string;
  displayName: string;
  hasTenant: boolean;
  allowedTenants: string[];
}