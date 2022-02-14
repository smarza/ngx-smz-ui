import { ElementRef, Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { HTMLOptions, jsPDF, jsPDFOptions } from 'jspdf';
import * as html2canvas from 'html2canvas';
import { cloneDeep } from 'lodash-es';
import { ApplicationActions } from '../../../state/global/application/application.actions';
import { SmzDocumentState } from '../models/smz-document';

window['html2canvas'] = html2canvas;

const INITIAL_ZOOM = 1;

@Injectable({ providedIn: 'root' })
export class SmzDocumentsService {
  public showDownloadControl: boolean; // deixar o usuário baixar o pdf
  public showExportControl: boolean; // exportar o pdf em formato blob para o component pai
  public zoom = INITIAL_ZOOM;
  public filename = 'sample';
  public state: SmzDocumentState;
  public paperElement: ElementRef;

  constructor(private store: Store) {
    this.zoom = INITIAL_ZOOM;

    this.showDownloadControl = true;
    this.showExportControl = true;
  }

  public setZoom(zoom: number): void {
    this.zoom = zoom;
  }

  public setFilename(filename: string): void {
    this.filename = filename;
  }

  public setState(state: SmzDocumentState): void {
    this.state = state;
  }

  public setPaperElement(paperElement: ElementRef): void {
    this.paperElement = paperElement;
  }

  public generate(action: "open" | "print" | "download"): void {
    this.store.dispatch(new ApplicationActions.StartGlobalLoading());

    setTimeout(() => {
        this.generatePdf(action, this.paperElement, this.state).then(() => {
            this.store.dispatch(new ApplicationActions.StopGlobalLoading());
        });
    }, 0);
  }

  public moreZoom(): void
  {
      const next = this.zoom + this.state.viewer.zoom.variation;
      this.setZoom(next <= this.state.viewer.zoom.max ? next : this.state.viewer.zoom.max);
  }

  public lessZoom(): void
  {
      const next = this.zoom - this.state.viewer.zoom.variation;
      this.setZoom(next >= this.state.viewer.zoom.min ? next : this.state.viewer.zoom.min);
  }

  public restoreZoom(): void
  {
      this.setZoom(this.state.viewer.zoom.initial);
  }

  private generatePdf(action: 'open' | 'print' | 'download', element: ElementRef, state: SmzDocumentState): Promise<any> {
    return new Promise((resolve) => {

      const doc = new jsPDF(cloneDeep(state.export.jsPDFOptions));

      doc.addFont('assets/fonts/Roboto-Thin.ttf', 'Thin', 'normal', 100);
      doc.addFont('assets/fonts/Roboto-Light.ttf', 'Light', 'normal', 300);
      doc.addFont('assets/fonts/Roboto-Regular.ttf', 'Roboto', 'normal', 400);
      doc.addFont('assets/fonts/Roboto-Medium.ttf', 'Medium', 'normal', 500);
      doc.addFont('assets/fonts/Roboto-Bold.ttf', 'Bold', 'normal', 700);

      doc.html(element.nativeElement, cloneDeep(state.export.htmlOptions)).then(() => {

        switch (action) {
          case 'open': {
            doc.output('dataurlnewwindow', { filename: `${this.filename}.pdf` });
            resolve('Resolved');

            break;
          }
          // case 'print': this.pdfMakeService.pdfMake.createPdf(document).print(); break;
          case 'download': {
            const saving = doc.save(`${this.filename}.pdf`, { returnPromise: true });
            (saving as any).then(() => {
              resolve('Resolved');
            });

            break;
          }
        }
      });
    });
  }
}
