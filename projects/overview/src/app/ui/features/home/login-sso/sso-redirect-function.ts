import { environment } from '../../../../../environments/environment';

export function NavigateToExternalSsoUrl(tenant: string): void {
  const successfulUrl = `${window.location.href}?tenant=${tenant}`;

  if (environment.production) {
    // eslint-disable-next-line max-len
    window.location.href = `https://servicoca.petrobras.com.br/fwca/pages/AuthenticationForm.jsp?successfulUrl=${successfulUrl}&ssoEnabled=true&applicationCatalogId=PRTS&environmentId=PRD&integratedAuthenticationEnabled=false&logonPage=${window.location.href}`;
  }
  else {
    window.location.href = `${window.origin}${environment.baseHref}/assets/ssomock.html?successfulUrl=${encodeURIComponent(successfulUrl)}`;
  }
}
