

export interface Register {
  tenant: string;
  displayName: string;
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  metadata: { [key: string]: string };
}
