import { environment } from '../../environments/environment';

// Partial<NgxRbkUtilsConfig>
export const rbkConfig: any = {
    notifications: {
        url: `${environment.serverUrl}/api/notifications`,
        updateMethod: 'interval',
        updateRate: 100000,
        httpBehavior: {
            authentication: true,
            compression: true,
            errorHandlingType: 'toast',
            loadingBehavior: 'none',
            needToRefreshToken: true
        },
        emptyMessage: 'Nenhuma notificação encontrada',
        title: 'Notificações',
        rowsPerPage: 5,
        pageOptions: [5, 10, 20],
        showTypeIndicators: true,
        showRefreshButton: true,
        width: '550px',
        styleClass: '',
        zIndex: 2000,
        date: {
            recentsMethod: 'fromNow',
            recentsDaysCount: 2,
            othersFormat: 'DD/MM/YYYY HH:mm'
        }
    },
};
