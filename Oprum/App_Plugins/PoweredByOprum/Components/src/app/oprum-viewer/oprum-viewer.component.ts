import { Component, OnInit, Output, ElementRef } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { SharedData } from '../services/shared-data.service';
import { UmbracoShimService } from '../services/umbraco-shim.service';
import { Document } from '../domain/document';

@Component({
  selector: 'oprum-viewer',
  templateUrl: './oprum-viewer.component.html',
  styleUrls: ['./oprum-viewer.component.scss'],
})

export class OprumViewerComponent implements OnInit {

  visibleInPortalField: string;
  cabinetId: string;
  groupField: string;
  subGroupField: string;
  documentNameField: string;
  documentUrl: SafeUrl;
  currentZoom: number = 1;
  selectedDocument: Document;

  constructor(private elementRef: ElementRef, private sharedData: SharedData, private pwApi: UmbracoShimService) { }

  ngOnInit() {
    this.visibleInPortalField = this.elementRef.nativeElement.getAttribute('visibleInPortalField');
    this.cabinetId = this.elementRef.nativeElement.getAttribute('cabinetId');
    this.groupField = this.elementRef.nativeElement.getAttribute('groupField');
    this.subGroupField = this.elementRef.nativeElement.getAttribute('subGroupField');
    this.documentNameField = this.elementRef.nativeElement.getAttribute('documentNameField');

    this.sharedData.document$.subscribe(data => {
      this.selectedDocument = data;
    });
  }

  onZoomInClick() {
    if (this.currentZoom < 4) {
      this.currentZoom += 0.1;
      this.sharedData.incrementZoom(this.currentZoom);
    }
  }

  onZoomOutClick() {
    if (this.currentZoom > 0.2) {
      this.currentZoom -= 0.1;
      this.sharedData.decrementZoom(this.currentZoom);
    }
  }

  onDownloadClick(url: string) {
    // alert("This feature is not implemented.");
    this.pwApi.getFile(url)
    .subscribe(fileData => {
      console.log("file data", fileData);
      var blob = fileData.blob();
      let url = window.URL.createObjectURL(blob);
      let downloadLink = document.createElement('a');
      downloadLink.style.display = 'none';
      downloadLink.href = url;
      downloadLink.download = this.selectedDocument.fileName;
      downloadLink.click();
    });
  }
}
