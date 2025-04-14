import { Observable } from 'rxjs';
import { SmzCardActions, SmzCardsSource } from '../../smz-cards/models/smz-cards-state';
import { SmzCardsTemplates } from '../../smz-cards/models/smz-cards-templates';

export interface SmzTimelineState<T> {
  items$: Observable<T[]>;
  sources: SmzCardsSource<T>[]
  selectedSource: SmzCardsSource<T>;
  isDebug: boolean;
  title: {
    isVisible: boolean;
    getText: () => string;
  };
  locale: SmzTimelineLocale;
  template: SmzCardsTemplates<T>;
  buttons: SmzCardActions<T>;
  menu: SmzCardActions<T>;
  view: SmzTimelineView;
  marker: SmzTimelineMarker;
}

export interface SmzTimelineLocale {
  code: 'pt-BR' | 'en-US';
  emptyMessage: string;
}

export interface SmzTimelineView {
  styleClass: {
    event: string;
    timeline: string;
  }
  align: 'left' | 'right' | 'top' | 'botttom' | 'alternate';
  layout: 'vertical' | 'horizontal';
}

export interface SmzTimelineMarker {
  styleClass: string;
  icon: string;
}