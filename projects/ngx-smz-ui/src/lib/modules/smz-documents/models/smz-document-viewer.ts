
export interface SmzDocumentViewer {
  zoom: {
    isEnabled: boolean;
    min: number;
    max: number;
    initial: number;
    variation: number;
  };
  open: {
    isEnabled: boolean;
    label: string;
  };
  print: {
    isEnabled: boolean;
    label: string;
  };
  download: {
    isEnabled: boolean;
    label: string;
  };
  container: {
    styleClass: string;
  };

  paper: {
    styleClass: string;
    ptWidth: number;
    ptHeight: number;
  };
}