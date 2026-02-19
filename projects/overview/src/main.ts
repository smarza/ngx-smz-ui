import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { SmzUiEnvironment } from '@ngx-smz/core';

SmzUiEnvironment.production = environment.production;
SmzUiEnvironment.serverUrl = environment.serverUrl;
SmzUiEnvironment.authenticationApi = environment.authenticationApi;
SmzUiEnvironment.baseHref = environment.baseHref;

localStorage.setItem('gcab_refresh_token', 'a8d472ea158c478a8dab6de1da042175');
localStorage.setItem('gcab_tenant', 'UN-BUZ');
localStorage.setItem('lastDomain', 'BUZIOS');
localStorage.setItem('gcab_access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiazl4IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6ImJrOXgiLCJyb2wiOlsiRVhFQ1VURV9BU0JVSUxUIiwiVVBEQVRFX1JFUExBTk5FRF9EQVRFIl0sImF2YXRhciI6ImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaUlIZHBaSFJvUFNJeU5UWndlQ0lnYUdWcFoyaDBQU0l5TlRad2VDSStQSEpsWTNRZ2QybGtkR2c5SWpJMU5pSWdhR1ZwWjJoMFBTSXlOVFlpSUhOMGVXeGxQU0ptYVd4c09pTm1abUkyWXpFaUx6NDhkR1Y0ZENCNFBTSTFNQ1VpSUhrOUlqRTBNaTQxY0hnaUlHUnZiV2x1WVc1MExXSmhjMlZzYVc1bFBTSnRhV1JrYkdVaUlIUmxlSFF0WVc1amFHOXlQU0p0YVdSa2JHVWlJSE4wZVd4bFBTSm1iMjUwTFhOcGVtVTZNVFl3Y0hnN1ptbHNiRG9qWm1abU8yWnZiblF0Wm1GdGFXeDVPa0Z5YVdGc1RWUXNJRUZ5YVdGc0lqNVFQQzkwWlhoMFBqd3ZjM1puUGc9PSIsInRlbmFudCI6IlVOLUJVWiIsImRpc3BsYXktbmFtZSI6ImJrOXgiLCJhdXRoZW50aWNhdGlvbi1tb2RlIjoiV2luZG93cyIsImFsbG93ZWQtdGVuYW50cyI6WyJVTi1CVVoiLCJVTi1FUyJdLCJuYmYiOjE3MjA3OTg1NjcsImV4cCI6MTcyMDgwMjE2NywiaXNzIjoiSVNTVUVSX05BTUUiLCJhdWQiOiJBVURJRU5DRV9OQU1FIn0.rKYnor2ZehVzDLzgy0cJojEIGxAWa9kN75KKhYgiECc');

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
