import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@Pipe({
    name: 'isVisible',
    standalone: false
})

@Injectable()
export class IsVisiblePipe implements PipeTransform
{
    constructor()
    {

    }
    public transform(items: MenuItem[]): MenuItem[]
    {
        if (items == null || items.length === 0) return [];

        return items.filter(x => x.visible !== false);
    }

}

@NgModule({
    imports: [
      CommonModule
    ],
    declarations: [IsVisiblePipe],
    exports: [IsVisiblePipe],
  })
  export class IsVisiblePipeModule { }