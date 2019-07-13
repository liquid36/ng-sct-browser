import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ConceptDetailService } from '../concept-detail.service';
import { QueryFilterService } from 'src/app/services/queryfilter.service';

@Component({
    selector: 'app-graph-nav',
    templateUrl: './graph-nav.component.html',
    styleUrls: ['./graph-nav.component.scss']
})
export class GraphNavComponent implements OnInit {
    public concept: any;

    // @ViewChild('elConcept') elConcept: SctBoxComponent;

    public initialX = 10;
    public initialY = 10;

    get circle1X() {
        return this.initialX + 90;
    }

    get circle1Y() {
        return this.initialY + 40 + 40;
    }

    get circle2X() {
        return this.circle1X + 55;
    }

    get circle2Y() {
        return this.circle1Y;
    }

    get initialIsARelX() {
        return this.circle2X + 40;
    }

    get initialIsARelY() {
        return this.circle2Y - 18;
    }

    get initialZeroAttributeY() {
        return this.circle2Y - 18 + this.isARel.length * (39 + 25);
    }

    get initialGroupAttributeY() {
        return this.initialZeroAttributeY + this.zeroAttribute.length * (39 + 25) + 15;
    }

    offsetGroupAttrY(index) {
        let y = 0;
        for (let i = 1; i <= index; i++) {
            y += this.getAttributeGroup[i - 1].length * (39 + 25);
        }
        return y;
    }

    get isPrimitive() {
        return this.concept.definitionStatus.conceptId !== '900000000000073002';
    }

    get isARel() {
        if (this.concept) {
            return this.concept.relationships.filter((rel) => rel.active && rel.destination)
                .filter(rel => rel.type.conceptId === '116680003')
                .filter(rel => rel.characteristicType.conceptId === this.qf.form);
        }
        return [];
    }

    get zeroAttribute() {
        if (this.concept) {
            return this.concept.relationships.filter((rel) => rel.active && rel.destination)
                .filter(rel => rel.type.conceptId !== '116680003')
                .filter(rel => rel.relationshipGroup === 0)
                .filter(rel => rel.characteristicType.conceptId === this.qf.form);
        }
        return [];
    }

    get getAttributeGroup() {
        const maxGroup = this.concept.relationships
            .filter((rel) => rel.active && rel.destination)
            .filter(rel => rel.type.conceptId !== '116680003')
            .filter(rel => rel.characteristicType.conceptId === this.qf.form)
            .reduce((a, b) => Math.max(a, b.relationshipGroup), 0);
        const result = [];
        for (let i = 1; i <= maxGroup; i++) {
            result.push(
                this.concept.relationships
                    .filter((rel) => rel.active && rel.destination)
                    .filter(rel => rel.type.conceptId !== '116680003')
                    .filter(rel => rel.characteristicType.conceptId === this.qf.form)
                    .filter(rel => rel.relationshipGroup === i)
            );
        }
        return result;
    }

    constructor(
        private cd: ChangeDetectorRef,
        private conceptDetailService: ConceptDetailService,
        private qf: QueryFilterService) { }
    ngOnInit() {
        this.conceptDetailService.conceptSelected$.subscribe(concept => {
            this.concept = concept;
        });
    }



}
