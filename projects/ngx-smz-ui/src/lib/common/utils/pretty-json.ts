import { Pipe, PipeTransform } from '@angular/core';
import { NgModule } from '@angular/core';

@Pipe({
    name: 'prettyJson',
    standalone: false
})
export class PrettyJsonPipe implements PipeTransform {
  public transform(val: string): string {
    return JSON.stringify(val, null, 2)
      .replace(' ', '&nbsp;')
      .replace('\n', '<br/>');
  }
}

@NgModule({
  imports: [],
  exports: [],
  declarations: [PrettyJsonPipe],
  providers: [],
})
export class PrettyJsonPipeModule { }
