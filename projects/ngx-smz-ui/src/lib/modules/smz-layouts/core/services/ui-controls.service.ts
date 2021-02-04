import { Injectable } from '@angular/core';
import { SmzLayoutsConfig } from '../../globals/smz-layouts.config';

@Injectable({
  providedIn: 'root'
})
export class UiControlsService
{

  constructor(private readonly config: SmzLayoutsConfig)
  {

  }

}
