import { SmzForm } from '../../../smz-forms/models/smz-forms';
import { SmzMenuItem } from '../../../smz-menu/models/smz-menu-item';

export interface SmzLoginState<TResponse, TPayload> {
  isDebug: boolean;
  loginButtonLabel: string;
  message: string;
  extraInfo: string;
  form: SmzForm<TResponse>;
  isFormVisible: boolean;
  logoutRedirection?: string;
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
  customButtons: SmzMenuItem[];
}