import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BoilerplateService } from 'ngx-smz-ui';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule],
    template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  private readonly boilerplateService = inject(BoilerplateService);

  constructor() {
    this.boilerplateService.init(() => {});
  }
}
