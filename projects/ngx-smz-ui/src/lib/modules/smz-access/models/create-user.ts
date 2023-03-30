export interface CreateUser {
  displayName: string;
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  roleIds: string[];
  metadata: { [key: string]: string }[];
}
