import { Component, Input, OnInit } from '@angular/core';
import { SnomedAPI } from '../../services/snomed.service';
import { QueryFilterService } from '../../services/queryfilter.service';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'app-time-filter',
    templateUrl: './time-filter-form.component.html'
})
export class TimeFilterFormComponent {

    constructor(
        private snomed: SnomedAPI,
        public qf: QueryFilterService
    ) {

    }
    searching = false;
    searchFailed = false;

    onStartDate(event) {
        const date = new Date(event.year, event.month - 1, event.day);
        this.qf.start = date;
    }

    onEndDate(event) {
        const date = new Date(event.year, event.month - 1, event.day);
        this.qf.end = date;
    }

    formatter = (x) => x.nombre;
    search = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            tap(() => this.searching = true),
            switchMap(term =>
                this.snomed.organizaciones(term).pipe(
                    tap(() => this.searchFailed = false),
                    catchError(() => {
                        this.searchFailed = true;
                        return of([]);
                    }))
            ),
            tap(() => this.searching = false)
        )

    onOrgSelect($event) {
        this.qf.organizacion = $event.item;
    }


}
