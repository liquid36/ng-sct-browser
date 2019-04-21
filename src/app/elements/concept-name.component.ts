import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { SnomedAPI } from '../services/snomed.service';

@Component({
  selector: 'app-concept-name',
  templateUrl: './concept-name.component.html',
  styleUrls: ['./concept-name.component.scss']
})
export class ConceptNameComponent implements OnChanges {
    public static ISA = '116680003';
    public static INFERRED = '900000000000011006';
    public static STATED = '900000000000010007';

    constructor(private snomed: SnomedAPI) {}

    @Input() concept;
    public stats;

    ngOnChanges() {
        this.snomed.history([ this.concept.conceptId ]).subscribe(data => {
            this.stats = data[this.concept.conceptId];
        });
    }

}
