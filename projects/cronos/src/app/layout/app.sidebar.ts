import { signal, WritableSignal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { INITIAL_SIDEBAR } from './static-data';

export const appSidebar: WritableSignal<MenuItem[]> = signal<MenuItem[]>(INITIAL_SIDEBAR);