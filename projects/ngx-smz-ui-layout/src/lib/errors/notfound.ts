import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ErrorPagesConfigService } from './errors-pages-service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-notfound',
    standalone: true,
    imports: [CommonModule, RouterModule, ButtonModule],
    template: `
        <div class="flex items-center justify-center min-h-screen overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, color-mix(in srgb, var(--primary-color), transparent 60%) 10%, var(--surface-ground) 30%)">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20 flex flex-col items-center" style="border-radius: 53px">
                        <span class="text-primary font-bold text-3xl">{{ config.notfound.code }}</span>
                        <h1 class="text-surface-900 dark:text-surface-0 font-bold text-3xl lg:text-5xl mb-2">{{ config.notfound.title }}</h1>
                        <div class="text-surface-600 dark:text-surface-200 mb-8">{{ config.notfound.message }}</div>

                        @for (link of config.notfound.links; track link.url) {
                          <a [routerLink]="link.url" class="w-full flex items-center py-8 border-surface-300 dark:border-surface-500 border-b">
                              <span class="flex justify-center items-center border-2 border-primary text-primary rounded-border" style="height: 3.5rem; width: 3.5rem">
                                  <i class="!text-2xl" [ngClass]="link.icon"></i>
                              </span>
                              <span class="ml-6 flex flex-col">
                                  <span class="text-surface-900 dark:text-surface-0 lg:text-xl font-medium mb-0 block">{{ link.title }}</span>
                                  <span class="text-surface-600 dark:text-surface-200 lg:text-xl">{{ link.description }}</span>
                              </span>
                          </a>
                        }

                        @for (button of config.notfound.buttons; track button.url) {
                          <p-button [label]="button.label" [routerLink]="button.url" (onClick)="button.command()" class="mt-8" [severity]="button.severity" />
                        }
                    </div>
                </div>
            </div>
        </div>`
})
export class NotfoundPageComponent {
  public readonly config = inject(ErrorPagesConfigService).config();
}
