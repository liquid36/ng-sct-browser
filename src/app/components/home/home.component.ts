import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap, NavigationStart, ActivationEnd } from '@angular/router';
import { ConceptDetailService } from '../concept-detail/concept-detail.service';
import { NavBusquedaService } from '../nav-busqueda/nav-busqueda.service';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private cd: ConceptDetailService,
        private nb: NavBusquedaService) {

    }

    detectQueryParamsChange() {
        this.route.queryParams.pipe(first()).subscribe(params => {
            if (params.conceptId) {
                this.cd.select(params);
            }
            if (params.search) {
                this.nb.search = params.search;
            } else {
                this.nb.search = null;
            }
        });
    }

    ngOnInit() {
        let stated = '';
        this.router.events.subscribe(e => {
            if (e instanceof NavigationStart) {
                stated = e.navigationTrigger;
            }
            if (e instanceof ActivationEnd) {
                if (stated === 'popstate') {
                    this.detectQueryParamsChange();
                    stated = '';
                }
            }
        });
        this.detectQueryParamsChange();
    }
}
