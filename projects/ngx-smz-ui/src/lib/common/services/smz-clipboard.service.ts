import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { ToastActions } from '../../state/global/application/application.actions.toast';
import { SmzPresets } from '../../modules/smz-dialogs/models/smz-presets';
import { SmzDialogsService } from '../../modules/smz-dialogs/services/smz-dialogs.service';

@Injectable({
  providedIn: 'root'
})
export class SmzClipboardService {
  clipboardText: string = '';

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

  public async readFromClipboard(): Promise<string> {
    if (navigator.clipboard) {
      try {
        const text = await navigator.clipboard.readText();
        return text;
      } catch (err) {
        console.error('Falha ao ler da área de transferência: ', err);
        throw err;
      }
    } else {
      console.warn('A API de área de transferência não é suportada neste navegador.');
      return '';
    }
  }
}