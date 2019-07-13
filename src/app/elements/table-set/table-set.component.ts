import { Component, OnInit, Input } from '@angular/core';


@Component({
    templateUrl: 'table-set.component.html',
    selector: 'app-table-set'
})

export class TableSetComponent implements OnInit {
    private data: any;
    @Input() titulo = '';
    @Input() type = 'bar';

    @Input()
    set values(value: any) {
        this.data = value;
    }

    get values(): any {
        return this.data;
    }

    ngOnInit() {
    }


}
