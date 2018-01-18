import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CabinetListComponent } from './cabinet-list/cabinet-list.component';
import { ViewerComponent } from './viewer/viewer.component';
import { OprumViewerComponent } from './oprum-viewer.component';
import { UmbracoShimService } from '../services/umbraco-shim.service';
import { SharedData } from '../services/shared-data.service';
import { environment } from '../../environments/environment';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatExpansionModule,
  MatIconModule,
  MatListModule,
  MatRippleModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatIconRegistry,
  MatToolbarModule,
  MatProgressSpinnerModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatRippleModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    FlexLayoutModule
  ],
  declarations: [
    CabinetListComponent, 
    ViewerComponent, 
    OprumViewerComponent
  ],
  providers: [ UmbracoShimService, SharedData ],
  bootstrap: [ OprumViewerComponent ],
})
export class OprumViewerModule { 
  constructor(MatIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    MatIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl(`${environment.iconUri}`));
  }
}
