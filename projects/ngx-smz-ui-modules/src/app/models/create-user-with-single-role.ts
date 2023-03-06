

export interface CreateUserWithSingleRole {
  username: string;
  name: string;
  email: string;
  sector: string;
  identifier: string;
  isContracted: boolean;
  roleId: string;
}
