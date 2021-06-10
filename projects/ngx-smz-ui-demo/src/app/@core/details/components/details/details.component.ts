import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UiActions } from 'ngx-smz-ui';
import { SmzSmartTagConfig, SmzSmartTagOptions } from '../../smart-tag.directive';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public action = new UiActions.ShowConfigAssistance();

  public config: SmzSmartTagConfig;

  public inputControl = new FormControl('Início_==_fim.');
  constructor() {

    this.config = {
      tagCharacteres: {
        open: '[',
        close: ']'
      },
      options: [
        {
          key: '#',
          data: [
            { key: 'Pinheirinho', value: '<rbk>'},
            { key: 'Rio de Janeiro', value: '<rj>'},
            { key: 'São Paulo', value: '<sp>'},
          ]
        },
        {
          key: '/user',
          data: [
            { key: 'Eduardo', value: '@dudu.abrao'},
            { key: 'Filip', value: '@filip.duarte'},
            { key: 'Ricardo', value: '@ricardo.igreja'},
            { key: 'Rodrigo', value: '@rodrigo.basniak'},
          ]
        }
      ]
    };
  }

  public ngOnInit(): void {
  }

}
