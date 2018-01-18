import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AuthModel } from '../domain/auth-model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export class ServiceBase {
  protected tokenName: string = 'morales_token_id';

  constructor() {
  }

  protected getAuthHeaders(): Headers {
      let authToken = this.getAuthToken();
      let headers = new Headers();
      
      headers.append("Pragma", "no-cache");
      headers.append("Expires", "-1");
      headers.append("Cache-Control", "no-cache");
      headers.append("Authorization", `Bearer ${authToken}`);
      headers.append("Accept", "application/json");

      return headers;
  }

  protected getAuthToken() : string | null {
      let token = <any>JSON.parse(localStorage.getItem(this.tokenName));
      return token != null ? token.access_token : null;
  }

  public getUserName() : string {
      let token = <any>JSON.parse(localStorage.getItem(this.tokenName));
      return token != null ? token.userName : "";
  }

  public verifyAuthToken(): void {
      if(this.getAuthToken() == null) {
          //this.router.navigateByUrl('/login');
      }
  }

  public encodeQueryData(data) {
      let params = [];
      for(let p in data) {
          let val = data[p];
          if(val == null || val === undefined) {
              continue;
          }
          params.push(`${encodeURIComponent(p)}=${encodeURIComponent(data[p])}`);
      }
      return params.join('&');
  }
}
