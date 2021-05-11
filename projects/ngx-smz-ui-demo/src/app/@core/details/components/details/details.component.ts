import { Component, OnInit } from '@angular/core';
import { UiActions } from 'projects/ngx-smz-ui/src/public-api';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public action = new UiActions.ShowConfigAssistance();
  constructor() {
  }

  public ngOnInit(): void {
  }

}
