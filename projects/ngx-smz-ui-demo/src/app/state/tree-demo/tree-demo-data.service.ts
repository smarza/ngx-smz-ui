import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment';
import { map, of } from 'rxjs';
import { TreeNode } from 'primeng/api/treenode';
import { BaseApiService } from 'ngx-smz-ui';

@Injectable({ providedIn: 'root' })
export class TreeDemoDataService extends BaseApiService {
  private endpoint = `${environment.serverUrl}/api/demo`;

  constructor(private http: HttpClient) {
    super();
  }

  public getTree(): Observable<TreeNode[]> {
    return this.http.get<{data: TreeNode[]}>('assets/files.json').pipe(map(x => x.data));
  }

}
