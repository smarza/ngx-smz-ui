import { Injectable, NgZone, signal, WritableSignal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { isWithinTime } from '../utils/utils';
import { GlobalInjector } from '../../../common/services/global-injector';
import { Message } from '../../smz-toast/toast';

@Injectable({providedIn: 'root'})
export class ToastService {
  public lastMessage: Message;
  public lastUpdated: Date;
  constructor(private messageService: MessageService, private zone: NgZone) {

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
    // Definir as opções de progresso
    const progressOptions = this.initializeProgressOptions(message);

    // TODO: Implementar o timeout do ProgressBar do Toast
    // Definir o timeout para finalizar a execução após o tempo de vida da mensagem
    // progressOptions.timeout = setTimeout(() => {
    //   this.finalizeMessage(progressOptions);
    // }, message.life);

    // // Iniciar o timer de progresso
    // progressOptions.progressTimer = this.startProgressTimer(progressOptions);

    // Adicionar a mensagem ao serviço de mensagens
    this.messageService.add({ ...message, ...progressOptions });
    this.registry(message);
  }

  private initializeProgressOptions(message: Message) {
    const tick = 200;
    const add = (100 * tick) / message.life;

    return {
      showProgress: true,
      progress: signal(0),
      progressTimer: null,
      timeout: null,
      add,
      tick,
    };
  }

  private startProgressTimer(progressOptions: any) {
    return setInterval(() => {
      progressOptions.progress.update((progress: number) => {
        console.log('progress', progress);
        return progress + progressOptions.add;
      });

      // Verificar se o progresso atingiu 100 e parar o timer
      if (progressOptions.progress() >= 100) {
        progressOptions.progress.set(100);
        clearInterval(progressOptions.progressTimer);
        console.log('Progress complete:', progressOptions.progress);
        this.messageService.clear(); // Limpar a mensagem quando o progresso for completo
      }
    }, progressOptions.tick);
  }

  private finalizeMessage(progressOptions: any) {
    // Função de finalização, pode incluir outras lógicas se necessário
    console.log('Message lifecycle complete.');
    this.messageService.clear();
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