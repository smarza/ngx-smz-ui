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
import { SmzDocumentFieldComponent } from './components/field/field.component';
import { SmzDocumentImageComponent } from './components/image/image.component';
import { SmzDocumentSpacerComponent } from './components/spacer/spacer.component';
import { SmzDocumentSubTitleComponent } from './components/sub-title/sub-title.component';
import { SmzDocumentFieldsGroupComponent } from './components/fields-group/fields-group.component';
import { SmzDocumentViewerComponent } from './features/document-viewer/document-viewer.component';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { SmzDocumentTableComponent } from './components/table/table.component';

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
      NgxSmzDataPipesModule,
      PDFExportModule,
      TooltipModule
    ],
    exports: [SmzDocumentComponent],
    declarations: [
      SmzDocumentComponent,
      SmzDocumentContentComponent,
      SmzDocumentTitleComponent,
      SmzDocumentDividerComponent,
      SmzDocumentFieldComponent,
      SmzDocumentImageComponent,
      SmzDocumentSpacerComponent,
      SmzDocumentSubTitleComponent,
      SmzDocumentFieldsGroupComponent,
      SmzDocumentViewerComponent,
      SmzDocumentTableComponent,
    ]
  })
  export class NgxSmzDocumentsModule
  {
    constructor(injector: Injector) {
        GlobalInjector.instance = injector;
    }

}
