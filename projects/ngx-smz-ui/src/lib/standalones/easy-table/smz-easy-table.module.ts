import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SafeContentPipeModule } from '../../common/pipes/safe-html.pipe';
import { NgxSmzMenuModule } from '../../modules/smz-menu/smz-menu.module';
import { TitleComponent } from './components/common/title/title.component';
import { DesktopBodyComponent } from './components/desktop/body/body.component';
import { DesktopHeadComponent } from './components/desktop/head/head.component';
import { DesktopTableComponent } from './containers/desktop/desktop-table.component';
import { SmzEasyTableComponent } from './containers/easy-table/smz-easy-table.component';
import { MobileTableComponent } from './containers/mobile/mobile-table.component';
import { SmzTableContentPipe } from './pipes/table-content.pipe';
import { TableDataSourceService } from './services/table-data-source.service';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    NgxSmzMenuModule,
    SafeContentPipeModule
  ],
  exports: [
    SmzEasyTableComponent
  ],
  declarations: [
    // Containers
    SmzEasyTableComponent,
    DesktopTableComponent,
    MobileTableComponent,

    // Common Components
    TitleComponent,

    // Desktop Components
    DesktopHeadComponent,
    DesktopBodyComponent,

    // Pipes
    SmzTableContentPipe,
  ],
  providers: [],
})
export class SmzEasyTableModule { }
