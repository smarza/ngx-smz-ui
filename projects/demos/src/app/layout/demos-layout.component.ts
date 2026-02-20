import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DEMO_NAV_SECTIONS } from './demo-nav.config';

@Component({
  selector: 'app-demos-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './demos-layout.component.html',
  styleUrl: './demos-layout.component.scss',
})
export class DemosLayoutComponent {
  readonly navSections = DEMO_NAV_SECTIONS;
}
