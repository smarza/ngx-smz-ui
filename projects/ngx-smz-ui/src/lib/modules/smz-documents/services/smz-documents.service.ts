import { ElementRef, Injectable } from '@angular/core';
import { HTMLOptions, jsPDF, jsPDFOptions } from 'jspdf';
import { SmzDocumentState } from '../models/smz-document';

const INITIAL_ZOOM = 1;

@Injectable({ providedIn: 'root' })
export class SmzDocumentsService {
  public showDownloadControl: boolean; // deixar o usuário baixar o pdf
  public showExportControl: boolean; // exportar o pdf em formato blob para o component pai
  public zoom = INITIAL_ZOOM;

  constructor() {
    this.zoom = INITIAL_ZOOM;

    this.showDownloadControl = true;
    this.showExportControl = true;
  }

  public generatePdf(action: 'open' | 'print' | 'download', element: ElementRef, state: SmzDocumentState): Promise<any> {
    return new Promise((resolve) => {

      const docOptions: jsPDFOptions = {
        orientation: 'portrait',
        unit: 'pt',
        format: 'A4',
        userUnit: 1,
        precision: 2,
        compress: true,
        putOnlyUsedFonts: true,
      };

      const doc = new jsPDF(docOptions);

      const margin = 15;
      const options: HTMLOptions = {
        width: 595.276 - (margin * 2),
        windowWidth: (595.276 - margin * 2) * 1.65,
        margin: margin,
        autoPaging: true,
        x: 0,
        y: 0,
        html2canvas: {
          svgRendering: true,
        },
      };

      doc.addFont('assets/fonts/Roboto-Thin.ttf', 'Thin', 'normal', 100);
      doc.addFont('assets/fonts/Roboto-Light.ttf', 'Light', 'normal', 300);
      doc.addFont('assets/fonts/Roboto-Regular.ttf', 'Roboto', 'normal', 400);
      doc.addFont('assets/fonts/Roboto-Medium.ttf', 'Medium', 'normal', 500);
      doc.addFont('assets/fonts/Roboto-Bold.ttf', 'Bold', 'normal', 700);

      doc.html(element.nativeElement, options).then(() => {
        switch (action) {
          case 'open': {
            doc.output('dataurlnewwindow', { filename: 'teste.pdf' });
            resolve('Resolved');

            break;
          }
          // case 'print': this.pdfMakeService.pdfMake.createPdf(document).print(); break;
          case 'download': {
            const saving = doc.save('teste.pdf', { returnPromise: true });
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
