import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SmzEasyTableState } from '../../../models/smz-easy-table-state';

@Component({
  selector: 'et-title',
  template: `
  <h1 class="text-xl mb-2">{{ state.title.getText() }}</h1>
`,
  changeDetection: ChangeDetectionStrategy.Default
})

export class TitleComponent implements OnInit {
  @Input() public state: SmzEasyTableState;
  constructor() { }

  ngOnInit() { }
}