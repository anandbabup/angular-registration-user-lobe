import { HttpClient } from '@angular/common/http';
import { SelectorFlags } from '@angular/compiler/src/core';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { config } from 'rxjs';
import * as data from '../../asset/data.json';

@Component({
    selector: 'file-upload',
    template: `
      <div>
        <div *ngIf="!predictedLabel">
        <input type="file" (change)="onChange($event.target.files)"  accept="image/png, image/jpeg"> 
        </div>       
        <div *ngIf="predictedLabel">
         File Name:{{fileName}}
         <img src={{fileContent}} alt="Image" style="    max-height: 304px;
         max-width: 542px;"/>
         <button (click)="reset()" style="float:right">Reset</button>
         <label-details label={{predictedLabel}}></label-details>
         </div>
      </div>
    `,
})
export class UploadComponent implements OnInit {
    fileContent: any;
    predictedLabel: string;
    fileType: string;
    config: any = (data as any).default;
    baseURL: string = '';
    refresh: boolean = true;
    fileName: string;

    constructor(private http: HttpClient) { }

    public onChange(fileList: FileList): void {
        let file = fileList[0];
        let fileReader: FileReader = new FileReader();
        let self = this;
        fileReader.onloadend = function (x) {
            self.fileContent = fileReader.result;
            self.callLobe(self.fileContent);
        }
        fileReader.readAsDataURL(file);
        this.fileType = file.type;
        this.fileName = file.name;
    }

    public callLobe(base64String) {
        //trim base64 front part
        var trimString = `data:${this.fileType};base64,`;
        base64String = base64String.replace(trimString, "");
        var inputs = {
            "inputs": {
                "Image": base64String
            }
        }
        this.http.post<any>(this.baseURL, inputs).subscribe(data => {
            console.log(data);
            this.predictedLabel = data.outputs.Prediction[0];
        })

    }

    public reset() {
        this.predictedLabel = "";
        this.fileContent = "";
        this.refresh = false;
        this.refresh = true;
    }

    ngOnInit() {
        this.baseURL = this.config.apiUrl;
    }


}