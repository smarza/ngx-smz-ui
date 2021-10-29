import { Component, OnInit, ChangeDetectionStrategy, ViewChild, Input, ChangeDetectorRef, AfterViewInit, Renderer2, ElementRef, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';

import { SmzDocumentsService } from '../../services/smz-documents.service';

import * as moment_ from 'moment';
import { SmzDocumentState } from '../../models/smz-document';
import { Store } from '@ngxs/store';
import { ApplicationActions } from '../../../../state/global/application/application.actions';

const moment = moment_;

const MAX_ZOOM = 2.5;
const MIN_ZOOM = 1;
const ZOOM_VARIATION = MAX_ZOOM / 5;
const INITIAL_ZOOM = MIN_ZOOM;

@Component({
    selector: 'document-viewer',
    templateUrl: './document-viewer.component.html',
    styleUrls: ['./document-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None
})
export class SmzDocumentViewerComponent implements OnInit, AfterViewInit
{

    @ViewChild('paper', { static: true }) public paperElement: ElementRef;
    @Input() public state: SmzDocumentState;
    public maxZoom = MAX_ZOOM;
    public minZoom = MIN_ZOOM;
    public now = moment().format('MMMM Do YYYY, h:mm:ss a');
    constructor(private el: ElementRef, public documentService: SmzDocumentsService, private location: Location, private cdf: ChangeDetectorRef, private store: Store, private renderer: Renderer2) { }

    public ngOnInit(): void
    {
    }

    public ngAfterViewInit(): void
    {
    }

    public generate(action: "open" | "print" | "download", element: ElementRef): void {
        this.store.dispatch(new ApplicationActions.StartGlobalLoading());

        setTimeout(() => {
            this.documentService.generatePdf(action, element, this.state).then(() => {
                this.store.dispatch(new ApplicationActions.StopGlobalLoading());
            });
        }, 0);
    }

    public moreZoom(): void
    {
        const next = this.documentService.zoom + ZOOM_VARIATION;
        this.documentService.zoom = next <= MAX_ZOOM ? next : MAX_ZOOM;
    }

    public lessZoom(): void
    {
        const next = this.documentService.zoom - ZOOM_VARIATION;
        this.documentService.zoom = next >= MIN_ZOOM ? next : MIN_ZOOM;
    }

    public restoreZoom(): void
    {
        this.documentService.zoom = INITIAL_ZOOM;
    }

    public goBack(): void
    {
        this.location.back();
    }

}
