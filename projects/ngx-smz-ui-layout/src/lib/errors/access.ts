import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ErrorPagesConfigService } from './errors-pages-service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-access',
    standalone: true,
    imports: [CommonModule, ButtonModule, RouterModule, RippleModule, ButtonModule],
    template: `
        <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, rgba(247, 149, 48, 0.4) 10%, rgba(247, 149, 48, 0) 30%)">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20 flex flex-col items-center" style="border-radius: 53px">
                        <div class="gap-4 flex flex-col items-center">
                            <div class="flex justify-center items-center border-2 border-orange-500 rounded-full" style="width: 3.2rem; height: 3.2rem">
                                <i class="text-orange-500 !text-2xl" [ngClass]="config.access.icon"></i>
                            </div>
                            <h1 class="text-surface-900 dark:text-surface-0 font-bold text-4xl lg:text-5xl mb-2">{{ config.access.title }}</h1>
                            <span class="text-muted-color mb-8">{{ config.access.message }}</span>
                            <img [src]="config.access.imagePath" alt="Access denied" class="mb-8" width="80%" />
                            @for (button of config.access.buttons; track button.url) {
                              <div class="col-span-12 mt-8 text-center">
                                <p-button [label]="button.label" [routerLink]="button.url" (onClick)="button.command()" class="mt-8" [severity]="button.severity" />
                              </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>`
})
export class AccessPageComponent {
  public readonly config = inject(ErrorPagesConfigService).config();
}
