import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ErrorPagesConfigService } from './errors-pages-service';
import { CommonModule } from '@angular/common';
@Component({
    selector: 'app-error',
    imports: [CommonModule, ButtonModule, RippleModule, RouterModule, ButtonModule],
    standalone: true,
    template: `
        <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, rgba(233, 30, 99, 0.4) 10%, rgba(33, 150, 243, 0) 30%)">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20 flex flex-col items-center" style="border-radius: 53px">
                        <div class="gap-4 flex flex-col items-center">
                            <div class="flex justify-center items-center border-2 border-pink-500 rounded-full" style="height: 3.2rem; width: 3.2rem">
                                <i class="!text-2xl text-pink-500" [ngClass]="config.error.icon"></i>
                            </div>
                            <h1 class="text-surface-900 dark:text-surface-0 font-bold text-5xl mb-2">{{ config.error.title }}</h1>
                            <span class="text-muted-color mb-8">{{ config.error.message }}</span>
                            <img [src]="config.error.imagePath" alt="Error" class="mb-8" width="80%" />
                            @for (button of config.error.buttons; track button.url) {
                              <div class="col-span-12 mt-4 text-center">
                                <p-button [label]="button.label" [routerLink]="button.url" (onClick)="button.command()" class="mt-8" [severity]="button.severity" />
                              </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>`
})
export class ErrorPageComponent {
  public readonly config = inject(ErrorPagesConfigService).config();
}
