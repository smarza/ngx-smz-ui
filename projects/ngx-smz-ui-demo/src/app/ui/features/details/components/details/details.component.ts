import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { UiActions, Confirmable } from 'ngx-smz-ui';
import { SmzSmartTagConfig, SmzSmartTagOptions } from '../../smart-tag.directive';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent implements OnInit {

  public action = new UiActions.ShowConfigAssistance();

  public config: SmzSmartTagConfig;

  public inputControl = new UntypedFormControl('Início_==_fim.');
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

  @Confirmable('Testando', 'title test', true)
  public testConfirmation(): void {
    console.log('testConfirmation ok');
  }

}
