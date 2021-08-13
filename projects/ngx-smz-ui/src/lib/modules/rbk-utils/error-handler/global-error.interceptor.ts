import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { DiagnosticsService } from './diagnostic.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Store } from '@ngxs/store';
import { ApplicationSelectors } from '../state/global/application/application.selector';
import { AuthenticationSelectors } from '../state/global/authentication/authentication.selectors';
import { NgxRbkUtilsConfig } from '../ngx-rbk-utils.config';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {
  }
  public handleError(error): void {
    const config = this.injector.get(NgxRbkUtilsConfig);

    console.log('ERROR INTERCEPTOR', error);

    if (config.diagnostics.url != null && error.status != 400) {
        const loggingService = this.injector.get(DiagnosticsService);
        const deviceService = this.injector.get(DeviceDetectorService);
        const store = this.injector.get(Store);
        const location = this.injector.get(LocationStrategy);
        const message = error.message ? error.message : error.toString();
        const url = location instanceof PathLocationStrategy ? location.path() : '';

        const logdata = store.selectSnapshot(ApplicationSelectors.logInfo);

        let device = 'Unknown';
        if (deviceService.isDesktop()) {
          device = 'Desktop';
        }
        else if (deviceService.isMobile()) {
          device = 'Mobile';
        }
        else if (deviceService.isTablet()) {
          device = 'Tablet';
        }

        loggingService.log({
          applicationArea: logdata.applicationArea,
          applicationLayer: logdata.applicationLayer,
          applicationVersion: logdata.applicationVersion,
          clientBrowser: deviceService.browser + ' ' + deviceService.browser_version,
          clientDevice: device,
          clientOperatingSystem: deviceService.os,
          clientOperatingSystemVersion: deviceService.os_version,
          clientUserAgent: deviceService.userAgent,
          databaseExceptions: '',
          domain: (store.selectSnapshot(AuthenticationSelectors.userdata) as any)?.domain,
          exceptionMessage: message,
          exceptionSource: 'Angular Error Handler',
          inputData: '',
          stackTrace: error.stack,
          extraData: logdata.extraData,
          username: store.selectSnapshot(AuthenticationSelectors.username)
        }).subscribe();
    }
    console.error('Error caught by Global Error Interceptor: ', error);

    throw error
  }
}