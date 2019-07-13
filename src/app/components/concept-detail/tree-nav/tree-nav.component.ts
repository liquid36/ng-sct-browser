import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SnomedAPI } from '../../../services/snomed.service';
import { ConceptDetailService } from '../concept-detail.service';
import * as d3 from 'd3';
import * as dagre from 'dagre-d3';
import { QueryFilterService } from 'src/app/services/queryfilter.service';

function isARel(relationships, form) {
    return relationships.filter((rel) => rel.active && rel.destination)
        .filter(rel => rel.type.conceptId === '116680003')
        .filter(rel => rel.characteristicType.conceptId === form);
}

@Component({
    selector: 'app-tree-nav',
    templateUrl: './tree-nav.component.html'
})
export class TreeNavComponent implements OnInit {
    public concept = null;
    public refSetLanguage = {
        conceptId: '231000013101',
        preferredTerm: 'conjunto de referencias de lenguaje para la extensión provincial de Neuquén (foundation metadata concept)'
    };

    constructor(
        private snomed: SnomedAPI,
        private conceptDetailService: ConceptDetailService,
        private cd: ChangeDetectorRef,
        private qf: QueryFilterService
    ) { }

    public nodes = [];
    public edges = [];

    ngOnInit() {
        this.conceptDetailService.conceptSelected$.subscribe(concept => {
            this.nodes = [];
            this.edges = [];
            this.concept = null;
            this.cd.detectChanges();
            const concepts = this.qf.relationship === 'stated' ? concept.statedAncestors : concept.inferredAncestors;
            this.snomed.concepts(concepts).subscribe((conceptos) => {
                const ids = [concept, ...conceptos].map(i => i.conceptId);
                this.snomed.history(ids).subscribe((numbers) => {

                    let count = 0;
                    [concept, ...conceptos].forEach((ct) => {
                        this.nodes.push({
                            ...ct,
                            count: count++,
                            estadistica: numbers[ct.conceptId]
                        });
                    });

                    [concept, ...conceptos].forEach((ct) => {
                        const rel = isARel(ct.relationships || [], this.qf.form);
                        rel.forEach(r => {
                            this.edges.push({
                                source: ct.conceptId,
                                target: r.destination.conceptId,
                                value: 1,
                            });
                        });
                    });
                    this.concept = concept;

                });
            });
        });
    }


    traverseTree(conceptos, initial) {

    }

}
