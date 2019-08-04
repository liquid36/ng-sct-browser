import { Component, OnInit } from '@angular/core';
import { SnomedAPI } from '../../services/snomed.service';
import { ConceptDetailService } from '../concept-detail/concept-detail.service';
import { Unsubscribe } from '../../decorators/Unsubscribe';
import { NavBusquedaService } from './nav-busqueda.service';

enum SearchMode {
    fullText,
    partialMatching,
    regex
}

enum StausFilter {
    activeOnly,
    inactiveOnly,
    activeAndInactive
}

@Component({
    selector: 'app-nav-busqueda',
    templateUrl: './nav-busqueda.component.html'
})
export class NavBusquedaComponent implements OnInit {
    public matches;
    public filters;


    public textSearch = '';
    public lastSearch = '';
    private searchMode = 'partialMatching';
    private statusFilter = 'activeOnly';
    private semanticFilter = '';

    constructor(
        private snomed: SnomedAPI,
        private conceptDetailService: ConceptDetailService,
        private nb: NavBusquedaService
    ) { }

    ngOnInit() {
        this.nb.searchInput$.subscribe(text => {
            this.textSearch = text;
            this.onInputChange(text || '');
        });
    }

    onSelect(concept) {
        this.conceptDetailService.select(concept);
    }

    @Unsubscribe()
    search() {
        const params: any = {
            query: this.textSearch,
            limit: 20,
            searchMode: this.searchMode,
            lang: 'english',
            statusFilter: this.statusFilter,
            skipTo: 0,
            returnLimit: 50,
            normalize: true
        };
        if (this.semanticFilter.length > 0) {
            params.semanticFilter = this.semanticFilter;
        }

        return this.snomed.descriptions(params).subscribe((result) => {
            this.matches = result.matches;
            this.filters = result.filters;
            this.snomed.history(this.matches.map(c => c.conceptId)).subscribe(() => { });
        });
    }

    onInputChange(query: string) {
        if (this.lastSearch !== query) {
            if (query.length > 2) {
                this.lastSearch = query;
                this.nb.search = query;
                this.search();
            } else {
                this.matches = null;
            }
        }
    }

    setSearchMode(mode) {
        this.searchMode = mode;
        this.search();
    }

    setStatusFilter(mode) {
        this.statusFilter = mode;
        this.search();
    }

    setSemTag(semTag) {
        this.semanticFilter = semTag;
        this.search();
    }
}
