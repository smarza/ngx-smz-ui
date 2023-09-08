import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from '../http/base-api.service';
import { Observable, Subject, Subscription, switchMap, throttleTime } from 'rxjs';
import { DiagnosticsData } from './diagnostics-data';
import { GlobalInjector } from '../../../common/services/global-injector';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Store } from '@ngxs/store';
import { LocationStrategy } from '@angular/common';
import { ApplicationSelectors } from '../../../state/global/application/application.selector';
import { AuthenticationSelectors } from '../../../state/global/authentication/authentication.selectors';
import { ToastActions } from '../../../state/global/application/application.actions.toast';

@Injectable({ providedIn: 'root' })
export class DiagnosticsService extends BaseApiService {

    private logSubject = new Subject<DiagnosticsData>();
    private logSubscription: Subscription;

    public username;

    constructor(private http: HttpClient, private store: Store) {
        super();

        const config = GlobalInjector.config;

        this.logSubscription = this.logSubject.pipe(
            throttleTime(config.rbkUtils.diagnostics.throttleTime),  // 5 segundos, ajuste conforme necessário
            switchMap(data => this.actualLogCall(data))
        ).subscribe(() => {
          this.store.dispatch(new ToastActions.Error('O relatório do erro foi enviado ao servidor.', 'Occorreu um erro não tratado.'))
        });
    }

    public log(data: DiagnosticsData): void {
        this.logSubject.next(data);
    }

    private actualLogCall(data: DiagnosticsData): Observable<void> {
        return this.http.post<void>(GlobalInjector.config.rbkUtils.diagnostics.url, data,
            this.generateDefaultHeaders({
                loadingBehavior: 'none',
                authentication: false,
                errorHandlingType: 'none'
            }));
    }

    public generateDiagnosticsData(): DiagnosticsData {
        const deviceService = GlobalInjector.instance.get(DeviceDetectorService);
        const store = GlobalInjector.instance.get(Store);
        const location = GlobalInjector.instance.get(LocationStrategy);

        // const url = location instanceof PathLocationStrategy ? location.path() : '';

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

        const log: DiagnosticsData = {
          applicationArea: logdata.applicationArea,
          applicationLayer: logdata.applicationLayer,
          applicationVersion: logdata.applicationVersion,
          clientBrowser: deviceService.browser + ' ' + deviceService.browser_version,
          clientDevice: device,
          clientOperatingSystem: deviceService.os,
          clientOperatingSystemVersion: deviceService.os_version,
          clientUserAgent: deviceService.userAgent,
          databaseExceptions: '',
          tenant: (store.selectSnapshot(AuthenticationSelectors.userdata) as any)?.tenant,
          exceptionMessage: '',
          exceptionSource: 'Angular Error Handler',
          inputData: '',
          stackTrace: '',
          extraData: logdata.extraData,
          username: store.selectSnapshot(AuthenticationSelectors.username) ?? this.username
        };

        this.username = null;

        return log;

    }
}