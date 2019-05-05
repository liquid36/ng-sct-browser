import { Component, OnInit } from '@angular/core';
import { SnomedAPI } from '../../../services/snomed.service';
import { ConceptDetailService } from '../concept-detail.service';

@Component({
  selector: 'app-detail-nav',
  templateUrl: './detail-nav.component.html'
})
export class DetailNavComponent implements OnInit {
    public concept = null;
    public refSetLanguage = {
        conceptId: '231000013101',
        preferredTerm: 'conjunto de referencias de lenguaje para la extensión provincial de Neuquén (foundation metadata concept)'
    };
    constructor(private snomed: SnomedAPI, private conceptDetailService: ConceptDetailService) {}

    ngOnInit() {
        this.conceptDetailService.conceptSelected$.subscribe(concept => {
            this.concept = concept;
        });
    }

}
