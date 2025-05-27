import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-page-2',
    imports: [ButtonModule],
    template: `
        <h1>Page 2</h1>
    `
})
export class Page2Component {
}