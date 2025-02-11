// import { Component, ViewEncapsulation } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ButtonModule } from 'primeng/button';
// import { OpenAiService } from './services/open-ai.service';
// import { NgxSmzDataPipesModule, PrettyJsonPipe, SmzDialogBuilder, SmzDialogsService } from 'ngx-smz-ui';

// @Component({
//   selector: 'app-open-ai',
//   standalone: true,
//   imports: [CommonModule, ButtonModule, NgxSmzDataPipesModule],
//   host: { class: 'w-full h-full relative' },
//   encapsulation: ViewEncapsulation.None,
//   styles: [`
//   .app-open-ai {}
//   `
//   ],
//   template: `

//     <div class="absolute inset-0 p-5 grid grid-nogutter items-end justify-center">
//       <!-- <button pButton type="button" label="createCompletion" class="p-button-rounded p-button-help" [disabled]="!openAiService.isReady" (click)="createCompletion()"></button> -->
//       <button pButton type="button" label="Start Chat" class="p-button-rounded p-button-help" [disabled]="!openAiService.isReady" (click)="createChatCompletion()"></button>
//     </div>
//   `,
// })
// export class OpenAiComponent {
//   constructor(public openAiService: OpenAiService, private dialogs: SmzDialogsService) {

//   }

//   public createCompletion(): void {
//     const prompt: string = 'Qual a capital do Brasil ?';

//     this.openAiService
//       .createCompletion(prompt)
//       .subscribe(x => {
//         const rawMessage = new PrettyJsonPipe().transform(JSON.stringify(x), [true, 3]);
//         const content = x.choices[0]?.text;

//         this.dialogs.open(new SmzDialogBuilder()
//           .setTitle('Create Completion')
//           .html([`Prompt: <b>${prompt}</b>`, `Resposta: <i>${content}</i>`, ``, `Raw Response: ${rawMessage}`])
//           .build()
//         );
//       });
//   }

//   public createChatCompletion(): void {

//     this.dialogs.open(new SmzDialogBuilder<{ prompt: string }>()
//       .setTitle('Chat')
//       .setLayout('EXTRA_SMALL', 'col-12')
//       .setLayout('SMALL', 'col-12')
//       .setLayout('MEDIUM', 'col-6')
//       .setLayout('LARGE', 'col-6')
//       .setLayout('EXTRA_LARGE', 'col-6')
//       .closeOnEscape()
//       .dismissableMask()
//       .confirmOnEnter()
//       .form()
//         .group()
//           .textArea('prompt', 'Pergunta', 'Qual a capital do Brasil ?')
//             .validators().required().input
//             .group
//           .form
//         .dialog
//       .buttons()
//         .confirm()
//           .callback(response => {
//             this.openAiService
//             .createChatCompletion(response.prompt)
//             .subscribe(x => {
//               const rawMessage = new PrettyJsonPipe().transform(JSON.stringify(x), [true, 3]);
//               const content = x.choices[0]?.message?.content;

//               this.dialogs.open(new SmzDialogBuilder()
//                 .setTitle('Create Chat Completion')
//                 .html([`Prompt: <b>${response.prompt}</b>`, '', `Resposta: <i>${content}</i>`, ``, `Raw Response: ${rawMessage}`])
//                 .buttons()
//                   .cancel().hide().buttons
//                   .confirm().hide().buttons
//                   .dialog
//                 .build(),
//               );
//             });
//           })
//           .buttons
//         .dialog
//       .build()
//     );

//   }

// }