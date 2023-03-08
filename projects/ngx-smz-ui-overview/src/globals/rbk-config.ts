import { environment } from '../environments/environment';
import { NgxRbkUtilsConfig } from 'ngx-smz-ui';

// Partial<NgxRbkUtilsConfig>
export const rbkConfig: any = {
    authentication: {
        login: {
            url: `${environment.authenticationApi}/api/auth/login`,
        },
        refreshToken: {
            url: `${environment.authenticationApi}/api/auth/refresh-token`,
        },
    },
};
