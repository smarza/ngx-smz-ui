import { Injectable } from '@angular/core';
import { NgxRbkUtilsConfig } from '../../rbk-utils/ngx-rbk-utils.config';

@Injectable({providedIn: 'root'})
export class SmzNotificationsService {
  constructor(public rbkConfig: NgxRbkUtilsConfig) { }

}