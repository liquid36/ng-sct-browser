import { Component, OnInit } from '@angular/core';
import { SnomedAPI } from 'src/app/services/snomed.service';
import { ConceptDetailService } from '../concept-detail/concept-detail.service';

@Component({
    selector: 'app-estadisticas-nav',
    templateUrl: './estadisticas-nav.component.html',
})
export class EstadisticasNavComponent implements OnInit {
    public rangoEtario = [0, 1, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90];

    prestacionesTable;
    profesionalesTable;
    intervalosTable;
    rangoEtarioTable;
    organizacionesTable;
    clusterTable;

    title = '';

    constructor(
        private snomed: SnomedAPI,
        private conceptDetailService: ConceptDetailService
    ) {

    }

    refresh($event) {
        this.rangoEtario = $event;
        this.conceptDetailService.conceptSelected$.subscribe(concept => {
            if (concept) {
                this.title = concept.preferredTerm;
                this.snomed.demografia(concept.conceptId, this.rangoEtario).subscribe((stats) => {
                    this.rangoEtarioTable = stats.rangoEtario;
                    this.prestacionesTable = stats.prestacion;
                    this.profesionalesTable = stats.profesionales;
                    this.intervalosTable = stats.fechas;
                    this.organizacionesTable = stats.organizaciones;
                });
                this.snomed.cluster(concept.conceptId).subscribe(stats => {
                    this.clusterTable = stats;
                });
            }
        });
    }

    ngOnInit() {
        this.refresh(this.rangoEtario);
    }

}
