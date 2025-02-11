// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/internal/Observable';
// import { BaseApiService, ApplicationActions } from 'ngx-smz-ui';
// import { Configuration, CreateChatCompletionResponse, CreateCompletionResponse, ListModelsResponse, OpenAIApi } from "openai";
// import { from, of } from 'rxjs';
// import { switchMap } from 'rxjs/operators';
// import { Store } from '@ngxs/store';

// @Injectable({ providedIn: 'root' })
// export class OpenAiService extends BaseApiService {

//   private configuration = new Configuration({
//     organization: "org-LspGxhHi0HtRCPhYTGdRa8O9",
//     apiKey: `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`,
//   });
//   private openai: OpenAIApi;
//   public isReady = false;
//   public models: ListModelsResponse;

//   constructor(private store: Store) {
//     super();

//     this.openai = new OpenAIApi(this.configuration);

//     this.openai
//       .listModels()
//       .then((event) => {
//         console.log(event);
//         if (event.status === 200) {
//           this.models = event.data;
//           this.isReady = true;
//         }
//         else {
//           console.warn('event error', event);
//         }
//       });
//   }

//   public createCompletion(prompt: string): Observable<CreateCompletionResponse> {
//     this.store.dispatch(new ApplicationActions.StartGlobalLoading());
//     return from(this.openai.createCompletion({
//       model: 'text-davinci-003',
//       prompt: prompt,
//       max_tokens: 7,
//       temperature: 0,
//     }))
//       .pipe(switchMap((event) => {
//         this.store.dispatch(new ApplicationActions.StopGlobalLoading());
//         if (event.status === 200) {
//           return of(event.data);
//         }
//         else {
//           console.warn('event error', event);
//           return of(null);
//         }
//       }));
//   }

//   public createChatCompletion(content: string): Observable<CreateChatCompletionResponse> {
//     this.store.dispatch(new ApplicationActions.StartGlobalLoading());
//     return from(this.openai.createChatCompletion({
//       model: 'gpt-3.5-turbo',
//       messages: [{ role: "user", content }]
//     }))
//       .pipe(switchMap((event) => {
//         this.store.dispatch(new ApplicationActions.StopGlobalLoading());
//         if (event.status === 200) {
//           return of(event.data);
//         }
//         else {
//           console.warn('event error', event);
//           return of(null);
//         }
//       }));
//   }
// }