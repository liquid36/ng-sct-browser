import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { SnomedAPI } from '../../services/snomed.service';
import { ConceptDetailService } from './concept-detail.service';

@Component({
    selector: 'app-concept-detail',
    templateUrl: './concept-detail.component.html',
    //   styleUrls: ['./app.component.scss']
})
export class ConceptDetailComponent implements OnInit, AfterViewInit {

    @ViewChild('t') tabSet;

    constructor(private snomed: SnomedAPI, private conceptDetailService: ConceptDetailService) { }

    ngOnInit() {
        // this.conceptDetailService.conceptSelected$.subscribe(concept => {
        // });
    }

    ngAfterViewInit() {

    }

}
