import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { environment } from '@environments/environment';
import { Store } from '@ngxs/store';
import { getFirst, GlobalInjector, SimpleEntity, TenantsSelectors } from 'ngx-smz-ui';
import { AppFloatingConfigurator, LayoutService } from 'ngx-smz-ui-layout';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { SelectModule } from 'primeng/select';
import { ssoEnvironment, SsoLoginEnviroment } from '../sso.environment';
import { SsoSessionLoginPayload } from '../sso-login-payload';
import { SsoAuthActions } from '../states/sso-auth.actions';
import { CommonModule, Location } from '@angular/common';
import { NavigateToExternalSsoUrl } from '../sso-redirect-function';
import { InputTextModule } from 'primeng/inputtext';

interface SsoSessionLoginData {
  tenant?: SimpleEntity<string>;
}

interface UsernameLoginData {
  tenant: SimpleEntity<string>;
  username: string;
}

@Component({
    selector: 'app-ativo-login',
    standalone: true,
    imports: [CommonModule, ButtonModule, SelectModule, FormsModule, InputTextModule, RouterModule, RippleModule, AppFloatingConfigurator],
    template: `
    <app-floating-configurator />
    <div class="bg-gradient-to-b from-[#0B3F54] to-[#021722] dark:from-surface-50 dark:to-surface-100 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">

        @if(config.enableCASettings) {
        <div class="flex flex-row items-center justify-center gap-20">
          <img [src]="layoutService.isDarkTheme() ? 'cronos-login-dark.png' : 'cronos-login-light.png'" alt="logo" class="mx-auto">
          <div class="flex flex-col items-start justify-start gap-4">
            <div class="text-surface-0 dark:text-surface-900 text-lg font-medium mb-4">Login</div>
            <label for="tenant" class="block text-surface-0 dark:text-surface-900 text-md italic">Unidade de Negócio</label>
            <p-select id="tenant" [options]="tenants()" [(ngModel)]="tenant" (onChange)="onTenantChange($event)" optionLabel="name" optionValue="alias" placeholder="Selecione uma unidade de negócio" class="w-full" />
            <p-button label="Login Petrobras" icon="pi pi-sign-in" class="w-full" styleClass="w-full" [disabled]="!isValid()" (onClick)="executeCaLogin()" />
          </div>
        </div>
        }
        @else {
        <div class="flex flex-col md:flex-row items-center justify-center gap-20">
          <img [src]="layoutService.isDarkTheme() ? 'cronos-login-dark.png' : 'cronos-login-light.png'" alt="logo" class="mx-auto">
          <div class="flex flex-col items-start justify-start gap-4 w-full md:min-w-96">
            <div class="text-surface-0 dark:text-surface-900 text-lg font-medium mb-4">Login</div>
            <label for="tenant" class="block text-surface-0 dark:text-surface-900 text-md italic">Unidade de Negócio</label>
            <p-select id="tenant" [options]="tenants()" [(ngModel)]="tenant" (onChange)="onTenantChange($event)" optionLabel="name" optionValue="alias" placeholder="Selecione uma unidade de negócio" class="w-full" styleClass="w-full" />
            <label for="username" class="block text-surface-0 dark:text-surface-900 text-md italic">Credencial de Desenvolvimento</label>
            <input pInputText id="username" [(ngModel)]="username" placeholder="Digite sua credencial de desenvolvimento" class="w-full" styleClass="w-full" />
            <p-button label="Login Petrobras" icon="pi pi-sign-in" class="w-full" styleClass="w-full" [disabled]="!isValid()" (onClick)="executeUsernameLogin()" />
          </div>
        </div>
        }

        <footer class="fixed bottom-0 left-0 right-0 text-surface-900 dark:text-surface-0 text-sm text-center py-4 border-t border-surface-800 dark:border-surface-200">
          <div class="flex flex-row items-center justify-between gap-20 px-10">
            <img [src]="layoutService.isDarkTheme() ? 'ativo-login-dark.png' : 'ativo-login-light.png'" alt="logo" class="max-w-28">
            @if(!config.enableCASettings) {
              <div class="text-surface-0 dark:text-surface-900 text-sm font-medium">Ambiente de Desenvolvimento</div>
            }
            <div class="text-surface-0 dark:text-surface-900 text-sm font-medium">Controle de Acesso V4</div>
          </div>
        </footer>
    </div>
    `
})
export class AtivoLoginPageComponent {
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);
  private readonly location = inject(Location);
  private isSuccesfulRedirect = false;
  public layoutService: LayoutService = inject(LayoutService);
  public tenants = this.store.selectSignal(TenantsSelectors.all);
  public tenant: string;
  public username = 'bk9x';
  public config: SsoLoginEnviroment = environment.production ? ssoEnvironment.production : ssoEnvironment.development;
  public isValid = signal(false);
  constructor() {
    if (this.config.enableCASettings) {
      this.setupSuccesfulRedirectListener();
    }
    else {
      this.getCachedTenant();
    }
  }

  public executeCaLogin(): void {
    console.log(this.tenant);
    NavigateToExternalSsoUrl(this.tenant);
  }

  public executeUsernameLogin(): void {
    console.log(this.tenant);
    console.log(this.username);
    this.store.dispatch(new SsoAuthActions.UsernameLogin({ tenant: this.tenant, username: this.username }));
  }

  public getCachedTenant(): void {
    const localTenant = localStorage.getItem(GlobalInjector.config.rbkUtils.authentication.localStoragePrefix + '_tenant');
    this.tenant = localTenant ?? getFirst(this.tenants())?.alias;
    this.validateForm();
  }

  public onTenantChange(event: any): void {
    localStorage.setItem(GlobalInjector.config.rbkUtils.authentication.localStoragePrefix + '_tenant', event.value);
    this.validateForm();
  }

  private validateForm(): void {
    this.isValid.set(this.tenant != null && this.username != null);
  }

  private setupSuccesfulRedirectListener(): void {

    this.route.queryParamMap
      .subscribe(params => {
        const globalSessionId = params.get('globalSessionId');
        const tenant = params.get('tenant');

        if (globalSessionId != null && tenant != null) {
          this.isSuccesfulRedirect = true;
          this.removeQueryParams();
          setTimeout(() => {
            this.signInWithSsoSession(tenant, globalSessionId);
          }, 0);
        }

        if (tenant != null) {
          this.tenant = tenant;
        }
        else {
          this.getCachedTenant();
        }
      });

  }

  private signInWithSsoSession(tenant: string, sessionToken: string): void {
    const payload: SsoSessionLoginPayload = { tenant: tenant, sessionToken };
    this.store.dispatch(new SsoAuthActions.SsoSessionLogin(payload));
  }

  private removeQueryParams(): void {
    const path = this.location.path().split('?')[0];
    this.location.replaceState(path);
  }
}
