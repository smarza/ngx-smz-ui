
import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import html2canvas from 'html2canvas';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PdfMakeScriptService {

  public pdfMake: any;
  public htmlToPdfmake: any;
  public html2canvas: any;
  constructor() {
    this.loadPdfMaker();
  }

  public async loadPdfMaker() {
    if (!this.pdfMake) {
      const pdfMakeModule = await import('pdfmake/build/pdfmake');
      const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
      const htmlToPdfMakeModule = await import('html-to-pdfmake');
      const html2canvasModule = await import('html2canvas');
      this.htmlToPdfmake = htmlToPdfMakeModule.default;
      this.html2canvas = html2canvasModule.default;
      this.pdfMake = pdfMakeModule.default;
      this.pdfMake.vfs = pdfFontsModule.default.pdfMake.vfs;
    }
  }

}