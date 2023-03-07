import { JwtHelperService } from '@auth0/angular-jwt';
import { GlobalInjector } from '../../../common/services/global-injector';
import { compareInsensitive } from '../../../common/utils/utils';

export function generateUserData(token: string): any {

    const jwtDecoder = new JwtHelperService();
    const data = jwtDecoder.decodeToken(token);

    const user: any = {
    };

    if (GlobalInjector.config.rbkUtils.authentication.accessTokenClaims == null) return user;

    for (const key of GlobalInjector.config.rbkUtils.authentication.accessTokenClaims) {
        const value = data[key.claimName];
        let finalValue: any;

        if (typeof value === 'string') {
            if (key.type === 'string') {
                finalValue = value;
            }
            else if (key.type === 'array') {
                finalValue = [ value ];
            }
            else if (key.type === 'boolean') {
                finalValue = compareInsensitive(value, 'true');
            }
            else {
                throw new Error('Unsuported claim type in the ngx-rbk-utils library');
            }
        }
        else {
            if (key.type === 'string') {
                finalValue = [ value ];
            }
            else if (key.type === 'array') {
                finalValue = value;
            }
            else if (key.type === 'boolean') {
                finalValue = compareInsensitive(value, 'true');
            }
            else {
                throw new Error('Unsuported claim type in the ngx-rbk-utils library');
            }
        }

        if (finalValue != null) {
            user[key.propertyName] = finalValue;
        }
        else {
            if (key.type === 'array') {
                user[key.propertyName] = [];
            }
            else if (key.type === 'string') {
                user[key.propertyName] = '';
            }
            else {
                throw new Error('Unsupported type: ' + key.type + ', please update the library');
            }
        }

    }

    if (user.username === undefined) {
        user.username = '';
    }

    // if (user.avatar === undefined) {
    //   user.avatar = '';
    // }

    if (user.roles === undefined) {
        user.roles = [];
    }

    // user.domain = data['Domain'];

    return user;
}