import { Pipe, PipeTransform } from '@angular/core';
import { SmzContentMaskControl } from '../../models/control-types';

@Pipe({
  name: 'inputContentMaskText'
})

export class InputContentMaskTextPipe implements PipeTransform {
  transform(input: SmzContentMaskControl): any {
    return mapInputContentMaskText(input);
  }

}

export function mapInputContentMaskText(input: SmzContentMaskControl): string {
  const text = mapNewLines(input.defaultValue);
  const mapped = mapVariables(text, input.variableId, input.tagClass, input.variableBegin, input.variableEnd);
  return mapped;
}

function mapNewLines(value: string): string {
  return value.replace(/(\r\n|\n|\r)/gm, "<br>");
}

function mapVariables(value: string, variableId: string, tagClass: string, variableBegin: string, variableEnd: string): string {

  const beginTag = `<span id="${variableId}" class="smz-input-content-mask-variable ${tagClass}">`;
  const endTag = `</span>`;
  const expression = `${variableBegin}.*?${variableEnd}`;

  return value.replace(new RegExp(expression, 'g'), a => {
    return `${beginTag}${a.slice(variableBegin.length, a.length - variableEnd.length)}${endTag}`;
  });
}

export function unmapInputContentMaskText(value: string, variableId: string, tagClass: string, variableBegin: string, variableEnd: string, useHtmlNewLine: boolean): string {

  const beginTag = `<span id="${variableId}" class="smz-input-content-mask-variable ${tagClass}">`;
  const endTag = `</span>`;
  const expression = `${beginTag}.*?${endTag}`;

  const textWithVariableUnmapped = value.replace(new RegExp(expression, 'g'), a => {
    return `${variableBegin}${a.slice(beginTag.length, a.length - endTag.length)}${variableEnd}`;
  });

  if (useHtmlNewLine) {
    return textWithVariableUnmapped;
  }
  else {
    return textWithVariableUnmapped.replace(new RegExp(`<br>`, 'g'), `\n`);
  }

}