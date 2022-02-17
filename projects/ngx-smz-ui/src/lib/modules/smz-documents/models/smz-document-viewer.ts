
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
  };
  print: {
    isEnabled: boolean;
  };
  download: {
    isEnabled: boolean;
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