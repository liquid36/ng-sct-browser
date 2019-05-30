import { Component, OnInit } from '@angular/core';
import { SnomedAPI } from '../../../services/snomed.service';
import { ConceptDetailService } from '../concept-detail.service';
import * as d3 from 'd3';
import * as dagre from 'dagre-d3';

function isARel(relationships) {
    return relationships.filter((rel) => rel.active && rel.destination)
        .filter(rel => rel.type.conceptId === '116680003')
        .filter(rel => rel.characteristicType.conceptId === '900000000000010007');
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

    constructor(private snomed: SnomedAPI, private conceptDetailService: ConceptDetailService) { }

    public nodes = [];
    public edges = [];

    ngOnInit() {
        this.conceptDetailService.conceptSelected$.subscribe(concept => {

            this.snomed.concepts(concept.statedAncestors).subscribe((conceptos) => {
                let count = 0;
                [concept, ...conceptos].forEach((ct) => {
                    this.nodes.push({
                        ...ct,
                        count: count++
                    });
                });

                [concept, ...conceptos].forEach((ct) => {
                    const rel = isARel(ct.relationships || []);
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
    }


    traverseTree(conceptos, initial) {

    }

}
