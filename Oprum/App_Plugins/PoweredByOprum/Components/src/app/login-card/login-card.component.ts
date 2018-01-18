import { NgModule, Component, Inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UmbracoShimService } from '../services/umbraco-shim.service';
import { AuthModel } from '../domain/auth-model';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss'],
  providers: [UmbracoShimService]
})

export class LoginCardComponent {

  loginForm: FormGroup;
  user: AuthModel = new AuthModel();

  constructor(
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private umbracoService: UmbracoShimService) {

    this.loginForm = formBuilder.group({
      'username': [null, Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEX)])],
      'password': [null, Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.umbracoService.login(this.user.username, this.user.password)
        .map(res => {
          if (res.redirectUrl == null || res.redirectUrl === undefined) {
            return "/";
          }
          return res.redirectUrl;
        })
        .subscribe(
          url => {
          if (url != null || url !== undefined || url == "") {
            window.location.href = "/";
          }
          
          window.location.href = url;
        },
        err => {
          if (err.status == 401) {
            alert("Username or password invalid.");
          } else {
            console.log("ERROR", err);
          }
        }
      );
    }
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(ResetPwdDialogComponent, {
      width: '350px',
      data: { emailAddress: this.user.username }
    });

    dialogRef.afterClosed().subscribe(resetResult => {
      if (resetResult) {
        this.umbracoService.resetPassword(dialogRef.componentInstance.emailAddress)
          .map(res => {
            return res.redirectUrl;
          })
      }
    });
  }
}

@Component({
  selector: 'reset-pwd-dialog',
  templateUrl: './reset-pwd-dialog.component.html',
  styleUrls: ['./login-card.component.scss']
})
export class ResetPwdDialogComponent {

  emailAddress: string = "";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
}