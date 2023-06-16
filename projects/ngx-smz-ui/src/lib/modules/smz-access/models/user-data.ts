export interface UserData {
  username: string;
  roles: string[];
  avatar: string;
  tenant: string;
  displayName: string;
  hasTenant: boolean;
  allowedTenants: string[];
 }