import { Injectable } from '@angular/core';
import { Message } from 'primeng/api/message';
import { MessageService } from 'primeng/api/messageservice';
import { BehaviorSubject } from 'rxjs';
import { debounceDistinct } from '../../../common/utils/debounce-distinct.operator';

@Injectable({providedIn: 'root'})
export class ToastService {
  public messages$: BehaviorSubject<Message> = new BehaviorSubject<Message>(null);
  constructor(private messageService: MessageService) {
    this.watch();
  }

  public add(message: Message): void {
    this.messages$.next(message);

  }

  private watch(): void {
    this.messages$
      .pipe(debounceDistinct<Message>(51))
      .subscribe(message => {
        this.messageService.add(message);
        console.log(message);
      });
  }

}