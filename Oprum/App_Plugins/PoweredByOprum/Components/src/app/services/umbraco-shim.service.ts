import { Injectable } from '@angular/core';
import { Http, Response, Headers, ResponseContentType } from '@angular/http';
import { environment } from '../../environments/environment';
import { ServiceBase } from './service-base.service';
import { OprumMember } from '../domain/oprum-member';
import { Observable } from 'rxjs/Rx';
import { AuthModel } from '../domain/auth-model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UmbracoShimService {

  constructor(private http: Http) {
  }

  public getCurrentUmbracoMember(): Observable<OprumMember> {
    let headers = this.getAuthHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.get(`${environment.umbracoShimUrl}/GetCurrentUmbracoMember`, { headers: headers })
      .map(res => {
        if (res.status == 204) {
          return null;
        }
        return res.json().member;
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public logout(alias: string): Observable<string> {
    let headers = this.getAuthHeaders();
    headers.append('Content-Type', 'application/json');

    let model = new AuthModel();
    model.macroAlias = alias;

    let body = JSON.stringify(model);
    let url = `${environment.umbracoShimUrl}/HandleLogout`;

    return this.http.post(url, body, { headers: headers })
      .map(res => res.json().redirectUrl)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public resetPassword(email: string): Observable<any> {
    let headers = this.getAuthHeaders();
    headers.append('Content-Type', 'application/json');

    let model = new AuthModel();
    model.username = email;

    let body = JSON.stringify(model);
    let url = `${environment.umbracoShimUrl}/HandlePasswordReset`;

    return this.http.post(url, body, { headers: headers })
      .map(res => res.json().redirectUrl)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public saveMember(model: OprumMember): Observable<any> {
    let headers = this.getAuthHeaders();
    headers.append('Content-Type', 'application/json');

    let body = JSON.stringify(model);
    let url = `${environment.umbracoShimUrl}/SaveMemberData`;

    return this.http.post(url, body, { headers: headers })
      .map(res => res.json());
  }

  public login(username: string, password: string): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let model = new AuthModel();
    model.username = username;
    model.password = password;

    let body = JSON.stringify(model);
    let url = `${environment.umbracoShimUrl}/HandleLogin`;

    return this.http.post(url, body, { headers: headers })
      .map(res => res);
  }

  getCabinetList(visibleField: string): Observable<any> {
    let headers = this.getAuthHeaders();
    headers.append('Content-Type', 'application/json');

    let url = `${environment.umbracoShimUrl}GetCabinetList`;

    return this.http.get(url, { headers: headers })
  }

  getDocumentList(cabId: number): Observable<any> {
    let headers = this.getAuthHeaders();
    headers.append('Content-Type', 'application/json');
    let url = `${environment.umbracoShimUrl}GetDocumentList/${cabId}`;
    return this.http.get(url, { headers: headers })
  }

  getDocumentPages(cabId: number, docId: number): Observable<any> {
    let headers = this.getAuthHeaders();
    headers.append('Content-Type', 'application/json');
    let url = `${environment.umbracoShimUrl}GetDocumentPages?cabId=${cabId}&docId=${docId}`;
    return this.http.get(url, { headers: headers })
  }

  getFile(docUrl: string): Observable<Response> {
    let headers = this.getAuthHeaders();
    headers.append('Content-Type', 'application/json');
    
    let url = `${environment.umbracoShimUrl}GetFile?url=${docUrl}`;
    return this.http.get(url, { headers: headers, responseType: ResponseContentType.ArrayBuffer });
  }

  protected getAuthHeaders(): Headers {
    // let authToken = this.getAuthToken();
    let headers = new Headers();
    headers.append("Pragma", "no-cache");
    headers.append("Expires", "-1");
    headers.append("Cache-Control", "no-cache");
    //   headers.append("Authorization", `Bearer ${authToken}`);
    headers.append("Accept", "application/json");
    return headers;
  }

}

