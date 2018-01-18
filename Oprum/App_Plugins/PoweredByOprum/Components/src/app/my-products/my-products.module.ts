import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProductsComponent } from './my-products.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

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
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  bootstrap: [MyProductsComponent],
  declarations: [MyProductsComponent]
})
export class MyProductsModule { }
