import { SmzContentType, SmzExportableContentSource, SmzExportableContentType } from '../smz-tables/models/content-types';

export interface SmzExportDialogData {
  title: string;
  filename: string;
  items: any[];
  columns: SmzExportableColumn[]
}

export interface SmzExportableColumn {
  field: string;
  header: string;
  callback: (data: any, row: any, index: number) => any;
  type: SmzExportableContentType;
}