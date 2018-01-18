import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AccountCardComponent } from './account-card.component';

import {
  MatCardModule,
  MatButtonModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
  ],
  bootstrap: [AccountCardComponent],
  declarations: [AccountCardComponent]
})
export class AccountCardModule { }
