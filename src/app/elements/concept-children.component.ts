import { Component, Input } from '@angular/core';
import { SnomedAPI } from '../services/snomed.service';
import { ConceptDetailService } from '../components/concept-detail/concept-detail.service';

@Component({
  selector: 'app-concept-children',
  templateUrl: './concept-children.component.html',
  styleUrls: ['./concept-children.component.scss']
})
export class ConceptChildrenComponent {
    public static ISA = '116680003';
    public static INFERRED = '900000000000011006';
    public static STATED = '900000000000010007';

    constructor(
        private snomed: SnomedAPI,
        private conceptDetailService: ConceptDetailService
    ) {}

    private conceptTemp;
    public relatioships: any[] = [];
    @Input() set concept(value) {
        this.conceptTemp = value;
        this.snomed.children(value.conceptId).subscribe(children => {
            children.forEach(e => e._level = 0);
            this.relatioships = children;
            this.getStats(this.relatioships);
        });
    }

    getStats(conceptos) {
        const scts = conceptos.map(e => e.conceptId);
        this.snomed.history(scts).subscribe((stats) => {
            conceptos.forEach(c => {
                c._stats = stats[c.conceptId];
            });
            this.relatioships = [...this.relatioships];
        });
    }

    onSelect(concept) {
        this.conceptDetailService.select(concept);
    }

    getChildren(relationship, index) {
        if (!relationship._expanded && relationship.conceptId !== '138875005') {
            this.snomed.children(relationship.conceptId).subscribe(children => {
                relationship._expanded = true;
                children.forEach(e => e._level = relationship._level + 1);
                this.relatioships = [
                    ...this.relatioships.slice(0, index + 1),
                    ...children,
                    ...this.relatioships.slice(index + 1)
                 ];
                this.getStats(children);
            });
        } else {
            relationship._expanded = false;
            const myLevel = relationship._level;
            for (let i = index + 1 ; i < this.relatioships.length; i++) {
                if (this.relatioships[i]._level > myLevel) {
                    this.relatioships.splice(i, 1);
                    i--;
                } else if (this.relatioships[i]._level === myLevel) {
                    break;
                }
            }
            this.relatioships = [...this.relatioships];
        }
    }
}
