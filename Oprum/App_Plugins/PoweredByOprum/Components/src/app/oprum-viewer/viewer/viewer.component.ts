import { Component, OnInit, OnDestroy, Inject, forwardRef, Input, OnChanges, SimpleChange } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { environment } from '../../../environments/environment';
import { SharedData } from '../../services/shared-data.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Document } from '../../domain/document';

@Component({
    selector: 'viewer',
    templateUrl: './viewer.component.html',
    styleUrls: ['./viewer.component.scss']
})

export class ViewerComponent implements OnInit, OnChanges {
    editString: string = "false";
    thumbnails = [];
    selectedDocument: Document;
    zoomSize: number = 1;

    constructor(private sharedData: SharedData) {
        this.sharedData.document$.subscribe(data => {
            this.selectedDocument = data;
        });

        this.sharedData.viewerZoomSize$.subscribe(data => {
            this.zoomSize = data;
        });
    }

    ngOnInit(): void {

    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        let log: string[] = [];
        for (let propName in changes) {
            let changedProp = changes[propName];
            let to = JSON.stringify(changedProp.currentValue);
            if (changedProp.isFirstChange()) {
                log.push(`Initial value of ${propName} set to ${to}`);
            } else {
                let from = JSON.stringify(changedProp.previousValue);
                log.push(`${propName} changed from ${from} to ${to}`);
            }
        }
        console.log("changes", log.join(', '));
    }

    isReady(): boolean {
        return true;
    }

    onThumbnailClick(pic: string) {
        this.selectedDocument.image = pic;
    }
}