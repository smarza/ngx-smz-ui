import { Component, OnInit, ChangeDetectionStrategy, ViewChild, Input, ChangeDetectorRef, AfterViewInit, Renderer2, ElementRef, ViewEncapsulation, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Location } from '@angular/common';
import { SmzDocumentsService } from '../../services/smz-documents.service';
import moment from 'moment';
import { SmzDocumentState } from '../../models/smz-document';
import { Store } from '@ngxs/store';

@Component({
    selector: 'document-viewer',
    templateUrl: './document-viewer.component.html',
    styleUrls: ['./document-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None,
    providers: [SmzDocumentsService]
})
export class SmzDocumentViewerComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges
{
    @ViewChild('paper', { static: true }) public paperElement: ElementRef;
    @Input() public state: SmzDocumentState;
    public now = moment().format('MMMM Do YYYY, h:mm:ss a');
    constructor(private el: ElementRef, public documentService: SmzDocumentsService, private location: Location, private cdr: ChangeDetectorRef, private store: Store, private renderer: Renderer2) { }

    public ngOnInit(): void
    {

    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.state.currentValue != null) {
            this.documentService.setZoom(this.state.viewer.zoom.initial);
            this.documentService.setFilename(this.state.export.filename);
            this.documentService.setState(this.state);
        }
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
