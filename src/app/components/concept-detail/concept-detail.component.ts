import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-concept-detail',
    templateUrl: './concept-detail.component.html',
})
export class ConceptDetailComponent implements OnInit, AfterViewInit {

    @ViewChild('t') tabSet;

    constructor() { }

    ngOnInit() {
    }

    ngAfterViewInit() {

    }

}
