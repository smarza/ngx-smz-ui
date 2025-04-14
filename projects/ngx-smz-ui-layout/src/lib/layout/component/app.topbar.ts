import { Component, inject, Signal, WritableSignal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '../service/layout.service';
import { SMZ_UI_LAYOUT_CONFIG } from '../../config';
import { ComponentInjectorDirective } from '../../shared/component-injector/directives/component-injector.directive';
import { InjectableComponent } from '../../shared/component-injector/interfaces/injectable';
import { TooltipModule } from 'primeng/tooltip';
import { PrimeNG } from 'primeng/config';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator, ComponentInjectorDirective, TooltipModule, MenuModule, ButtonModule],
  template: `
  <ng-container *ngIf="data() as topbar">
    <div class="layout-topbar">
      <div class="layout-topbar-logo-container">

        @if (topbar.showMenuToggle) {
          <button class="layout-menu-button layout-topbar-action" (click)="layoutService.onMenuToggle()">
            <i class="pi pi-bars"></i>
          </button>
        }

        <a class="layout-topbar-logo" routerLink="/">
          @if (topbar.logoPath?.light && !layoutService.isDarkTheme()) {
            <img [src]="topbar.logoPath?.light" [alt]="topbar.logoPath?.light" class="max-h-9 min-h-8" />
          }
          @if (topbar.logoPath?.dark && layoutService.isDarkTheme()) {
            <img [src]="topbar.logoPath?.dark" [alt]="topbar.logoPath?.dark" class="max-h-9 min-h-8" />
          }
          @if (topbar.appName) {
            <span>{{ topbar.appName }}</span>
          }
        </a>

    </div>

    <div class="layout-topbar-actions">

      <button class="layout-topbar-menu-button layout-topbar-action" pStyleClass="@next" enterFromClass="hidden" enterActiveClass="animate-scalein" leaveToClass="hidden" leaveActiveClass="animate-fadeout" [hideOnOutsideClick]="true">
        <i class="pi pi-ellipsis-v"></i>
      </button>

      <div class="layout-topbar-menu hidden lg:block">
        <div class="layout-topbar-menu-content">
          @for (item of topbar.menuItems; track item) {
            @if (item.component != null) {
              <ng-template [componentInjector]="item.component"></ng-template>
            }
            @else {
            <button type="button" class="layout-topbar-action" (click)="item.callback()" [routerLink]="item.routerLink" [pTooltip]="item.tooltip">
              <i [ngClass]="item.icon"></i>
              <span>{{ item.label }}</span>
            </button>
            }
          }
        </div>
      </div>

      <div class="layout-config-menu">
        @if (topbar.showDarkModeToggle) {
          <button type="button" class="layout-topbar-action" (click)="toggleDarkMode()" pTooltip="Dark/Light">
            <i [ngClass]="{ 'pi ': true, 'pi-moon': layoutService.isDarkTheme(), 'pi-sun': !layoutService.isDarkTheme() }"></i>
          </button>
        }

        @if (topbar.showConfigurator) {
          <div class="relative">
            <button class="layout-topbar-action layout-topbar-action-highlight" pTooltip="Configurações" pStyleClass="@next" enterFromClass="hidden" enterActiveClass="animate-scalein" leaveToClass="hidden" leaveActiveClass="animate-fadeout" [hideOnOutsideClick]="true">
              <i class="pi pi-palette"></i>
            </button>
            <app-configurator></app-configurator>
          </div>
        }

        @for (feature of topbar.features; track feature) {
          <p-menu #menu [model]="feature.menuItems" [popup]="true" />

          @if (feature.avatar && feature.avatar() != null) {
            <img [src]="feature.avatar()" [alt]="feature.label" class="layout-topbar-action w-8 h-8 rounded-full" (click)="menu.toggle($event)" [pTooltip]="feature.tooltip" (error)="handleMissingImage($event, feature.placeholder)"/>
          }
          @else {
            <button type="button" class="layout-topbar-action" (click)="menu.toggle($event)" [pTooltip]="feature.tooltip">
              <i [ngClass]="feature.icon()"></i>
            </button>
          }
        }
      </div>

      </div>
    </div>
  </ng-container>`
})
export class AppTopbar
{
  primeNG = inject(PrimeNG);
  public data: Signal<Topbar> = inject(SMZ_UI_LAYOUT_CONFIG).topbar;
  public layoutService: LayoutService = inject(LayoutService);

  toggleDarkMode()
  {
    this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
  }

  public handleMissingImage(event: Event, placeholder: string) {
    (event.target as HTMLImageElement).src = placeholder;
  }
}

export interface Topbar
{
  showMenuToggle?: boolean;
  showConfigurator?: boolean;
  showDarkModeToggle?: boolean;
  logoPath?: {
    light?: string;
    dark?: string;
  };
  appName?: string;
  features?: {
    icon?: Signal<string>;
    avatar?: Signal<string>;
    placeholder?: string;
    label?: string;
    tooltip?: string;
    menuItems?: MenuItem[];
  }[]
  menuItems?: {
    icon?: string;
    label?: string;
    tooltip?: string;
    routerLink?: string;
    callback?: () => void;
    component?: InjectableComponent<unknown>;
  }[];
}

