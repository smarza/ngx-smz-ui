import { Injectable, Renderer2 } from '@angular/core';
import { from, Observable } from 'rxjs';
import { PDFExportComponent } from '@progress/kendo-angular-pdf-export';
import { Group } from '@progress/kendo-drawing';
import { defineFont } from '@progress/kendo-drawing/pdf';

defineFont({
  'Open Sans': 'assets/fonts/OpenSans-VariableFont_wdth,wght.ttf',
});

const INITIAL_ZOOM = 1.5;

@Injectable({providedIn: 'root'})
export class SmzDocumentsService
{
  private _pixelMultiplier: number;
  private _baseMargin: number;
  private _paperWidth: number;

  public margin: any;
  public showDownloadControl: boolean; // deixar o usuário baixar o pdf

  public showExportControl: boolean; // exportar o pdf em formato blob para o component pai

  public zoom = INITIAL_ZOOM;

  public pdfElement: PDFExportComponent;
  public paperContainer: any;
  public description = '';
  public filename = '';
  public title = '';
  public renderer: Renderer2;

  constructor()
  {
      this.reset();
  }

  public calcColumnWidth(cm: number): number
  {
      const area = (this._paperWidth - (this._baseMargin * 2));
      return (cm * 100) / area;
  }

  public setHeaderHeight(height: string): void
  {
      this.margin.top = height;
  }

  public reset(): void
  {
      this.zoom = INITIAL_ZOOM;

      this.showDownloadControl = true;
      this.showExportControl = true;
      this._pixelMultiplier = 28.346;
      this._baseMargin = 0.6;
      this.margin = { top: `${this._baseMargin}cm`, bottom: `${this._baseMargin}cm`, right: `${this._baseMargin}cm`, left: `${this._baseMargin}cm` };
      this._paperWidth = 21;
  }

  public download(filenameExtension: string = null): void
  {
      this.renderer.setStyle(this.paperContainer.nativeElement, 'transform', 'scale(1)');

      this.zoom = 1;

      setTimeout(() =>
      {
          this.pdfElement.date = new Date();
          this.pdfElement.subject = this.description;
          this.pdfElement.title = this.title;
          this.pdfElement.saveAs(`${this.filename}${filenameExtension == null ? '' : ' - ' + filenameExtension}.pdf`);
      }, 300);
  }

  public save(): Observable<Group>
  {
    this.pdfElement.date = new Date();
    this.pdfElement.subject = this.description;
    this.pdfElement.title = this.title;

    return from(this.pdfElement.export());
  }

  public fileDownload(file: File): void
  {
    const url= window.URL.createObjectURL(file);

    var link=document.createElement('a');
    link.href = url;
    link.download = file.name;
    link.click();
  }


}
