import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Document } from '../../domain/document';
import { Cabinet } from '../../domain/cabinet';
import { UmbracoShimService } from '../../services/umbraco-shim.service';
import { SharedData } from '../../services/shared-data.service';
import { OprumMember } from '../../domain/oprum-member';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatSidenavContainer,
  MatIconModule
} from '@angular/material';

@Component({
  selector: 'cabinet-list',
  templateUrl: './cabinet-list.component.html',
  styleUrls: ['./cabinet-list.component.scss']
})
export class CabinetListComponent implements OnInit {

  @Input() visibleInPortalField: string;
  @Input() cabinetId: string;
  @Input() groupField: string;
  @Input() subGroupField: string;
  @Input() documentNameField: string;

  @Output() navToggle = new EventEmitter<boolean>();

  groupList = [];
  groupDocumentList = [];
  subGroupList = [];
  subGroupDocumentList = [];
  documentList = [];
  
  displayCabinet: Cabinet;
  member: OprumMember;
  selectedDocument: Document;

  constructor(private pwApi: UmbracoShimService, private sharedData: SharedData) { }

  ngOnInit() {
    this.sharedData.document$.subscribe(data => {
      this.selectedDocument = data;
    });

    let cabinets = this.pwApi.getCabinetList(this.visibleInPortalField)
      .map((res) => {
        return res.json();
      })
      .subscribe(res => {
        let cabinet = res._embedded["urn:paperwise:rel:cabinets"].find(cab => cab.id == this.cabinetId);

        this.displayCabinet = new Cabinet();
        this.displayCabinet.id = cabinet.id;
        this.displayCabinet.displayName = cabinet.name;
        this.displayCabinet.documentsHref = cabinet._links["urn:paperwise:rel:documents"].href;
        this.displayCabinet.fieldDefinitionsHref = cabinet._links["urn:paperwise:rel:field-definitions"].href;
        this.displayCabinet.searchHref = cabinet._links["urn:paperwise:rel:search"].href;
        this.displayCabinet.uploadHref = cabinet._links["urn:paperwise:rel:upload"].href;
      });

    this.pwApi.getDocumentList(Number(this.cabinetId))
      .map((res) => {
        return res.json();
      })
      .subscribe(res => {
        // create the array of all available document objects from the JSON
        res._embedded["urn:paperwise:rel:documents"].map(d => {
          let doc = new Document();
          doc.id = d.id;
          doc.cabinetId = d.cabinetId;
          doc.displayName = d._embedded["urn:paperwise:rel:fields"].find(f => f.displayName == this.documentNameField).value;
          doc.fileName = d._embedded["urn:paperwise:rel:fields"].find(f => f.displayName == "Filename").value;
          doc.group = d._embedded["urn:paperwise:rel:fields"].find(f => f.displayName == this.groupField).value;

          if (this.subGroupField != null && this.subGroupField !== undefined && this.subGroupField != "") {
            doc.subGroup = d._embedded["urn:paperwise:rel:fields"].find(f => f.displayName == this.subGroupField).value
          }
          doc.pages = d._links["urn:paperwise:rel:pages"].href;
          doc.url = d._links["urn:paperwise:rel:file"].href;
          doc.icon = this.getIconFromFileExtension(doc.fileName);

          this.documentList.push(doc);
        });

        // create the array of groups from the document array
        res._embedded["urn:paperwise:rel:documents"].map(d => {
          let group = d._embedded["urn:paperwise:rel:fields"].find(f => f.displayName == this.groupField).value;
          if (this.groupList.indexOf(group) == -1) {
            this.groupList.push(group);
          }
        });
      });
  }

  onGroupSelected(group: string) {
    this.subGroupList = [];
    this.documentList.filter(d =>
      d.group == group
    ).map(d => {
      if (this.subGroupList.indexOf(d.subGroup) == -1) {
        this.subGroupList.push(d.subGroup);
      }

      if (this.subGroupList.length == 0) {
        this.groupDocumentList = this.documentList.filter(d => d.group == group)
      }
    });
  }

  onSubGroupSelected(group: string, subgroup: string) {
    this.subGroupDocumentList = this.documentList.filter(d => d.group == group && d.subGroup == subgroup)
  }

  onDocumentSelected(doc: Document) {
    this.selectedDocument = doc;
    this.sharedData.publishSelectedDocument(this.selectedDocument);

    this.navClose();
  }

  navClose() {
    this.navToggle.emit(true);
  }

  getIconFromFileExtension(fileName: string): string {

    let extension = fileName.substr(fileName.lastIndexOf('.'));

    switch (extension) {
      case ".pdf":
        return "file-pdf";
      case ".tif":
        return "file-image";
      case ".docx":
        return "file-word";
      case ".doc":
        return "file-word"
      case ".xls":
        return "file-excel"
      case ".xlsx":
        return "file-excel"
      case ".jpg":
        return "file-image";
      case ".png":
        return "file-image";
      default:
        return "file-document";
    }
  }
}
