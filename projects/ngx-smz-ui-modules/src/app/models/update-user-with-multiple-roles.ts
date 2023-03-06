

export interface UpdateUserWithMultipleRoles {
  id: string;
  username: string;
  name: string;
  email: string;
  sector: string;
  identifier: string;
  isContracted: boolean;
  roleIds: string[];
}
