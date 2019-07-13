
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SnomedAPI } from '../../services/snomed.service';
import { Router } from '@angular/router';
import { QueryFilterService } from '../../services/queryfilter.service';

@Injectable()
export class ConceptDetailService {
    private conceptSel;
    private conceptSelected = new BehaviorSubject<any>(null);
    conceptSelected$ = this.conceptSelected.asObservable();

    constructor(
        private snomed: SnomedAPI,
        private router: Router,
        private qf: QueryFilterService
    ) {
        this.qf.onChange$.subscribe(() => {
            this.snomed.history([this.conceptSel.conceptId]).subscribe(() => { });
        });
    }

    select(concept) {
        if (concept) {
            this.snomed.concept(concept.conceptId).subscribe((snomed) => {
                this.conceptSel = snomed;
                this.conceptSelected.next(snomed);
            });
            this.router.navigate([], {
                queryParams: { conceptId: concept.conceptId }, queryParamsHandling: 'merge'
            });
        }
    }

}
