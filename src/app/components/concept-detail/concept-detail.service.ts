
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ConceptDetailService {

    private conceptSelected = new BehaviorSubject<any>(null);
    conceptSelected$ = this.conceptSelected.asObservable();

    constructor() {

    }

    select(concept) {
        this.conceptSelected.next(concept);
    }

}
