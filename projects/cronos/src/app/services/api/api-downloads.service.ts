import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { DownloadPaintingPlanForEnviron } from '@models/download-environ-spreadsheets';
import { DownloadPaintingPlan } from '@models/download-painting-plan';
import { BaseApiService, handleBase64 } from '@ngx-smz/core';

@Injectable({ providedIn: 'root' })
export class ApiDownloadsService extends BaseApiService {

  constructor(private readonly http: HttpClient) {
    super();
  }

  public downloadAnnualPlanningRtiData(annualPlanningId: string, outputType: string): void {
    const headers = this.generateDefaultHeaders({}).headers;
    this.http.post(`${environment.serverUrl}/api/annual-plannings/download/rti-data`, { annualPlanningId, outputType }, {
      headers, responseType: 'blob', observe: 'response'
    }).subscribe((res: HttpResponse<Blob>) => {
      const data = {
        dataBlob: new Blob([res.body], { type: res.headers.get('Content-Type') }),
        filename: this.getFilenameFromContentDisposition(res.headers.get('content-disposition'))
      };
      handleBase64(data.dataBlob, data.filename);
    });
  }

  public downloadAnnualPlanningInspectionData(annualPlanningId: string, outputType: string): void {
    const headers = this.generateDefaultHeaders({}).headers;
    this.http.post(`${environment.serverUrl}/api/annual-plannings/download/inspection-data`, { annualPlanningId, outputType }, {
      headers, responseType: 'blob', observe: 'response'
    }).subscribe((res: HttpResponse<Blob>) => {
      const data = {
        dataBlob: new Blob([res.body], { type: res.headers.get('Content-Type') }),
        filename: this.getFilenameFromContentDisposition(res.headers.get('content-disposition'))
      };
      handleBase64(data.dataBlob, data.filename);
    });
  }

  public downloadPaintingPlan(annualPlanningId: string, systemIds: string[], selectedColumns: string[]): void {
    const headers = this.generateDefaultHeaders({}).headers;
    const payload: DownloadPaintingPlan = { annualPlanningId, systemIds, selectedColumns };
    this.http.post(`${environment.serverUrl}/api/annual-plannings/download/painting-plan`, payload, {
      headers, responseType: 'blob', observe: 'response'
    }).subscribe((res: HttpResponse<Blob>) => {
      const data = {
        dataBlob: new Blob([res.body], { type: res.headers.get('Content-Type') }),
        filename: this.getFilenameFromContentDisposition(res.headers.get('content-disposition'))
      };
      handleBase64(data.dataBlob, data.filename);
    });
  }

  public downloadPaintingPlanForEnviron(payload: DownloadPaintingPlanForEnviron): void {
    const headers = this.generateDefaultHeaders({}).headers;
    this.http.post(`${environment.serverUrl}/api/annual-plannings/download/painting-plan-environ`, payload, {
      headers, responseType: 'blob', observe: 'response'
    }).subscribe((res: HttpResponse<Blob>) => {
      const data = {
        dataBlob: new Blob([res.body], { type: res.headers.get('Content-Type') }),
        filename: this.getFilenameFromContentDisposition(res.headers.get('content-disposition'))
      };
      handleBase64(data.dataBlob, data.filename);
    });
  }

  private getFilenameFromContentDisposition(contentDisposition: string): string {
    const regex = /filename=([^,;]+);/g;
    const match = regex.exec(contentDisposition);
    return match[1];
  }
}
