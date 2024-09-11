import { Component, OnInit } from '@angular/core';
import { FormGroupComponent, SmzForm, SmzControlType, SmzTagAreaControl } from 'ngx-smz-ui';

interface Response
{
    textArea: string;
}

@Component({
    selector: 'app-tag-area-demo',
    templateUrl: './tag-area-demo.component.html',
})
export class TagAreaDemoComponent implements OnInit
{
    public formConfig: SmzForm<Response>;
    constructor() { }

    ngOnInit(): void
    {
        this.createForm();
    }

    public show(): void
    {

    }

    public createForm(): void
    {

        const input: SmzTagAreaControl = {
            propertyName: 'tagArea', type: SmzControlType.TAG_AREA, name: 'Tag Area',
            config: {
                tagCharacteres: {
                  open: '[',
                  close: ']'
                },
                options: [
                  {
                    key: '#',
                    data: [
                      { id: 'Pinheirinho', value: '<rbk>'},
                      { id: 'Rio de Janeiro', value: '<rj>'},
                      { id: 'São Paulo', value: '<sp>'},
                    ]
                  },
                  {
                    key: '/user',
                    data: [
                      { id: 'Eduardo', value: '@dudu.abrao'},
                      { id: 'Filip', value: '@filip.duarte'},
                      { id: 'Ricardo', value: '@ricardo.igreja'},
                      { id: 'Rodrigo', value: '@rodrigo.basniak'},
                    ]
                  }
                ]
              },
            defaultValue: '', textAreaRows: 10,
            template: { extraSmall: { row: 'col-6' } }
        };

        this.formConfig = {
            behaviors: { flattenResponse: false, avoidFocusOnLoad: true },
            groups: [
                {
                    name: '', showName: false,
                    children: [input],
                    template: { extraSmall: { row: 'col-12' } }
                }
            ],
        };

    }

    public log(form: FormGroupComponent): void
    {
        console.log(form.getData());
    }

}
