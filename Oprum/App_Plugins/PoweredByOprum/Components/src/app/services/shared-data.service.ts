import { Injectable } from '@angular/core';
import { Document } from '../domain/document';
import { Subject } from 'rxjs/Subject';
import { UmbracoShimService } from './umbraco-shim.service';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SharedData {

  private document = new Subject<Document>();
  document$ = this.document.asObservable();

  private viewerZoomSize = new Subject<number>();
  viewerZoomSize$ = this.viewerZoomSize.asObservable();

  constructor(private pwApi: UmbracoShimService) {
  }

  public publishSelectedDocument(data: Document) {
    this.pwApi.getDocumentPages(data.cabinetId, data.id)
      .map((res) => {
        return res.json();
      })
      .subscribe(res => {
        data.pageCount = res.pageCount;

        data.thumbnails = [];

        for (var pageNum = 1; pageNum <= data.pageCount; pageNum++) {
          data.thumbnails.push(`${environment.umbracoShimUrl}/GetImage?url=${data.pages}/${pageNum}/image`);
        }
        
        data.image = data.thumbnails[0];
        this.document.next(data);
      });
  }

  public incrementZoom(data: number) {
      this.viewerZoomSize.next(data);
  }

  public decrementZoom(data: number) {
    this.viewerZoomSize.next(data);
  }
}
