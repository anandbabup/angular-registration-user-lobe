import { HttpClient } from '@angular/common/http';
import { SelectorFlags } from '@angular/compiler/src/core';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { config } from 'rxjs';
import * as persons from '../../asset/person.json';

@Component({
    selector: 'label-details',
    template: `
      <div style="margin-top:50px">
      <h4>
        Details of Prediction:</h4>
        <div *ngFor="let item of predictedPerson | keyvalue">
            <b>{{item.key}}</b> : {{item.value}}
        </div>
      </div>
    `,
    styles:[`
        h4 {
            background: #343a40!important;
            color: white;
        }
    `]
})
export class DetailsComponent implements OnInit {
    @Input() label: any;
    persons: any = (persons as any).default;
    predictedPerson: any;

    ngOnInit() {
        console.log("label is", this.label);
        console.log("Person", this.persons);
        var self = this;
        this.predictedPerson = this.persons.find(element => element.Name == self.label);
    }
}