

export interface UpdateEmployee {
  displayName: string;
  username: string;
  email: string;
  picture: string;
  metadata: { [key: string]: string };
}
