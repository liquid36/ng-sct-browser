import { Component, OnInit } from '@angular/core';
import { ConceptDetailService } from '../concept-detail.service';

@Component({
    selector: 'app-detail-nav',
    templateUrl: './detail-nav.component.html'
})
export class DetailNavComponent {
    public concept = null;
    public refSetLanguage = {
        conceptId: '231000013101',
        preferredTerm: 'conjunto de referencias de lenguaje para la extensión provincial de Neuquén (foundation metadata concept)'
    };
    public conceptSelect$;

    constructor(private conceptDetailService: ConceptDetailService) {
        this.conceptSelect$ = this.conceptDetailService.conceptSelected$;
    }

}
