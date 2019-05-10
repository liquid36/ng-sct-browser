import { Component, Input } from '@angular/core';

@Component({
  selector: '[subsumesNode]',
  templateUrl: './subsumes-node.svg.html'
})
export class SubsumesNodeComponent {
    @Input() x: number;
    @Input() y: number;
}
