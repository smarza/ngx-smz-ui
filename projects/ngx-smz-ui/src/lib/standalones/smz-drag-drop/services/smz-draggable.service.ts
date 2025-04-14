import { Injectable } from '@angular/core';
import { SmzDragEvent } from '../models/drag-event';

@Injectable({providedIn: 'root'})
export class SmzDraggableService {
  public current: SmzDragEvent = null;
  constructor() { }

}