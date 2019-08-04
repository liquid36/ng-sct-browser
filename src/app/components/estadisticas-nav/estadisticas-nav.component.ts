import { Component, OnInit } from '@angular/core';
import { SnomedAPI } from 'src/app/services/snomed.service';
import { ConceptDetailService } from '../concept-detail/concept-detail.service';

@Component({
    selector: 'app-estadisticas-nav',
    templateUrl: './estadisticas-nav.component.html',
    styles: [`
        agm-map {
        height: 500px;
        }
    `]
})
export class EstadisticasNavComponent implements OnInit {
    public lat = -38.9176284;
    public lng = -69.9546118;
    public zoom = 5;

    public rangoEtario = [0, 1, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90];

    prestacionesTable;
    profesionalesTable;
    intervalosTable;
    rangoEtarioTable;
    organizacionesTable;
    clusterTable;
    localidadesTable;

    title = '';

    constructor(
        private snomed: SnomedAPI,
        private conceptDetailService: ConceptDetailService
    ) {

    }

    concepto;

    refresh($event) {
        this.rangoEtario = $event;
        this.conceptDetailService.conceptSelected$.subscribe(concept => {
            if (concept) {
                this.concepto = concept;
                this.title = concept.preferredTerm;
                this.snomed.demografia(concept.conceptId, this.rangoEtario).subscribe((stats) => {
                    this.rangoEtarioTable = stats.rangoEtario;
                    this.prestacionesTable = stats.prestacion;
                    this.profesionalesTable = stats.profesionales;
                    this.intervalosTable = stats.fechas;
                    this.organizacionesTable = stats.organizaciones;
                    this.localidadesTable = stats.localidades;
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

    onMap(map) {
        this.snomed.maps(this.concepto.conceptId).subscribe(data => {
            data = data.map((item) => {
                return { location: new (window as any).google.maps.LatLng(item.lat, item.lng), weight: 2 };
            });
            const heatmap = new (window as any).google.maps.visualization.HeatmapLayer({
                data,
                maxIntensity: 25,
            });
            heatmap.setMap(map);
            heatmap.set('radius', 12);
            heatmap.set('opacity', 0.8);
        });
    }

}
