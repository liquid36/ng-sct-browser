import { Component, Input } from '@angular/core';
import { SnomedAPI } from '../services/snomed.service';
import { ConceptDetailService } from '../components/concept-detail/concept-detail.service';

@Component({
  selector: 'app-concept-parent',
  templateUrl: './concept-parent.component.html',
  styleUrls: ['./concept-parent.component.scss']
})
export class ConceptParentComponent {
    public static ISA = '116680003';
    public static INFERRED = '900000000000011006';
    public static STATED = '900000000000010007';

    constructor(
        private snomed: SnomedAPI,
        private conceptDetailService: ConceptDetailService
    ) {}

    private conceptTemp;
    public relatioships: any[];
    @Input() set concept(value) {
        this.conceptTemp = value;
        if (this.conceptTemp.relationships) {
            this.relatioships = this.conceptTemp.relationships
                .filter(e => e.active)
                .filter(e => e.characteristicType.conceptId === ConceptParentComponent.STATED)
                .filter(e => e.type.conceptId === ConceptParentComponent.ISA)
                .map(e => { e.destination._level = 0; return e.destination; });
        } else {
            this.relatioships = [];
        }
    }

    onSelect(concept) {
        this.conceptDetailService.select(concept);
    }

    getParents(relationship, index) {
        if (!relationship._expanded && relationship.conceptId !== '138875005') {
            this.snomed.parents(relationship.conceptId).subscribe(parents => {
                relationship._expanded = true;
                parents.forEach(e => e._level = relationship._level + 1);
                this.relatioships = [
                    ...this.relatioships.slice(0, index > 0 ? index : 0),
                    ...parents,
                    ...this.relatioships.slice(index)
                 ];
            });
        } else {
            relationship._expanded = false;
            const myLevel = relationship._level;
            for (let i = index - 1; i >= 0; i--) {
                if (this.relatioships[i]._level > myLevel) {
                    this.relatioships.splice(i, 1);
                    // i++;
                } else if (this.relatioships[i]._level === myLevel) {
                    break;
                }
            }
            this.relatioships = [...this.relatioships];
        }
    }
}
