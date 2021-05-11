import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, QueryList, SimpleChanges, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngxs/store';
import { PrimeTemplate } from 'primeng/api';
import { UiActions } from '../smz-layouts/core/state/ui/ui.actions';
import { SmzSideContent, SmzSideContentDefault } from './models/side-content';

@Component({
  selector: 'smz-side-content',
  templateUrl: 'smz-side-content.component.html',
  styleUrls: ['smz-side-content.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SmzSideContentComponent implements OnInit, AfterContentInit, OnChanges, OnDestroy {
  @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
  @Input() public config: SmzSideContent;
  @Input() public visible: boolean = false;
  @Input() public position: 'left' | 'right';
  @Input() public overlay: boolean;
  @Output() public clicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() public onHide: EventEmitter<void> = new EventEmitter<void>();
  public defaultConfig = SmzSideContentDefault;
  public contentTemplate: TemplateRef<any>;
  constructor(private store: Store) { }
  public ngOnInit(): void {

  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.visible?.isFirstChange()) {
      this.store.dispatch(new UiActions.RestoreLayoutPosition());
      return;
    }

    if (changes.overlay != null) {
      const overlay: boolean = changes.overlay.currentValue;

      if (overlay) {
        this.store.dispatch(new UiActions.RestoreLayoutPosition());
      }
      else {
        if (this.position === 'left') {
          this.store.dispatch(new UiActions.MoveLayout('shift-content-right'));
        }
        else if (this.position === 'right') {
          this.store.dispatch(new UiActions.MoveLayout('shift-content-left'));
        }
        else {
          this.store.dispatch(new UiActions.RestoreLayoutPosition());
        }
      }
    }
    else if (changes.visible != null) {
      const visible: boolean = changes.visible.currentValue;

      if (!visible || this.overlay) {
        this.store.dispatch(new UiActions.RestoreLayoutPosition());
      }
      else {
        if (this.position === 'left') {
          this.store.dispatch(new UiActions.MoveLayout('shift-content-right'));
        }
        else if (this.position === 'right') {
          this.store.dispatch(new UiActions.MoveLayout('shift-content-left'));
        }
        else {
          this.store.dispatch(new UiActions.RestoreLayoutPosition());
        }
      }
    }
    else if (changes.position != null) {

      if (!this.visible || this.overlay) {
        this.store.dispatch(new UiActions.RestoreLayoutPosition());
      }
      else if (this.position === 'left') {
        this.store.dispatch(new UiActions.MoveLayout('shift-content-right'));
      }
      else if (this.position === 'right') {
        this.store.dispatch(new UiActions.MoveLayout('shift-content-left'));
      }
      else {
        this.store.dispatch(new UiActions.RestoreLayoutPosition());
      }

    }

  }

  public ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case 'content':
          this.contentTemplate = item.template;
          break;
      }
    });
  }

  public ngOnDestroy(): void {
    this.store.dispatch(new UiActions.RestoreLayoutPosition());
  }
}