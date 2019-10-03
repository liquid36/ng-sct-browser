import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SnomedAPI } from '../../services/snomed.service';
import { ConceptDetailService } from '../concept-detail/concept-detail.service';
import { Unsubscribe } from '../../decorators/Unsubscribe';
import { NavBusquedaService } from './nav-busqueda.service';
import { fromEvent, merge, BehaviorSubject } from 'rxjs';
import { map, distinctUntilChanged, debounceTime, switchMap, tap, filter, delay } from 'rxjs/operators';
import { asObject } from '../../operators';

@Component({
    selector: 'app-nav-busqueda',
    templateUrl: './nav-busqueda.component.html'
})
export class NavBusquedaComponent implements OnInit, AfterViewInit {
    public matches;
    public filters;
    public textSearch = '';

    public searchMode = new BehaviorSubject('partialMatching');
    public searchMode$ = this.searchMode.asObservable();

    public statusFilter = new BehaviorSubject('activeOnly');
    public statusFilter$ = this.statusFilter.asObservable();

    public semanticFilter = '';

    public inputChange$;

    constructor(
        private elementRef: ElementRef,
        private snomed: SnomedAPI,
        private conceptDetailService: ConceptDetailService,
        public nb: NavBusquedaService
    ) {
        this.inputChange$ = fromEvent<Event>(this.elementRef.nativeElement, 'input').pipe(
            map($event => ($event.target as HTMLInputElement).value),
            debounceTime(400),
            distinctUntilChanged(),
        );
    }

    ngOnInit() {

        merge(
            this.statusFilter$.pipe(asObject('status', (t) => t), delay(1)),
            this.searchMode$.pipe(asObject('mode', (t) => t), delay(1)),
            merge(
                this.inputChange$,
                this.nb.searchInput$.pipe(
                    tap(t => this.textSearch = t)
                )
            ).pipe(
                asObject('search', (t) => t),
            )
        ).pipe(
            tap(() => {
                this.matches = [];
                this.filters = {};
            })
        ).subscribe((v) => {
            this.nb.searchFilters.next(v);
        });

    }


    ngAfterViewInit() {

    }

    onSelect(concept) {
        this.conceptDetailService.select(concept.conceptId);
    }

    setSearchMode(mode) {
        this.searchMode.next(mode);
    }

    setStatusFilter(mode) {
        this.statusFilter.next(mode);
    }

    setSemTag(semTag) {
        this.semanticFilter = semTag;
    }
}
