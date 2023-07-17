import { CommonModule } from '@angular/common';
import { Pipe, PipeTransform, NgModule } from '@angular/core';
import { SmzTemplate, SmzBreakpoints } from '../models/templates';

@Pipe({
    name: 'setTemplateClasses',
})
export class SetTemplateClassesPipe implements PipeTransform {

    public transform(template: SmzTemplate, properties: string[], append: string[] = []): string {
        const stylesToAppend = append == null ? '' : append.filter(x => x != null).join(' ');
        return `${SetTemplateClasses(template, properties)} ${stylesToAppend}`;
    }
}

@NgModule({
    imports: [CommonModule],
    declarations: [SetTemplateClassesPipe],
    exports: [SetTemplateClassesPipe],
})
export class SmzTemplatesPipeModule { }


export function SetTemplateClasses(template: SmzTemplate, properties: string[]): string {
    let response = '';

    if (template == null) return response;

    for (let tag of Object.keys(template)) {
        const prefix = `${SmzBreakpoints.Tags[tag]}col-`;

        for (let property of properties) {
            if (template[tag][property] != null) {
                const position = SmzBreakpoints.ReplacePositions[property];
                const value: string = template[tag][property];

                const columns = value.slice(position, value.length);

                const primeTag = SmzBreakpoints.ResponsivePrimeTag[property];
                const responsivePrimeTag = prefix.length === 0 ? primeTag.emptyTag : primeTag.withTag;

                // console.log('results', ` ${responsivePrimeTag}${prefix}${columns}`);
                response += ` ${responsivePrimeTag}${prefix}${columns}`
            };
        }

    }

    return response;
}