import { SmzContentType, SmzExportableContentType } from '../smz-tables/models/content-types';

export interface SmzExportDialogData {
  title: string;
  filename: string;
  items: any[];
  columns: SmzExportableColumn[]
}

export interface SmzExportableColumn {
  field: string;
  header: string;
  isDataTransform: boolean;
  callback: any;
  type: SmzExportableContentType;
}