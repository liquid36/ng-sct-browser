import { Component, AfterViewInit, Input, ViewChild, ElementRef, ViewEncapsulation, OnChanges } from '@angular/core';
import * as dagreD3 from 'dagre-d3';
import * as d3 from 'd3';
import * as zoomd3 from 'd3-zoom';

@Component({
    selector: 'app-tree-element',
    templateUrl: './tree-element.component.html',
    styleUrls: ['./tree-element.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TreeElementComponent implements AfterViewInit, OnChanges {
    public concept = null;
    public refSetLanguage = {
        conceptId: '231000013101',
        preferredTerm: 'conjunto de referencias de lenguaje para la extensión provincial de Neuquén (foundation metadata concept)'
    };

    constructor() { }

    @ViewChild('contenedor') contenedor: ElementRef;

    @Input() public nodes = [];
    @Input() public edges = [];

    ngOnChanges() {
        this.reload();
    }

    ngAfterViewInit() {
        this.reload();
    }

    removeSemtag(label: string) {
        const index = label.indexOf('(');
        return label.substring(0, index - 1);
    }

    reload() {
        this.contenedor.nativeElement.innerHtml = '';
        const g = new dagreD3.graphlib.Graph()
            .setGraph({})
            .setDefaultEdgeLabel(() => ({}));

        this.nodes.forEach((node) => {
            let nodeClass = 'type-defined';
            if (node.definitionStatus === '900000000000074008') {
                nodeClass = 'type-primitive';
            }
            g.setNode(node.conceptId, {
                label: this.removeSemtag(node.preferredTerm) + ` (${node.estadistica.total}/${node.estadistica.exact})`,
                class: nodeClass
            });
        });

        this.edges.forEach((link) => {
            g.setEdge(link.source, link.target, {
                lineInterpolate: 'bundle',
                arrowheadStyle: 'fill: #fff'
            });
        });

        const render = new dagreD3.render();

        const divWidth = this.contenedor.nativeElement.width - 50;
        const windowHeigth = window.innerHeight - 140;
        let w = 1000;
        let h = 1000;

        if (divWidth > w) { w = divWidth; }
        if (windowHeigth > h) { h = windowHeigth; }

        const svg = d3.select(this.contenedor.nativeElement).append('svg')
            .attr('width', w)
            .attr('height', h);
        const svgGroup = svg.append('g');
        const zoom = d3.zoom().on('zoom', () => {
            svgGroup.attr('transform', d3.event.transform);
        });
        svg.call(zoom);
        (g.graph() as any).rankdir = 'BT';

        render(d3.select(this.contenedor.nativeElement).select('svg g') as any, g);

        const graphWidth = g.graph().width + 80;
        const graphHeight = g.graph().height + 40;
        const width = parseInt(svg.style('width').replace(/px/, ''), 2);
        const height = parseInt(svg.style('height').replace(/px/, ''), 2);
        const zoomScale = Math.min(width / graphWidth, height / graphHeight);
        const translate = [(width / 2) - ((graphWidth * zoomScale) / 2), (height / 2) - ((graphHeight * zoomScale) / 2)];
        // zoom.translate(translate);
        // zoom.scale(zoomScale);
        // zoom.event(svg.transition().duration(500));
        const inner = d3.select(this.contenedor.nativeElement).select('svg g');
        inner.selectAll('g.node').on('click', (id) => {
            console.log(id);
        });
    }

}
