import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SmzTreeBuilder, SmzTableState, SmzClipboardService, SmzFilterType, SmzTreeState } from 'ngx-smz-ui';
import { TreeNode } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-demo-trees',
  templateUrl: './demo-trees.component.html',
  providers: []
})

export class DemoTreesComponent implements OnInit {
  public items$: Observable<TreeNode[]>;
  public treeState: SmzTreeState;
  public loading = false;
  constructor(private http: HttpClient) {

    this.items$ = this.http.get<{data: TreeNode}>('assets/files.json').pipe(map(x => [x.data]));
  }

  ngOnInit() {
    this.setupTree();

    // setTimeout(() => {
    //   this.tableState = null;
    //   setTimeout(() => {
    //     this.setupTable();
    //   }, 2000);
    // }, 2000);
  }

  public setupTree(): void {

    this.treeState = new SmzTreeBuilder()
      .setTitle('My awesome tree')
      .menu()
        .caption('Novo')
          .item('Arquivo text')
            .setCallback(node => console.log('TEXT: ', node))
            .hideForTypes('file')
            .parent
          .item('Imagem')
            .setCallback(node => console.log('IMAGEN: ', node))
            .showForTypes('folder')
            .menu
        .separator()
        .item('Renomear')
          .setCallback(node => console.log('RENOMEAR: ', node))
          .showForTypes('file', 'folder')
          .menu
        .item('Excluir')
          .setCallback(node => console.log('EXCLUIR: ', node))
          .menu
        .tree
      .enableFilter()
      .toolbar('rounded-outlined')
        .setAlignment('end')
        .useTreeExpandButtons()
        .useNodeExpandButtons()
        .buttons()
          .button('', 'fas fa-coffee')
            .setCallback((data, node) => console.log('Button 1'))
            .setTooltip('Button 1 awesome tooltip')
            .setColor('danger')
            .buttons
          .button('', 'fas fa-hamburger')
            .setCallback((data, node) => console.log('Button 2'))
            .setTooltip('Button 2 awesome tooltip')
            .setColor('warning')
            .buttons
          .button('', 'fas fa-pizza-slice')
            .setCallback((data, node) => console.log('Button 3'))
            .setTooltip('Button 3 awesome tooltip')
            .setColor('success')
            .buttons
          .toolbar
        .tree
        .dragAndDrop()
          .canDrag('file').into('folder')
          .canDrag('folder').into('folder')
        .tree
      .build();
  }

  // public loadItems(): void {
  //   const rootIcon = 'fas fa-check';
  //   const sectionIcon = '';
  //   const proceduresRootIcon = '';
  //   const proceduresIcon = '';
  //   const variablesIcon = '';
  //   const materialsGroupIcon = '';
  //   const tablesIcon = '';
  //   const evolutionIcon = '';
  //   const monitoringIcon = '';
  //   const professionalsIcon = '';
  //   const variablesRootIcon = '';
  //   const dropdownIcon = '';
  //   const dropddownOptionsIcon = '';
  //   const textIcon = '';
  //   const multiselectIcon = '';
  //   const materialsIcon = '';
  //   const infoIcon = '';
  //   const columnIcon = '';
  //   const rowIcon = '';

  //   this.items$ = of([
  //     {
  //       label: 'Cateterismo',
  //       icon: rootIcon,
  //       expanded: true,
  //       type: 'root',
  //       children: [
  //         {
  //           label: 'Procedimentos',
  //           icon: proceduresRootIcon,
  //           expanded: true,
  //           children: [
  //             {
  //               label:
  //                 'CATETERISMO CARDÍACO E E/OU D COM CINEANGIOCORONARIOGRAFIA E VENTRICULOGRAFIA',
  //               icon: proceduresIcon,
  //               expanded: true,
  //               children: []
  //             }
  //           ]
  //         },
  //         {
  //           label: 'Profissionais: 2',
  //           icon: professionalsIcon,
  //           expanded: true
  //         },
  //         {
  //           label: 'Técnica',
  //           icon: sectionIcon,
  //           key: 'MyCustomKey',
  //           expanded: true,
  //           children: [
  //             {
  //               label: 'Variáveis',
  //               icon: variablesRootIcon,
  //               expanded: true,
  //               children: [
  //                 {
  //                   label: 'Introdutor',
  //                   icon: dropdownIcon,
  //                   expanded: true,
  //                   children: [
  //                     {
  //                       label: 'Opções',
  //                       icon: dropddownOptionsIcon,
  //                       expanded: true,
  //                       children: [
  //                         {
  //                           label: 'Radial',
  //                           icon: textIcon,
  //                           expanded: true,
  //                           children: []
  //                         },
  //                         {
  //                           label: 'Braquial',
  //                           icon: textIcon,
  //                           expanded: true,
  //                           children: []
  //                         },
  //                         {
  //                           label: 'Femoral',
  //                           icon: textIcon,
  //                           expanded: true,
  //                           children: []
  //                         }
  //                       ]
  //                     }
  //                   ]
  //                 },
  //                 {
  //                   label: 'Guia',
  //                   icon: dropdownIcon,
  //                   expanded: true,
  //                   children: [
  //                     {
  //                       label: 'Opções',
  //                       icon: dropddownOptionsIcon,
  //                       expanded: true,
  //                       children: [
  //                         {
  //                           label: 'hidrofílica 0.035"',
  //                           icon: textIcon,
  //                           expanded: true,
  //                           children: []
  //                         },
  //                         {
  //                           label: 'teflonada',
  //                           icon: textIcon,
  //                           expanded: true,
  //                           children: []
  //                         }
  //                       ]
  //                     }
  //                   ]
  //                 },
  //                 {
  //                   label: 'Cateter',
  //                   icon: multiselectIcon,
  //                   expanded: true,
  //                   children: [
  //                     {
  //                       label: 'Opções',
  //                       icon: dropddownOptionsIcon,
  //                       expanded: true,
  //                       children: [
  //                         {
  //                           label: 'TIG',
  //                           icon: textIcon,
  //                           expanded: true,
  //                           children: []
  //                         },
  //                         {
  //                           label: 'MP',
  //                           icon: textIcon,
  //                           expanded: true,
  //                           children: []
  //                         }
  //                       ]
  //                     }
  //                   ]
  //                 }
  //               ]
  //             }
  //           ]
  //         },
  //         {
  //           label: 'Materiais',
  //           icon: sectionIcon,
  //           expanded: true,
  //           children: [
  //             {
  //               label: 'Materiais',
  //               icon: materialsGroupIcon,
  //               expanded: true,
  //               children: [
  //                 {
  //                   label: 'Manifold',
  //                   icon: materialsIcon,
  //                   expanded: true,
  //                   children: [{ label: 'Quantidade: 1', icon: infoIcon }]
  //                 },
  //                 {
  //                   label: 'Extensor de pressão',
  //                   icon: materialsIcon,
  //                   expanded: true,
  //                   children: [{ label: 'Quantidade: 1', icon: infoIcon }]
  //                 },
  //                 {
  //                   label: 'Conector de bomba',
  //                   icon: materialsIcon,
  //                   expanded: true,
  //                   children: [{ label: 'Quantidade: 1', icon: infoIcon }]
  //                 },
  //                 {
  //                   label: 'Seringa de bomba injetora',
  //                   icon: materialsIcon,
  //                   expanded: true,
  //                   children: [{ label: 'Quantidade: 1', icon: infoIcon }]
  //                 },
  //                 {
  //                   label: 'Transdutor de pressão',
  //                   icon: materialsIcon,
  //                   expanded: true,
  //                   children: [{ label: 'Quantidade: 1', icon: infoIcon }]
  //                 },
  //                 {
  //                   label: 'Heparina 5000U',
  //                   icon: materialsIcon,
  //                   expanded: true,
  //                   children: [{ label: 'Quantidade: 1', icon: infoIcon }]
  //                 },
  //                 {
  //                   label: 'SF 0,9% 500ml',
  //                   icon: materialsIcon,
  //                   expanded: true,
  //                   children: [{ label: 'Quantidade: 1', icon: infoIcon }]
  //                 },
  //                 {
  //                   label: 'IntroSF 0,9% 250mldutor',
  //                   icon: materialsIcon,
  //                   expanded: true,
  //                   children: [{ label: 'Quantidade: 1', icon: infoIcon }]
  //                 },
  //                 {
  //                   label: 'Ampola de monocordil',
  //                   icon: materialsIcon,
  //                   expanded: true,
  //                   children: [
  //                     { label: 'Quantidade: Variável', icon: infoIcon }
  //                   ]
  //                 },
  //                 {
  //                   label: 'Contraste (frascos de 50 ml)',
  //                   icon: materialsIcon,
  //                   expanded: true,
  //                   children: [
  //                     { label: 'Quantidade: Variável', icon: infoIcon }
  //                   ]
  //                 },
  //                 {
  //                   label: 'Intensificador de imagens',
  //                   icon: materialsIcon,
  //                   expanded: true,
  //                   children: [{ label: 'Quantidade: 1', icon: infoIcon }]
  //                 }
  //               ]
  //             }
  //           ]
  //         },
  //         {
  //           label: 'Manometria',
  //           icon: sectionIcon,
  //           expanded: true,
  //           children: [
  //             {
  //               label: 'Tabela de Pressão',
  //               icon: tablesIcon,
  //               expanded: true,
  //               children: [
  //                 {
  //                   label: 'Linhas',
  //                   icon: rowIcon,
  //                   expanded: true,
  //                   children: [
  //                     {
  //                       label: 'VE',
  //                       icon: rowIcon,
  //                       expanded: true,
  //                       children: []
  //                     },
  //                     {
  //                       label: 'AO',
  //                       icon: rowIcon,
  //                       expanded: true,
  //                       children: []
  //                     }
  //                   ]
  //                 },
  //                 {
  //                   label: 'Colunas',
  //                   icon: columnIcon,
  //                   expanded: true,
  //                   children: [
  //                     {
  //                       label: 'PS (Pressão Arterial Sistólica)',
  //                       icon: columnIcon,
  //                       expanded: true,
  //                       children: []
  //                     },
  //                     {
  //                       label: 'Pd1 (Pressão diastólica)',
  //                       icon: columnIcon,
  //                       expanded: true,
  //                       children: []
  //                     },
  //                     {
  //                       label:
  //                         'Pd2 (Pressão diastólica final de ventrículo esquerdo)',
  //                       icon: columnIcon,
  //                       expanded: true,
  //                       children: []
  //                     },
  //                     {
  //                       label: 'Média',
  //                       icon: columnIcon,
  //                       expanded: true,
  //                       children: []
  //                     }
  //                   ]
  //                 }
  //               ]
  //             }
  //           ]
  //         },
  //         {
  //           label: 'Coronária Direita',
  //           icon: sectionIcon,
  //           expanded: true,
  //           children: [
  //             {
  //               label: 'Variáveis',
  //               icon: variablesRootIcon,
  //               expanded: true,
  //               children: [
  //                 {
  //                   label: 'Tamanho',
  //                   icon: dropdownIcon,
  //                   expanded: true,
  //                   children: [
  //                     {
  //                       label: 'Opções',
  //                       icon: dropddownOptionsIcon,
  //                       expanded: true,
  //                       children: [
  //                         {
  //                           label: 'Grande',
  //                           icon: textIcon,
  //                           expanded: true,
  //                           children: []
  //                         },
  //                         {
  //                           label: 'Moderado',
  //                           icon: textIcon,
  //                           expanded: true,
  //                           children: []
  //                         },
  //                         {
  //                           label: 'Pequeno',
  //                           icon: textIcon,
  //                           expanded: true,
  //                           children: []
  //                         }
  //                       ]
  //                     }
  //                   ]
  //                 },
  //                 {
  //                   label: 'Calibre',
  //                   icon: dropdownIcon,
  //                   expanded: true,
  //                   children: [
  //                     {
  //                       label: 'Opções',
  //                       icon: dropddownOptionsIcon,
  //                       expanded: true,
  //                       children: [
  //                         {
  //                           label: 'Grande',
  //                           icon: textIcon,
  //                           expanded: true,
  //                           children: []
  //                         },
  //                         {
  //                           label: 'Moderado',
  //                           icon: textIcon,
  //                           expanded: true,
  //                           children: []
  //                         },
  //                         {
  //                           label: 'Pequeno',
  //                           icon: textIcon,
  //                           expanded: true,
  //                           children: []
  //                         }
  //                       ]
  //                     }
  //                   ]
  //                 },
  //                 {
  //                   label: 'Situação do Ramo Descendente Posterior',
  //                   icon: multiselectIcon,
  //                   expanded: true,
  //                   children: [
  //                     {
  //                       label: 'Opções',
  //                       icon: dropddownOptionsIcon,
  //                       expanded: true,
  //                       children: [
  //                         {
  //                           label: 'Com Lesão',
  //                           icon: textIcon,
  //                           expanded: true,
  //                           children: []
  //                         },
  //                         {
  //                           label: 'Sem Lesão',
  //                           icon: textIcon,
  //                           expanded: true,
  //                           children: []
  //                         }
  //                       ]
  //                     }
  //                   ]
  //                 }
  //               ]
  //             }
  //           ]
  //         }
  //       ]
  //     }
  //   ]);
  // }
}