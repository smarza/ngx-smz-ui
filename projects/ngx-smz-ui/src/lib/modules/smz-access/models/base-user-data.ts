export interface BaseUserData {
  username: string;
  roles: string[];
  picture: string;
  tenant: string;
  displayName: string;
  allowedTenants: string[];
}