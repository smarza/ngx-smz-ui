export interface UpdateEmployee {
  username: string;
  displayName: string;
  email: string;
  picture: string;
  metadata: {
    sector: string,
    identifier: string,
    isContracted: string
  };
}