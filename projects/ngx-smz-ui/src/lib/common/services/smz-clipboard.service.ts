import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { ToastActions } from 'ngx-rbk-utils';
import { SmzDialogsService, SmzPresets } from 'ngx-smz-dialogs';

@Injectable({
  providedIn: 'root'
})
export class SmzClipboardService {

  constructor(private dialogs: SmzDialogsService, private store: Store) { }

  public copy(val: string, notification: 'none' | 'dialog' | 'toast' = 'toast'){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    if (notification === 'dialog') {
      this.dialogs.open({
        presetId: SmzPresets.Message,
        title: 'Area de transferência',
        features: [{ type: 'message', data: 'Mensagem copiada com sucesso.' }],
        dialogTemplate: {
          extraSmall: { row: 'col-10' },
          large: { row: 'col-4' },
          extraLarge: { row: 'col-3' },
      }
      });
    }
    else if (notification === 'toast') {
      this.store.dispatch(new ToastActions.Success('Mensagem copiada com sucesso.'));
    }
  }
}