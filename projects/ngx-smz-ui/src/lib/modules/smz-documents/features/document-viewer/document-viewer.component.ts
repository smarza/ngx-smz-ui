import { Component, OnInit, ChangeDetectionStrategy, ViewChild, Input, EventEmitter, Output, ChangeDetectorRef, AfterViewInit, Renderer2, ElementRef, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { PDFExportComponent } from '@progress/kendo-angular-pdf-export';

import { exportPDF } from '@progress/kendo-drawing';
import { Subject } from 'rxjs';
import { BlockableUI } from 'primeng/api/blockableui';
import { SmzDocumentsService } from '../../services/smz-documents.service';
import { SmzDialogsService } from '../../../smz-dialogs/services/smz-dialogs.service';
import { SmzPresets } from '../../../smz-dialogs/models/smz-presets';
import { take } from 'rxjs/operators';

import * as moment_ from 'moment';

const moment = moment_;

// const { exportPDF, PDFOptions } = pdf;

const MAX_ZOOM = 2.5;
const MIN_ZOOM = 1;
const ZOOM_VARIATION = MAX_ZOOM / 5;
const INITIAL_ZOOM = MIN_ZOOM; // + (ZOOM_VARIATION * 2);

@Component({
    selector: 'document-viewer',
    templateUrl: './document-viewer.component.html',
    styleUrls: ['./document-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None
})
export class SmzDocumentViewerComponent implements OnInit, AfterViewInit, BlockableUI
{

    @ViewChild('pdf', { static: true }) public pdfElement: PDFExportComponent;
    @ViewChild('paper', { static: true }) public paperContainer: any;
    @Input() public description = 'Visualizador de pdf';
    @Input() public filename = 'export';
    @Input() public title = 'Visualizador de pdf';
    @Input() public exportOnLoad = false;
    @Output() public fileSent: EventEmitter<File> = new EventEmitter();
    public isReady = false;
    public maxZoom = MAX_ZOOM;
    public minZoom = MIN_ZOOM;
    public now = moment().format('MMMM Do YYYY, h:mm:ss a');
    constructor(private el: ElementRef, public documentService: SmzDocumentsService, private location: Location, private cdf: ChangeDetectorRef, private dialogs2: SmzDialogsService, private renderer: Renderer2) { }

    public ngOnInit(): void
    {
        this.pdfElement.author = 'Grupo Idéia';
        this.pdfElement.creator = 'Sistema Varejo Fácil';

        this.documentService.description = this.description;
        this.documentService.filename = this.filename;
        this.documentService.title = this.title;
        this.documentService.renderer = this.renderer;
    }

    public ngAfterViewInit(): void
    {
        this.documentService.pdfElement = this.pdfElement;
        this.documentService.paperContainer = this.paperContainer;

        if (this.exportOnLoad)
        {
            setTimeout(() =>
            {
                this.export();
            }, 0);
        }
        else
        {
            setTimeout(() =>
            {
                this.isReady = true;
                this.cdf.markForCheck();
            }, 0);
        }

        const smallTextDiv = document.querySelector('.small-text-box');

        if (smallTextDiv)
        {
            const smallTextElement = window.getComputedStyle(smallTextDiv);
            const fontSize = smallTextElement.getPropertyValue('font-size');

            // console.log('fontSize', fontSize);

            if (!fontSize.includes('6.5'))
            {

                this.dialogs2.open({
                    presetId: SmzPresets.Message,
                    title: `Aviso`,
                    features: [
                        {
                            type: 'message', data: [
                                'Identificamos um problema com a configuração de mínima de fonte do seu navegador.',
                                'Caso tenha alterado a configuração mínima de fonte, pedimos que retorna ao padrão antes de continuar utilizanndo o sistems',
                                '',
                                'O Sistema foi programado para não permitir personalizações fora do padrão.',
                                '',
                                'Se o problema persistir contacte seu supervisor.'
                            ]
                        },
                    ],
                    callbacks: {
                        onOk: () =>
                        {
                            this.dialogs2.closeAll();
                        }
                    }
                });
            }
        }

    }

    public getBlockableElement(): HTMLElement {
      return this.el.nativeElement.children[0];
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

    public download(): void
    {
        this.documentService.zoom = 1;
        this.isReady = false;

        this.cdf.markForCheck();

        setTimeout(() =>
        {
            this.pdfElement.date = new Date();
            this.pdfElement.subject = this.description;
            this.pdfElement.title = this.title;
            this.pdfElement.saveAs(`${this.filename}.pdf`);
            this.isReady = true;
            this.cdf.markForCheck();
        }, 300);
    }

    public export(fileName?: string): Subject<File>
    {
        // console.log('export');

        this.pdfElement.date = new Date();
        this.pdfElement.subject = this.description;
        this.pdfElement.title = this.title;

        this.documentService.zoom = 1;
        this.cdf.markForCheck();

        const creation = this.createFile(fileName);

        creation
            .pipe(take(1))
            .subscribe((file) =>
            {
                console.log('export > creation > subscribe: file', file);
                this.fileSent.emit(file);

                setTimeout(() => {
                  this.restoreZoom();
                  this.isReady = true;
                  this.cdf.markForCheck();
                  console.log('isReady');
                }, 500);

            });

        return creation;
    }

    public emitExport(): void
    {
        console.error('emitExport... not implemented');
        // this.dialogs.showConfirmation('Você tem certeza de que deseja Confirmar esse documento ?',
        //     () =>
        //     {
        //         this.documentService.zoom = 1;
        //         this.cdf.markForCheck();

        //         this.pdfElement.date = new Date();
        //         this.pdfElement.subject = this.description;
        //         this.pdfElement.title = this.title;

        //         const creation = this.createFile();

        //         creation
        //             .pipe(take(1))
        //             .subscribe((file) =>
        //             {
        //                 // console.log('fileSent emit');
        //                 this.fileSent.emit(file);
        //             });
        //     });

    }

    public goBack(): void
    {
        this.location.back();
    }

    public createFile(fileName?: string): Subject<File>
    {
        const subject = new Subject<File>();

        setTimeout(() =>
        {
            this.pdfElement.export().then(group =>
            {
                exportPDF(group).then((data) =>
                {
                    data = data.split(',')[1];

                    const byteArray = new Uint8Array(atob(data).split('').map(char => char.charCodeAt(0)));
                    const newBlob = new Blob([byteArray], { type: 'application/pdf' });

                    const file = this.blobToFile(newBlob, `${fileName ?? 'arquivo'}.pdf`);
                    console.log('createFile > exportPDF then');
                    subject.next(file);
                });
            });

        }, 2500);

        return subject;
    }

    private blobToFile = (theBlob: Blob, fileName: string): File =>
    {
        const b: any = theBlob;

        // A Blob() is almost a File() - it's just missing the two properties below which we will add
        b.lastModifiedDate = new Date();
        b.name = fileName;

        const file = new File([theBlob], fileName, { type: theBlob.type });

        // Cast to a File() type
        return <File>file;
    }

}
