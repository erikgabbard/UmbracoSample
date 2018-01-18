import { Component, OnInit, Input, Inject, InjectionToken, ElementRef } from '@angular/core';
import { environment } from '../../environments/environment';
import { UmbracoShimService } from '../services/umbraco-shim.service';
import { OprumMember } from '../domain/oprum-member';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'account-card',
  inputs: ['member'],
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss'],
  providers: [
    UmbracoShimService
  ],
})
export class AccountCardComponent implements OnInit {

  defaultImagePath: string = `${environment.accountCardComponentPath}/assets/img/userprofile.png`;
  member: OprumMember;
  profileUrl: string;
  loginUrl: string;

  constructor(private umbracoService: UmbracoShimService, private elementRef: ElementRef) {
    this.member = JSON.parse(this.elementRef.nativeElement.getAttribute('member'));
    this.profileUrl = this.elementRef.nativeElement.getAttribute('profileUrl');
    this.loginUrl = this.elementRef.nativeElement.getAttribute('loginUrl');
    
    if(this.member != null) {
      this.member.Avatar = this.defaultImagePath;
    }
  }

  navigate(url: string) {
    window.location.href = url;
  }

  logout() {
    this.umbracoService.logout("oprumAccountCard")
      .map((url) => {
        return url;
      })
      .subscribe(url => {
        this.navigate(url);
      });
  }

  ngOnInit() {
  }

}
