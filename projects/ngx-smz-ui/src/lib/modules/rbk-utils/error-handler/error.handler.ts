import { HttpErrorResponse } from '@angular/common/http';
import { NgxRbkUtilsConfig } from '../ngx-rbk-utils.config';

export class CustomError {
    public messages: string[];

    public redirectTo: string;

    public static fromApiResponse(state: HttpErrorResponse): CustomError {
        const error: CustomError = { messages: state.error, redirectTo: null };
        return error;
    }

    public static fromExceptionResponse(state: HttpErrorResponse, redirectTo: string): CustomError {
        const error: CustomError = { messages: [], redirectTo };

        if (typeof state.error === 'string' || state.error instanceof String) {
            error.messages.push(`${state.error}`);
        }
        else if (state.error != null && state.error.length > 0) {
            error.messages = state.error;
        }
        else {
            error.messages.push('Erro interno no servidor.');
        }

        return error;
    }

    public static fromSingleError(message: string, redirectTo: string = null): CustomError {
        return { messages: [message], redirectTo };
    }

    public static empty(): CustomError {
        return { messages: [], redirectTo: null };
    }
}
// Do not remove the @dynamic flag, it's not a comment, it an Angular flag!
// @dynamic
export class HttpErrorHandler {
    // TODO: Fazer throw error no login por exemplo e ver porque está entrando nos ifs do status
    public static async handle(httpResponse: any, rbkConfig: NgxRbkUtilsConfig): Promise<CustomError> {
        if (httpResponse instanceof HttpErrorResponse) {

            let response = httpResponse;
            if (this.isBlobError(response)) {
                response = await this.parseBlob(response);
            }

            if (response.status === 400) {
                // Bad Request, ModelState, client
                return CustomError.fromApiResponse(response);
            }
            else if (response.status === 500) {
                // Internal Server Error, ModelState, server
                return CustomError.fromExceptionResponse(response, rbkConfig.routes.error);
            }
            else if (response.status === 401) {
                // Unauthorized, not authenticated
                if (typeof response.error === 'string' || response.error instanceof String) {
                    return CustomError.fromSingleError(response.error as string, rbkConfig.routes.login);
                }
                else {
                    return CustomError.fromSingleError('Houve um problema na autenticação com o servidor.', rbkConfig.routes.login);
                }
            }
            else if (response.status === 403) {
                // Forbidden, needs more privilegies
                return CustomError.fromSingleError('Nível de acesso insuficiente para o recurso solicitado.');
            }
            else if (response.status === 404) {
                // Not found
                return CustomError.fromSingleError('Não foi possível encontrar o recurso solicitado no servidor.');
            }
            else if (response.status === 0) {
                // Unknown error
                return CustomError.fromSingleError('Erro de comunicação com o servidor.', rbkConfig.routes.error);
            }
            else {
                // Error has a code, but it was not handled
                return CustomError.fromSingleError(`Código de erro não tratado: ${response.status}.`, rbkConfig.routes.error);
            }
        }
        else {
            console.error('response', httpResponse);
            return CustomError.fromSingleError('Erro desconhecido na conexão com o servidor.', rbkConfig.routes.error);
        }
    }

    private static isBlobError(err: any) {
      return err instanceof HttpErrorResponse && err.error instanceof Blob && err.error.type === 'application/json';
    }

    private static async parseBlob(err: HttpErrorResponse): Promise<HttpErrorResponse> {
      return new Promise<any>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e: Event) => {
            try {
                const errmsg = JSON.parse((e.target as any).result);
                resolve(new HttpErrorResponse({
                    error: errmsg,
                    headers: err.headers,
                    status: err.status,
                    statusText: err.statusText,
                    url: err.url
                }));
            } catch (e) {
                reject(err);
            }
        };
        reader.onerror = (e) => {
            reject(err);
        };
        reader.readAsText(err.error);
    });
    }
}
