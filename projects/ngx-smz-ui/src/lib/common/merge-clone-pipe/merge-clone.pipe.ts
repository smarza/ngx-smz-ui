import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { mergeClone } from '../utils/deep-merge';

@Pipe({
    name: 'mergeClone'
})

@Injectable()
export class MergeClonePipe implements PipeTransform
{
    constructor()
    {

    }
    public transform(data: any, defaultData: any): any
    {
        if (data == null) return data;

        return mergeClone(defaultData, data);
    }

}

@NgModule({
    imports: [
      CommonModule
    ],
    declarations: [MergeClonePipe],
    exports: [MergeClonePipe],
  })
  export class MergeClonePipeModule { }