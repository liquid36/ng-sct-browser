import { Component, OnInit, Input } from '@angular/core';


@Component({
    templateUrl: 'table-set.component.html',
    selector: 'app-table-set'
})

export class TableSetComponent implements OnInit {
    public data: any;

    public hasExact = false;
    public hasPrimera = false;
    public hasPaciente = false;

    @Input() titulo = '';
    @Input() type = 'bar';

    @Input()
    set values(value: any) {
        this.data = value;
        if (this.data.length > 0) {
            const item = this.data[0];
            this.hasExact = item.hasOwnProperty('exact');
            this.hasPrimera = item.hasOwnProperty('primera');
            this.hasPaciente = item.hasOwnProperty('pacientes');
        }
    }

    get values(): any {
        return this.data;
    }

    ngOnInit() {
    }


}
