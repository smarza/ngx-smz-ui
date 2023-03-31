export interface CreateUser<TMetadata extends { [key: string]: string }> {
  displayName: string;
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  roleIds: string[];
  picture: string;
  metadata: TMetadata;
}
