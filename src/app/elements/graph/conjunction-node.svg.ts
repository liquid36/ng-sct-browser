import { Component, Input } from '@angular/core';

@Component({
  selector: '[conjunctionNode]',
  templateUrl: './conjunction-node.svg.html'
})
export class ConjunctionNodeComponent {
    @Input() x: number;
    @Input() y: number;
}
