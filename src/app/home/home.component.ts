import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService, AuthenticationService } from '../_services';

@Component({
    templateUrl: 'home.component.html', 
    styles: [`
            h4 {
                background: #343a40!important;
                color: white;
            }
            `]
})
export class HomeComponent implements OnInit {

    constructor(
    ) {

    }

    ngOnInit() {

    }


}