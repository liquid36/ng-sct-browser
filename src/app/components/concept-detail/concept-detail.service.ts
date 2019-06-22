
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SnomedAPI } from '../../services/snomed.service';
import { Router } from '@angular/router';

@Injectable()
export class ConceptDetailService {

    private conceptSelected = new BehaviorSubject<any>(null);
    conceptSelected$ = this.conceptSelected.asObservable();

    constructor(private snomed: SnomedAPI, private router: Router) {

    }

    select(concept) {
        if (concept) {
            this.snomed.concept(concept.conceptId).subscribe((snomed) => {
                this.conceptSelected.next(snomed);
            });
            this.router.navigate([], {
                queryParams: { conceptId: concept.conceptId }, queryParamsHandling: 'merge'
            });
        }
    }

}
