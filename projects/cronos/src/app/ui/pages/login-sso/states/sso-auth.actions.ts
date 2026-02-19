import { SsoSessionLoginPayload, UsernameLoginPayload } from '../sso-login-payload';

export namespace SsoAuthActions {
  export class SsoSessionLogin {
    public static readonly type = '[SSO Auth API] Sso Session Login';
    constructor(public data: SsoSessionLoginPayload) {}
  }

  export class UsernameLogin {
    public static readonly type = '[SSO Auth API] Username Login';
    constructor(public data: UsernameLoginPayload) {}
  }
}
