
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, merge } from 'rxjs';
import { Router } from '@angular/router';
import { mergeObject, distincObject } from 'src/app/operators';
import { SnomedAPI } from 'src/app/services/snomed.service';
import { switchMap, pluck, tap, filter } from 'rxjs/operators';

@Injectable()
export class NavBusquedaService {
    constructor(
        private router: Router,
        private snomed: SnomedAPI
    ) {
        const searchPipe = this.searchFilters$.pipe(
            mergeObject(),
            distincObject(),
            tap(params => {
                this.router.navigate([], {
                    queryParams: params, queryParamsHandling: 'merge'
                });
            }),
            filter((params: any) => params.mode && params.search && params.status),
            switchMap((params) => {
                return this.doSearch(params);
            })
        );

        this.searchResult$ = searchPipe.pipe(
            pluck('matches')
        );

        this.filterResult$ = searchPipe.pipe(
            pluck('filters')
        );

    }

    set search(value) {
        // if (this.searchInput.getValue() === value) { return; }
        this.searchInput.next(value);
        // this.router.navigate([], {
        //     queryParams: { search: value }, queryParamsHandling: 'merge'
        // });
    }

    get search() {
        return this.searchInput.getValue();
    }

    public searchResult$;
    public filterResult$;

    public searchFilters = new BehaviorSubject<any>({ mode: 'partialMatching', status: 'activeOnly' });
    public searchFilters$ = this.searchFilters.asObservable();

    public searchInput = new BehaviorSubject(null);
    public searchInput$ = this.searchInput.asObservable();

    public doSearch(query) {
        const params: any = {
            query: query.search,
            limit: 20,
            searchMode: query.mode,
            lang: 'english',
            statusFilter: query.status,
            skipTo: 0,
            returnLimit: 50,
            normalize: true
        };
        if (query.semantic && query.semantic.length > 0) {
            params.semanticFilter = query.semantic;
        }
        return this.snomed.descriptions(params);
    }

}
