export interface SmzSideContent {
  // visible: boolean;
  // position?: 'left' | 'right';
  // overlay?: boolean;
  fullScreen?: boolean;
  styleClass?: string;
  style?: string;
  blockScroll?: boolean;
  dismissible?: boolean;
  modal?: boolean;
  showCloseIcon?: boolean;
  ariaCloseLabel?: string;
  closeOnEscape?: boolean;
}

export const SmzSideContentDefault: SmzSideContent = {
  // visible: false,
  // position: 'right',
  // overlay: false,
  fullScreen: false,
  styleClass: null,
  style: null,
  blockScroll: false,
  dismissible: true,
  modal: true,
  showCloseIcon: true,
  ariaCloseLabel: 'Fechar',
  closeOnEscape: true,
}