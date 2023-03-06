

export interface CreateUserWithMultipleRoles {
  username: string;
  name: string;
  email: string;
  sector: string;
  identifier: string;
  isContracted: boolean;
  roleIds: string[];
}
