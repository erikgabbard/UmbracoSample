import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginCardComponent, ResetPwdDialogComponent } from './login-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatToolbarModule,
  MatIconModule,
  MatDialogModule,
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [LoginCardComponent],
  declarations: [LoginCardComponent, ResetPwdDialogComponent],
  entryComponents: [ResetPwdDialogComponent]
})
export class LoginCardModule { }
