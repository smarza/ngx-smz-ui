import { Component, inject, WritableSignal } from '@angular/core';
import { SMZ_UI_LAYOUT_CONFIG } from '../../config';
import { CommonModule } from '@angular/common';
import { LayoutService } from '../service/layout.service';

@Component({
    standalone: true,
    selector: 'app-footer',
    imports: [CommonModule],
    template: `
<ng-container *ngIf="data() as footer">
  <div class="flex items-center justify-between px-0 py-4 gap-4 border-t border-surface-border">
    @if (footer.leftLogoPath?.light && !layoutService.isDarkTheme()) {
        <img [src]="footer.leftLogoPath?.light" [alt]="footer.leftLogoPath?.light" class="max-h-7" />
    }
    @if (footer.leftLogoPath?.dark && layoutService.isDarkTheme()) {
        <img [src]="footer.leftLogoPath?.dark" [alt]="footer.leftLogoPath?.dark" class="max-h-7" />
    }
    <div class="flex-1"></div>
    @if (footer.rightLogoPath?.light && !layoutService.isDarkTheme()) {
        <img [src]="footer.rightLogoPath?.light" [alt]="footer.rightLogoPath?.light" class="max-h-7" />
    }
    @if (footer.rightLogoPath?.dark && layoutService.isDarkTheme()) {
        <img [src]="footer.rightLogoPath?.dark" [alt]="footer.rightLogoPath?.dark" class="max-h-7" />
    }
    @if (footer.version) {
        <span class="font-medium text-sm">{{ footer.version }}</span>
    }
    @if (footer.copyright) {
        <span class="font-medium text-sm">{{ footer.copyright }}</span>
    }
  </div>
</ng-container>
`
})
export class AppFooter {
    public data: WritableSignal<Footer> = inject(SMZ_UI_LAYOUT_CONFIG).footer;
    public layoutService: LayoutService = inject(LayoutService);
}

export interface Footer {
    leftLogoPath?: {
      light?: string;
      dark?: string;
    };
    rightLogoPath?: {
      light?: string;
      dark?: string;
    };
    version?: string;
    copyright?: string;
}