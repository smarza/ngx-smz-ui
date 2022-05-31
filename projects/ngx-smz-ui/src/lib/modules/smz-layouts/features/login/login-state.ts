import { SmzForm } from '../../../smz-forms/models/smz-forms';
import { SmzAppLogo } from '../../core/models/logo';

export interface SmzLoginState<TResponse, TPayload> {
  isDebug: boolean;
  message: string;
  extraInfo: string;
  form: SmzForm<TResponse>;
  logo: {
    type: 'horizontal' | 'vertical' | 'icon' | 'typo';
    customPath?: string;
    styleClass: string;
  }
  callbacks: {
    payload: (response: TResponse) => TPayload;
    submit: (response: TResponse) => void;
  }
  isAuthenticatedSelector: any;
  actions: {
    logout: any;
    login: any;
  }
  styleClass: {
    background: string;
    card: string;
  }

}
