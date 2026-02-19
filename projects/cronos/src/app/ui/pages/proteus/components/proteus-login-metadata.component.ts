import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CADetails } from '@models/cadetails';
import { Store } from '@ngxs/store';
import { NgxSmzDataPipesModule, NgxSmzServerImageModule } from '@ngx-smz/core';
import { Observable } from 'rxjs';
import { ProteusSelectors } from '../state/proteus.selector';

@Component({
  selector: 'app-proteus-login-metadata',
  standalone: true,
  imports: [CommonModule, NgxSmzDataPipesModule, NgxSmzServerImageModule],
  template: `
  @if ((currentCAUser$ | async); as details) {
    <!-- <div [innerHTML]="details | prettyjson"></div> -->
    <div class="grid grid-nogutter items-center justify-start gap-4">
      <img
        serverImage
        [path]="details.picture"
        [maximize]="false"
        [openMaximized]="false"
        [placeholder]="'assets/images/placeholder.jpeg'"
        [useServerPath]="false"
        class="h-28 w-28 object-cover rounded-lg"
        >
        <div class="col grid grid-nogutter flex-col items-start justify-start gap-1">
          <div>Email: {{ details.email }}</div>
          <div>Setor: {{ details.sector }}</div>
          <div>Identificador: {{ details.identifier }}</div>
          <div>Vínculo: {{ details.isContracted ? 'Contratado' : 'Petroleiro' }}</div>
        </div>
      </div>
    }
  `
})

export class ProteusLoginMetadataComponent {
  public readonly currentCAUser$: Observable<CADetails> =inject(Store).select(ProteusSelectors.currentCAEmployee);
  public readonly lastCARequestErrors$: Observable<string[]> = inject(Store).select(ProteusSelectors.lastCARequestErrors);
  public isValid = true;

}