import { CommonModule } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, QueryList, TemplateRef } from '@angular/core';
import { PrimeTemplate } from 'primeng/api';
import { NgIfLandscapeDirectiveModule } from '../../common/directives/ng-if-landscape/ng-if-landscape.directive';
import { NgIfPortraitDirectiveModule } from '../../common/directives/ng-if-portrait/ng-if-portrait.directive';

@Component({
    selector: 'smz-responsive',
    template: `

  <ng-container *ngIfLandscape>
    <ng-container *ngTemplateOutlet="landscapeTemplate"></ng-container>
  </ng-container>


  <ng-container *ngIfPortrait>
    <ng-container *ngTemplateOutlet="portraitTemplate"></ng-container>
  </ng-container>

  `,
    imports: [CommonModule, NgIfLandscapeDirectiveModule, NgIfPortraitDirectiveModule],
    changeDetection: ChangeDetectionStrategy.Default
})

export class SmzResponsiveComponent implements AfterContentInit {
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  public landscapeTemplate: TemplateRef<any>;
  public portraitTemplate: TemplateRef<any>;
  constructor() {
  }

  public ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case 'landscape':
          this.landscapeTemplate = item.template;
          break;
        case 'portrait':
          this.portraitTemplate = item.template;
          break;
      }
    });
  }
}