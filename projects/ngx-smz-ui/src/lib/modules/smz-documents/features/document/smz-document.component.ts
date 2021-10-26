import { NgStyle } from '@angular/common';
import { Component, Input, OnInit, Self } from '@angular/core';
import { SmzDocumentState } from '../../models/smz-document';
import { SmzDocumentFeatureDefinitions } from '../../models/smz-document-features';
import { SmzDocumentsService } from '../../services/smz-documents.service';

@Component({
  selector: 'smz-ui-document',
  templateUrl: 'smz-document.component.html',
  providers: [ NgStyle ],
})

export class SmzDocumentComponent implements OnInit {
  @Input() public state: SmzDocumentState;

  public featureDefinitions = SmzDocumentFeatureDefinitions;
  constructor(@Self() private ngStyle: NgStyle, private documentService: SmzDocumentsService) { }

  ngOnInit() {
    console.log(this.state);
    this.updateHostClasses({ 'font-size': this.state.globals.font.scale });
    this.documentService.setHeaderHeight(this.state.globals.header.height);
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