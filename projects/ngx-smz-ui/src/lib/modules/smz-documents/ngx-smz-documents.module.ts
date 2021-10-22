import { CommonModule } from '@angular/common';
import { Injector, NgModule } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { NgxSmzTablesModule } from '../smz-tables/ngx-smz-tables.module';
import { TooltipModule } from 'primeng/tooltip';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { NgPipesModule } from 'ngx-pipes';
import { NgVarModule } from '../../common/directives/ng-var/ng-var.module';
import { ClickStopPropagationModule } from '../../common/stop-click-propagation/click-stop-propagation.module';
import { NgxSmzDataPipesModule } from '../../common/data-pipes/data-pipes.module';
import { SmzDocumentComponent } from './features/document/smz-document.component';
import { GlobalInjector } from '../../common/services/global-injector';
import { SmzDocumentTitleComponent } from './components/title/title.component';
import { SmzDocumentContentComponent } from './components/content/content.component';
import { SmzDocumentDividerComponent } from './components/divider/divider.component';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      BadgeModule,
      OverlayPanelModule,
      ButtonModule,
      NgxSmzTablesModule,
      InputTextModule,
      TooltipModule,
      SelectButtonModule,
      NgPipesModule,
      NgVarModule,
      ClickStopPropagationModule,
      NgxSmzDataPipesModule
    ],
    exports: [SmzDocumentComponent],
    declarations: [
      SmzDocumentComponent,
      SmzDocumentContentComponent,
      SmzDocumentTitleComponent,
      SmzDocumentDividerComponent
    ]
  })
  export class NgxSmzDocumentsModule
  {
    constructor(injector: Injector) {
        GlobalInjector.instance = injector;
    }

}
