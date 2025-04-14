import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from '../../../modules/rbk-utils/http/base-api.service';
import { Observable } from 'rxjs';
import { TreeNode } from 'primeng/api';
import { SmzCommentsDetails } from '../../../modules/smz-comments/models/comments-details';
import { CreateComment } from '../../../modules/smz-comments/models/create-comment';
import { SmzEnvironment } from '../../../config';

@Injectable({
    providedIn: 'root'
})
export class CommentsService extends BaseApiService
{
    private readonly environment = inject(SmzEnvironment);
    private endpoint = `/api/comments`;

    constructor(private http: HttpClient)
    {
        super();
    }

    private getEndpoint(): string {
        return `${this.environment.serverUrl}/${this.endpoint}`;
    }

    public all(id: string, loaderOverride: boolean = false): Observable<TreeNode<SmzCommentsDetails>[]>
    {
        return this.http.get<TreeNode<SmzCommentsDetails>[]>(`${this.getEndpoint()}/${id}`,
            this.generateDefaultHeaders({ compression: true, loadingBehavior: loaderOverride ? 'none' : 'global', authentication: true }));
    }

    public create(creation: CreateComment, loaderOverride: false = false): Observable<TreeNode<SmzCommentsDetails>[]>
    {
        return this.http.post<TreeNode<SmzCommentsDetails>[]>(`${this.getEndpoint()}`, creation,
            this.generateDefaultHeaders({ compression: false, loadingBehavior: loaderOverride ? 'none' : 'global', authentication: true }));
    }

}
