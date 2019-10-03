import { Component, OnInit } from '@angular/core';
import { ConceptDetailService } from '../concept-detail.service';

@Component({
    selector: 'app-summary-nav',
    templateUrl: './summary-nav.component.html'
})
export class SummaryNavComponent {
    public conceptSelected = null;
    public conceptSelect$;

    constructor(private conceptDetailService: ConceptDetailService) {
        this.conceptSelect$ = this.conceptDetailService.conceptSelected$;
    }

}
