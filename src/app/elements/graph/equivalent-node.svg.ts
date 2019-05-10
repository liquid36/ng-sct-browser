import { Component, Input } from '@angular/core';

@Component({
  selector: '[equivalentNode]',
  templateUrl: './equivalent-node.svg.html'
})
export class EquivalentNodeComponent {
    @Input() x: number;
    @Input() y: number;
}
