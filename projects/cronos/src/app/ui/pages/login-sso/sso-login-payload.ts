export interface ApiLoginPayload {
  tenant: string;
  sessionToken?: string;
  usename?: string;
}

export interface SsoSessionLoginPayload {
  tenant: string;
  sessionToken: string;
}

export interface UsernameLoginPayload {
  tenant: string;
  username: string;
}