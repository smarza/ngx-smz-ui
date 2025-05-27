import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-page-1',
    imports: [ButtonModule],
    template: `
        <h1>Page 1</h1>
    `
})
export class Page1Component {
}