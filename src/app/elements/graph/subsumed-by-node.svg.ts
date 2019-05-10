import { Component, Input } from '@angular/core';

@Component({
  selector: '[subsumedByNode]',
  templateUrl: './subsumed-by-node.svg.html'
})
export class SubsumedByNodeComponent {
    @Input() x: number;
    @Input() y: number;
}
