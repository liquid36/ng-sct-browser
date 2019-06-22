
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class NavBusquedaService {
    constructor(private router: Router) { }

    public searchInput = new BehaviorSubject(null);
    public searchInput$ = this.searchInput.asObservable();

    set search(value) {
        if (this.searchInput.getValue() === value) { return; }
        this.searchInput.next(value);
        this.router.navigate([], {
            queryParams: { search: value }, queryParamsHandling: 'merge'
        });
    }

    get search() {
        return this.searchInput.getValue();
    }
}
