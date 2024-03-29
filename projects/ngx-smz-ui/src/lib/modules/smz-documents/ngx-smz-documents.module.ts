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
import { SmzDocumentTitleComponent } from './components/title/title.component';
import { SmzDocumentContentComponent } from './components/content/content.component';
import { SmzDocumentDividerComponent } from './components/divider/divider.component';
import { SmzDocumentFieldComponent } from './components/field/field.component';
import { SmzDocumentImageComponent } from './components/image/image.component';
import { SmzDocumentSpacerComponent } from './components/spacer/spacer.component';
import { SmzDocumentSubTitleComponent } from './components/sub-title/sub-title.component';
import { SmzDocumentFieldsGroupComponent } from './components/fields-group/fields-group.component';
import { SmzDocumentViewerComponent } from './features/document-viewer/document-viewer.component';
import { SmzDocumentTableComponent } from './components/table/table.component';
import { SmzDocumentChartComponent } from './components/chart/chart.component';
import { SmzChartModule } from '../smz-charts/ngx-smz-charts.module';
import { SmzDocumentPageBreakComponent } from './components/page-break/page-break.component';
import { SmzDocumentInjectableComponent } from './components/injectable/injectable.component';
import { InjectContentAppModule } from '../../common/modules/inject-content/inject-content.module';
import { SmzDocumentHiddenBreakComponent } from './components/hidden-break/hidden-break.component';

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
    TooltipModule,
    SmzChartModule,
    InjectContentAppModule
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
    SmzDocumentChartComponent,
    SmzDocumentPageBreakComponent,
    SmzDocumentInjectableComponent,
    SmzDocumentHiddenBreakComponent
  ]
})
export class NgxSmzDocumentsModule {

}
