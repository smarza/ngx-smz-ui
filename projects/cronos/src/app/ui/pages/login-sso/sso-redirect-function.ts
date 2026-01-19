import { environment } from '@environments/environment';

export function NavigateToExternalSsoUrl(tenant: string): void {
  const successfulUrl = `${window.location.href}?tenant=${tenant}`;
  const caEnviroment = environment.caEnviroment;

  if (environment.production) {
    // eslint-disable-next-line max-len
    window.location.href = `https://servicoca.petrobras.com.br/fwca/pages/AuthenticationForm.jsp?successfulUrl=${successfulUrl}&ssoEnabled=true&applicationCatalogId=A17842&environmentId=${caEnviroment}&integratedAuthenticationEnabled=false&logonPage=${window.location.href}`;
  }
  else {
    window.location.href = `${window.origin}${environment.baseHref}/assets/ssomock.html?successfulUrl=${encodeURIComponent(successfulUrl)}`;
  }
}
