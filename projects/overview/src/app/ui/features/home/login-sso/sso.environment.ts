export const ssoEnvironment: SsoLoginEnviroments = {
  production: {
    enableCASettings: true,
  },
  development: {
    enableCASettings: false,
  }
};

export interface SsoLoginEnviroments {
  production: SsoLoginEnviroment;
  development: SsoLoginEnviroment;
}

export interface SsoLoginEnviroment {

  // TRUE => mostra o formulário que interage a página de redirecionamento e realiza login com sessionId
  // FALSE => mostra o formulário para login com tenant e usuário
  enableCASettings: boolean;
}