import { NgStyle } from '@angular/common';
import { Component, Input, OnInit, Self, ChangeDetectorRef } from '@angular/core';
import { SmzDocumentState } from '../../models/smz-document';
import { SmzDocumentFeatureDefinitions } from '../../models/smz-document-features';

@Component({
  selector: 'smz-ui-document',
  templateUrl: 'smz-document.component.html',
  providers: [ NgStyle ],
})

export class SmzDocumentComponent implements OnInit {
  @Input() public state: SmzDocumentState;
  public featureDefinitions = SmzDocumentFeatureDefinitions;
  constructor(@Self() private ngStyle: NgStyle, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    // console.log(this.state);
    this.updateHostClasses({ 'font-size': this.state.globals.font.scale });
  }

    private updateHostClasses(data: { [name: string]: string }): void {

    // Propaga a nova classe de estilos para o elemento html do component
    this.ngStyle.ngStyle = data;
    this.ngStyle.ngDoCheck();
  }

  public onFileSent(file: File): void
  {
      console.log('onFileSent', file);
  }

}