import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SmzDialogBuilder } from '../../../builders/smz-dialogs/dialog-builder';
import { SmzDialogsService } from './smz-dialogs.service';

@Injectable({
  providedIn: 'root',
})
export class SmzHelpDialogService {

  constructor(private http: HttpClient, private dialogs: SmzDialogsService) { }

  public showHelpByName(name: string): void{
    this.http.get(`assets/help/${name}/index.html`, { responseType: 'text'}).subscribe(data => {
      this.dialogs.open(new SmzDialogBuilder()
      .setTitle('Ajuda')
      .allowMaximize()
      .html([data])
      .setLayout('EXTRA_SMALL', 'col-12')
      .setLayout('EXTRA_LARGE', 'col-6')
      .hideFooter()
      .build());
    });
  }
}