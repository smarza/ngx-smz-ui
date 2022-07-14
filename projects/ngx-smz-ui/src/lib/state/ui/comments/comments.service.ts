import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from '../../../modules/rbk-utils/http/base-api.service';
import { Observable } from 'rxjs';
import { TreeNode } from 'primeng/api';
import { SmzCommentsDetails } from '../../../modules/smz-comments/models/comments-details';
import { CreateComment } from '../../../modules/smz-comments/models/create-comment';
import { environment } from '@environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CommentsService extends BaseApiService
{
    private endpoint = `${environment.serverUrl}/api/comments`;

    constructor(private http: HttpClient)
    {
        super();
    }

    public all(id: string, loaderOverride: boolean = false): Observable<TreeNode<SmzCommentsDetails>[]>
    {
        return this.http.get<TreeNode<SmzCommentsDetails>[]>(`${this.endpoint}/${id}`,
            this.generateDefaultHeaders({ compression: true, loadingBehavior: loaderOverride ? 'none' : 'global', authentication: true }));
    }

    public create(creation: CreateComment, loaderOverride: false = false): Observable<TreeNode<SmzCommentsDetails>[]>
    {
        return this.http.post<TreeNode<SmzCommentsDetails>[]>(`${this.endpoint}`, creation,
            this.generateDefaultHeaders({ compression: false, loadingBehavior: loaderOverride ? 'none' : 'global', authentication: true }));
    }

}
