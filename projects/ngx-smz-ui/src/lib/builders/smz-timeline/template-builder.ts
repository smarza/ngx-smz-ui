import { SmzBuilderUtilities } from '../common/smz-builder-utilities';
import { SmzTimelineBuilder } from './state-builder';
import { SmzTimelineMarker, SmzTimelineView } from '../../modules/smz-timeline/models/smz-timeline-state';

export class SmzTimelineViewBuilder extends SmzBuilderUtilities<SmzTimelineViewBuilder> {
  protected override that = this;
  private _styles = {
    timeline: '',
    event: ''
  }
  constructor(private _builder: SmzTimelineBuilder<any>, private _viewData: SmzTimelineView, private _layout: 'vertical' | 'horizontal') {
    super();
    this._viewData.layout = this._layout;
  }

  public setLayout(layout: 'vertical' | 'horizontal'): SmzTimelineViewBuilder {
    this._viewData.layout = layout;
    return this;
  }

  public styleEvent(styleClass: string): SmzTimelineViewBuilder {
    this._viewData.styleClass.event = styleClass;
    return this;
  }

  public styleTimeline(styleClass: string): SmzTimelineViewBuilder {
    this._viewData.styleClass.timeline = styleClass;
    return this;
  }

  public addGap(gap: 2 | 4 | 6 | 8 | 10 | 12 = 8): SmzTimelineViewBuilder {
    const styles = 'mb-2 mb-4 mb-6 mb-8 mb-10 mb-12';
    this._styles.event = ` mb-${gap} block `;
    return this;
  }

  public setAlign(align: 'left' | 'right' | 'top' | 'botttom' | 'alternate'): SmzTimelineViewBuilder {
    this._viewData.align = align;

    if (align === 'alternate') {
      this._styles.timeline = ' mobile-timeline ';
    }

    return this;
  }


  public get timeline(): SmzTimelineBuilder<any> {
    this._viewData.styleClass.event = this._viewData.styleClass.event + this._styles.event;
    this._viewData.styleClass.timeline = this._viewData.styleClass.timeline + this._styles.timeline;
    return this._builder;
  }
}

export class SmzTimelineMarkerBuilder extends SmzBuilderUtilities<SmzTimelineMarkerBuilder> {
  protected override that = this;
  constructor(private _builder: SmzTimelineBuilder<any>, private _markerData: SmzTimelineMarker) {
    super();
  }

  public style(styleClass: string): SmzTimelineMarkerBuilder {
    this._markerData.styleClass = styleClass;
    return this;
  }

  public setIcon(icon: string): SmzTimelineMarkerBuilder {
    this._markerData.icon = icon;
    return this;
  }


  public get timeline(): SmzTimelineBuilder<any> {
    return this._builder;
  }
}