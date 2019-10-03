
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SnomedAPI } from '../../services/snomed.service';
import { Router } from '@angular/router';
import { distinctUntilChanged, switchMap, filter, tap } from 'rxjs/operators';
import { cache } from '../../operators';

@Injectable()
export class ConceptDetailService {
    private conceptSelected = new BehaviorSubject<any>(null);
    conceptSelected$;

    constructor(
        private snomed: SnomedAPI,
        private router: Router
    ) {
        this.conceptSelected$ = this.conceptSelected.asObservable().pipe(
            distinctUntilChanged(),
            tap((sctid) => {
                this.router.navigate([], {
                    queryParams: { conceptId: sctid }, queryParamsHandling: 'merge'
                });
            }),
            filter(value => !!value),
            switchMap((sctid) => {
                return this.snomed.concept(sctid);
            }),
            cache()
        );
    }

    select(concept) {
        this.conceptSelected.next(concept);
    }

}
