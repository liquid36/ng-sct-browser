import { Component, OnInit } from '@angular/core';
import { ConceptDetailService } from '../concept-detail.service';

@Component({
  selector: 'app-graph-nav',
  templateUrl: './graph-nav.component.html',
  styleUrls: ['./graph-nav.component.scss']
})
export class GraphNavComponent implements OnInit {
    public concept: any;

    constructor(private conceptDetailService: ConceptDetailService) {}
    ngOnInit() {
        this.conceptDetailService.conceptSelected$.subscribe(concept => {
            this.concept = concept;
        });
    }

}
