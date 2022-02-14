import { jsPDFOptions, HTMLOptions } from 'jspdf';

export interface SmzDocumentExport {
  filename: string;
  jsPDFOptions: jsPDFOptions;
  htmlOptions: HTMLOptions;
}