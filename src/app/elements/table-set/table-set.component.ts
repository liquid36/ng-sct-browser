import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    templateUrl: 'table-set.component.html',
    selector: 'app-table-set',
    styles: [`
        th.mat-header-cell, td.mat-cell, td.mat-footer-cell {
            padding: .75rem !important;
        }
        tr.mat-row, tr.mat-header-row, tr.mat-footer-row {
            height: inherit !important;
        }

    `]
})

export class TableSetComponent implements OnInit, AfterViewInit {

    @Input()
    set values(value: any) {
        this.data = value;
        if (this.data && this.data.length > 0) {
            const item = this.data[0];
            this.hasExact = item.hasOwnProperty('exact');
            this.hasPrimera = item.hasOwnProperty('primera');
            this.hasPaciente = item.hasOwnProperty('pacientes');

            this.displayedColumns = ['nombre', 'count'];
            if (this.hasExact) { this.displayedColumns.push('exact'); }
            if (this.hasPrimera) { this.displayedColumns.push('primera'); }
            if (this.hasPaciente) {
                this.displayedColumns.push('pacientes');
                this.displayedColumns.push('ratio');
                this.data.forEach((elem) => {
                    elem.ratio = elem.count / elem.pacientes;
                });
            }


        }
        this.dataSource = new MatTableDataSource(this.data);
    }

    get values(): any {
        return this.data;
    }
    public data: any;
    public dataSource: MatTableDataSource<any[]> = new MatTableDataSource([]);
    public hasExact = false;
    public hasPrimera = false;
    public hasPaciente = false;
    public displayedColumns: string[] = [];

    @Input() titulo = '';
    @Input() type = 'bar';

    @ViewChild(MatSort) sort: MatSort;

    public calcTotal(column) {
        return this.data.map(t => t[column]).reduce((acc, value) => acc + value, 0);
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        this.sort.disableClear = true;
        this.dataSource.sort = this.sort;
    }

    sort2($event) {
        console.log($event);
    }
}
