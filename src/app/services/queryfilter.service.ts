
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class QueryFilterService {
    public BSstart = new BehaviorSubject(null);
    public BSend = new BehaviorSubject(null);
    public BSorganizacion = new BehaviorSubject(null);

    public start$ = this.BSstart.asObservable();
    public end$ = this.BSend.asObservable();
    public organizacion$ = this.BSorganizacion.asObservable();


    set start(value) {
        this.BSstart.next(value);
    }

    get start() {
        return this.BSstart.getValue();
    }

    set end(value) {
        this.BSend.next(value);
    }

    get end() {
        return this.BSend.getValue();
    }

    set organizacion(value) {
        this.BSorganizacion.next(value);
    }

    get organizacion() {
        return this.BSorganizacion.getValue();
    }
}
