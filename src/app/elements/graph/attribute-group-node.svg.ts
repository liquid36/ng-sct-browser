import { Component, Input } from '@angular/core';

@Component({
  selector: '[attributeGroupNode]',
  templateUrl: './attribute-group-node.svg.html'
})
export class AttributeGruopNodeComponent {
    @Input() x: number;
    @Input() y: number;
}
