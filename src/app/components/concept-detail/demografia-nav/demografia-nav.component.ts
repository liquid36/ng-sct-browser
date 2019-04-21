import { Component, OnInit } from '@angular/core';
import { SnomedAPI } from '../../../services/snomed.service';
import { ConceptDetailService } from '../concept-detail.service';

@Component({
  selector: 'app-demografia-nav',
  templateUrl: './demografia-nav.component.html',
//   styleUrls: ['./app.component.scss']
})
export class DemografiaNavComponent implements OnInit {
    public conceptSelected = null;
    public tableDemografia = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    constructor(private snomed: SnomedAPI, private conceptDetailService: ConceptDetailService) {}

    ngOnInit() {
        this.conceptDetailService.conceptSelected$.subscribe(concept => {
            if (concept) {
                this.tableDemografia = [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                ];
                this.snomed.demografia(concept.conceptId).subscribe((stats) => {
                    stats.forEach(dato => {
                        const i = dato.sexo === 'masculino' ? 0 : 1;
                        const j = dato.decada;

                        this.tableDemografia[i][j] += dato.count;
                        this.tableDemografia[2][j] += dato.count;
                        this.tableDemografia[i][10] += dato.count;
                        this.tableDemografia[2][10] += dato.count;
                    });
                });
            }
        });
    }

}
