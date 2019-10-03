import { Component, Input, OnInit } from '@angular/core';
import { SnomedAPI } from '../../services/snomed.service';
import { ConceptDetailService } from '../../components/concept-detail/concept-detail.service';

@Component({
    selector: 'app-taxonomy-nav',
    templateUrl: './taxonomy-nav.component.html',
    styleUrls: ['./taxonomy-nav.component.scss']
})
export class TaxonomyNavComponent implements OnInit {
    public static ISA = '116680003';
    public static INFERRED = '900000000000011006';
    public static STATED = '900000000000010007';

    public ROOTConcept = {
        isLeafInferred: false,
        isLeafStated: false,
        semtag: 'SNOMED RT+CTV3',
        conceptId: '138875005',
        preferredTerm: 'concepto de SNOMED CT (SNOMED RT+CTV3)',
        fullySpecifiedName: 'concepto de SNOMED CT (SNOMED RT+CTV3)',
        definitionStatus: {
            conceptId: '900000000000074008',
            preferredTerm: 'estado de definición de concepto necesario pero no suficiente (metadato del núcleo)'
        },
        statedDescendants: 337272,
        inferredDescendants: 336894,
        active: true,
        effectiveTime: '20020131',
        module: {
            conceptId: '900000000000207008',
            preferredTerm: 'módulo identificador del núcleo de la terminología de SNOMED CT (metadato del núcleo)'
        },
        _level: 0
    };

    constructor(
        private snomed: SnomedAPI,
        private conceptDetailService: ConceptDetailService
    ) { }

    private conceptTemp;
    public relatioships: any[] = [];

    ngOnInit() {
        this.relatioships = [this.ROOTConcept];
    }

    onSelect(concept) {
        this.conceptDetailService.select(concept.conceptId);
    }

    getChildren(relationship, index) {
        if (!relationship._expanded) {
            this.snomed.children(relationship.conceptId).subscribe(children => {
                relationship._expanded = true;
                children.forEach(e => e._level = relationship._level + 1);
                this.relatioships = [
                    ...this.relatioships.slice(0, index + 1),
                    ...children,
                    ...this.relatioships.slice(index + 1)
                ];
            });
        } else {
            relationship._expanded = false;
            const myLevel = relationship._level;
            for (let i = index + 1; i < this.relatioships.length; i++) {
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
