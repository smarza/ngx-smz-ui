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
  callback: any;
  type: SmzExportableContentType;
  dataSource: SmzExportableContentSource;
}