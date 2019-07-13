
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class QueryFilterService {
    public INFERRED = '900000000000011006';
    public STATED = '900000000000010007';

    public BSrelationship = new BehaviorSubject(null);
    public BSstart = new BehaviorSubject(null);
    public BSend = new BehaviorSubject(null);
    public BSorganizacion = new BehaviorSubject(null);

    public relationship$ = this.BSrelationship.asObservable();
    public start$ = this.BSstart.asObservable();
    public end$ = this.BSend.asObservable();
    public organizacion$ = this.BSorganizacion.asObservable();

    public onchange = new Subject();
    public onChange$ = this.onchange.asObservable();

    constructor() {
        this.BSrelationship.next('stated');
    }

    set start(value) {
        this.BSstart.next(value);
        this.onchange.next();
    }

    get start() {
        return this.BSstart.getValue();
    }

    set end(value) {
        this.BSend.next(value);
        this.onchange.next();
    }

    get end() {
        return this.BSend.getValue();
    }

    set organizacion(value) {
        this.BSorganizacion.next(value);
        this.onchange.next();
    }

    get organizacion() {
        return this.BSorganizacion.getValue();
    }

    set relationship(value) {
        this.BSrelationship.next(value);
        this.onchange.next();
    }

    get relationship() {
        return this.BSrelationship.getValue();
    }

    get form() {
        return this.BSrelationship.getValue() === 'stated' ? this.STATED : this.INFERRED;
    }
}
