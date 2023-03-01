import { CreateTenantAdminUser } from './create-tenant-admin-user';

export interface CreateTenant {
  alias: string;
  name: string;
  metadata: string;
  adminInfo: CreateTenantAdminUser;
}
