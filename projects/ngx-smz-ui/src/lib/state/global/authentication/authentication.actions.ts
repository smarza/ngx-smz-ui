export namespace AuthenticationActions {
    export class LocalLogin {
        public static readonly type = '[Auth] Local Login';
    }

    export class LocalLoginSuccess {
        public static readonly type = '[Auth] Local Login Success';
        constructor() { }
    }

    export class LocalLoginFailure {
        public static readonly type = '[Auth] Local Login Failure';
        constructor() { }
    }

    export class RemoteLogin {
        public static readonly type = '[Auth API] Remote Login';
        constructor(public username: string, public password: string, public extraProperties: {[name: string]: string} = null) { }
    }

    export class RemoteLoginSuccess {
        public static readonly type = '[Auth API] Remote Login Success';
        constructor(public accessToken: string, public refreshToken: string) { }
    }


    export class RefreshTokenSuccess {
        public static readonly type = '[Auth API] Refresh Token Success';
        constructor(public accessToken: string, public refreshToken: string) { }
    }

    export class Logout {
        public static readonly type = '[Auth] Logout';
    }
}