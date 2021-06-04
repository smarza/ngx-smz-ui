import { NgModule } from '@angular/core';
import { PortalModule } from '@angular/cdk/portal';
import { NgDomService } from './ng-dom.service';

@NgModule({
  imports: [PortalModule],
  exports: [],
  declarations: [],
  providers: [NgDomService],
})
export class NgDomModule { }
