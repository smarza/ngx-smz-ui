export interface SmzExportDialogData {
  title: string;
  filename: string;
  items: any[];
  columns: { field: string, header: string, isDataTransform: boolean, callback: any }[]
}