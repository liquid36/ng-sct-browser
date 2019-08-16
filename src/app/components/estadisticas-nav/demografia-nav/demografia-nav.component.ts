import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SnomedAPI } from '../../../services/snomed.service';
import { ConceptDetailService } from '../../concept-detail/concept-detail.service';

@Component({
    selector: 'app-demografia-nav',
    templateUrl: './demografia-nav.component.html'
})
export class DemografiaNavComponent implements OnInit {
    @Output() rangoChange = new EventEmitter();

    @Input() localidades;
    @Input() set data(value) {
        this.crearTabla();
        if (value) {
            value.forEach(dato => {
                const i = dato.sexo === 'masculino' ? 0 : 1;
                const j = this.mappingIndex[dato.decada];

                this.tableDemografia[i][j] += dato.count;
                this.tableDemografia[2][j] += dato.count;
                this.tableDemografia[i][this.numCols] += dato.count;
                this.tableDemografia[2][this.numCols] += dato.count;
            });
        }
    }

    public rangoEtario = [0, 1, 2, 6, 10, 15, 50];
    public nacional = [0, 1, 2, 6, 10, 15, 50];
    public provincial = [0, 1, 5, 15, 20, 40, 70];


    public conceptSelected = null;
    public tableDemografia = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    public numCols = 0;
    public mappingIndex = {};

    indices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    crearTabla() {
        this.numCols = 0;
        this.mappingIndex = {};
        this.rangoEtario.forEach((value, i) => {
            this.numCols++;
            this.mappingIndex[value] = i;
        });
        this.tableDemografia = [
            Array(this.numCols + 1).fill(0),
            Array(this.numCols + 1).fill(0),
            Array(this.numCols + 1).fill(0)
        ];
        this.indices = Array(this.numCols);
        for (let i = 0; i < this.numCols; i++) {
            this.indices[i] = i;
        }
    }

    ngOnInit() {

    }

    changeRangoEtario(tipo) {
        switch (tipo) {
            case 'nacional':
                this.rangoEtario = this.nacional;
                break;
            case 'provincial':
                this.rangoEtario = this.provincial;
                break;
        }
        this.rangoChange.emit(this.rangoEtario);
    }

}
