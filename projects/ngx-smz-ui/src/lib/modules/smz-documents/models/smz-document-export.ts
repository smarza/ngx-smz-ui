import { jsPDFOptions, HTMLOptions } from 'jspdf';

export interface SmzDocumentExport {
  filename: string;
  jsPDFOptions: jsPDFOptions;
  htmlOptions: HTMLOptions;
  html2pdfOptions: any;
  margin: {
    top: number;
    left: number;
    right: number;
    bottom: number;
  }
}