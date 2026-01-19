import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { BoilerplateService, GlobalLoaderModule, RbkAccessControlModule, ThemeManagerService, SmzToastModule, NgxSmzDockModule, NgxSmzUiBlockModule, SmzExportDialogModule } from '@ngx-smz/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ProteusModule } from '@pages/proteus/proteus.module';
import { SmzToastComponent } from '../../../ngx-smz-ui/src/lib/modules/smz-toast/smz-toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,

    GlobalLoaderModule,
    // SmzToastModule,
    SmzToastComponent,
    NgxSmzDockModule,
    NgxSmzUiBlockModule,
    SmzExportDialogModule,

    // Shared Modules
    ProteusModule,
    // ToastModule,
    RbkAccessControlModule
  ],
  template: `
  <router-outlet></router-outlet>
  <smz-ui-global-loader></smz-ui-global-loader>
  <smz-ui-dock></smz-ui-dock>
  <smz-ui-block></smz-ui-block>
  <smz-export-dialog></smz-export-dialog>
  <smz-ui-toast></smz-ui-toast>
  <!-- <p-toast position="bottom-right"></p-toast> -->
  `,
})
export class AppComponent {

  constructor(private boilerplateService: BoilerplateService, private themeManager: ThemeManagerService) {
    this.boilerplateService.init(() => {
      this.themeManager.createCss('assets/styles/custom-forms.css');
      this.themeManager.createCss('assets/styles/custom-layout.css');
      this.themeManager.createCss('assets/styles/custom-tables.css');
      this.themeManager.createCss('assets/styles/custom-dialogs.css');
      this.themeManager.createCss('assets/styles/custom-context-menu.css');
    });
  }
}
