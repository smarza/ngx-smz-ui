import { Component, OnInit, ChangeDetectionStrategy, ViewChild, Input, ChangeDetectorRef, AfterViewInit, Renderer2, ElementRef, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { SmzDocumentsService } from '../../services/smz-documents.service';
import * as moment_ from 'moment';
import { SmzDocumentState } from '../../models/smz-document';
import { Store } from '@ngxs/store';

const moment = moment_;

@Component({
    selector: 'document-viewer',
    templateUrl: './document-viewer.component.html',
    styleUrls: ['./document-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None
})
export class SmzDocumentViewerComponent implements OnInit, AfterViewInit, OnDestroy
{
    @ViewChild('paper', { static: true }) public paperElement: ElementRef;
    @Input() public state: SmzDocumentState;
    public now = moment().format('MMMM Do YYYY, h:mm:ss a');
    constructor(private el: ElementRef, public documentService: SmzDocumentsService, private location: Location, private cdf: ChangeDetectorRef, private store: Store, private renderer: Renderer2) { }

    public ngOnInit(): void
    {
        this.documentService.setZoom(this.state.viewer.zoom.initial);
        this.documentService.setFilename(this.state.viewer.filename);
        this.documentService.setState(this.state);
    }

    public ngAfterViewInit(): void
    {
        this.documentService.setPaperElement(this.paperElement);
    }

    public goBack(): void
    {
        this.location.back();
    }

    public ngOnDestroy(): void {
        this.documentService.setState(null);
        this.documentService.setPaperElement(null);
    }

}
