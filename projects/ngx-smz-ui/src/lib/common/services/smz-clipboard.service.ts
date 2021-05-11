import { Injectable } from '@angular/core';
import { SmzDialogsService, SmzPresets } from 'ngx-smz-dialogs';

@Injectable({
  providedIn: 'root'
})
export class SmzClipboardService {

  constructor(private dialogs: SmzDialogsService) { }

  public copy(val: string, notifySuccess: boolean = false){
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

    if (notifySuccess) {
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
  }
}