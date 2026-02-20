import { SmzLoader, SmzUiBuilder } from '@ngx-smz/core';
import { smzDialogsConfig } from './smz-config';
import { smzLayoutsConfig } from './smz-layouts.config';

export const UiBuilder: SmzUiBuilder = new SmzUiBuilder()
  .setApplicationName('Demos')
  .setDialogsConfigManually(smzDialogsConfig)
  .disableDiagnostics()
  .setLocale('pt-BR')
  .layouts(smzLayoutsConfig)
  .setLoader(SmzLoader.CUBE)
  .builder
  .authentication()
  .builder;
