import { Injectable } from '@angular/core';
import { Message } from 'primeng/api/message';
import { MessageService } from 'primeng/api';
import { isWithinTime } from '../utils/utils';
import { GlobalInjector } from '../../../common/services/global-injector';

@Injectable({providedIn: 'root'})
export class ToastService {
  public lastMessage: Message;
  public lastUpdated: Date;
  constructor(private messageService: MessageService) {

    if (GlobalInjector.config.rbkUtils.toastConfig == null || GlobalInjector.config.rbkUtils.toastConfig.debounceDistinctDelay == null) {
      throw Error('You need to set the \'debounceDistinctDelay\' at rbkconfig.rbkUtils.toastConfig.');
    }

  }

  public add(message: Message): void {
    if (GlobalInjector.config.rbkUtils.toastConfig.debounceDistinctDelay != null) {
      // Delay ativado

      // Verificar se a mensagem atual é a mesma da anterior
      if (this.lastMessage?.detail === message.detail) {
        const cacheTime = (GlobalInjector.config.rbkUtils.toastConfig?.debounceDistinctDelay ?? 0) / 1000 / 60;

        // Verificar se não existe uma mensagem anterior ou se a mesma já pode ser emitida
        if (this.lastUpdated == null || !isWithinTime(this.lastUpdated, cacheTime))
        {
          // Mensagem pode ser mostrada
          this.send(message);
        }
        else {
          // Suprimir mensagem mas registrar no cache
          this.registry(message);
        }
      }
      else {
        // Mensagem diferente da anterior
        this.send(message);
      }

    }
    else {
      // Delay desativado
      this.send(message);
    }
  }

  private send(message: Message): void {
    this.messageService.add(message);
    this.registry(message);
  }

  private registry(message: Message): void {
    this.lastUpdated = new Date();
    this.lastMessage = message;
  }

  private test(): void {
    const messages = [
      { severity: 'error', detail: 'message' },
      { severity: 'error', detail: 'message' },
      { severity: 'error', detail: 'message' },
      { severity: 'error', detail: 'other' },
      { severity: 'error', detail: 'message' },
      { severity: 'error', detail: 'message' },
    ]

    let index = 0;
    const timer = setInterval(() => {

      if (index === messages.length - 1) {
        clearInterval(timer);
      }

      this.add(messages[index]);
      index ++;

    }, 900);
  }

}