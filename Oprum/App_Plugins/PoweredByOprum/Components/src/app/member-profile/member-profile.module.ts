import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MemberProfileComponent } from './member-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatCardModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatExpansionModule,
  MatInputModule,
  MatIconModule,
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatInputModule,
    MatExpansionModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  bootstrap: [MemberProfileComponent],
  declarations: [MemberProfileComponent]
})
export class MemberProfileModule { }
