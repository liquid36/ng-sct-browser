import { Component, OnInit } from '@angular/core';
import { SnomedAPI } from '../services/snomed.service';
import { ConceptDetailService } from './concept-detail/concept-detail.service';
import { Unsubscribe } from '../decorators/Unsubscribe';

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
  templateUrl: './nav-busqueda.component.html',
//   styleUrls: ['./app.component.scss']
})
export class NavBusquedaComponent implements OnInit {
    public matches;
    public filters;


    public textSearch = '';
    private searchMode = 'partialMatching';
    private statusFilter = 'activeOnly';
    private semanticFilter = '';

    constructor(private snomed: SnomedAPI, private conceptDetailService: ConceptDetailService) {}
    ngOnInit() {
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
        });
    }

    onInputChange(query: string) {
        if (query.length > 2) {
            this.textSearch = query;
            this.search();
        } else {
            this.matches = null;
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
