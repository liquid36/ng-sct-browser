
import { Injectable } from '@angular/core';
import { Server } from './server.service';
import { map } from 'rxjs/operators';
import { of, BehaviorSubject } from 'rxjs';
import { QueryFilterService } from './queryfilter.service';
import { environment } from '../../environments/environment';
@Injectable()
export class SnomedAPI {
    constructor(private http: Server, private qf: QueryFilterService) {
        this.http.setBaseURL(environment.API_URL);

        this.qf.onChange$.subscribe(() => {
            Object.keys(this.conceptBS).forEach(key => {
                this.conceptBS[key].next({ total: 0, children: 0, exact: 0 });
            });
        });
    }
    private database = 'es-edition';
    private version = 'v20180919';
    private path = '/snomed';
    private cache = {};
    private conceptBS = {};

    descriptions(params) {
        return this.http.get(`${this.path}/${this.database}/${this.version}/descriptions`, { params });
    }

    concept(sctid) {
        return this.http.get(`${this.path}/${this.database}/${this.version}/concepts/${sctid}`);
    }

    concepts(sctids) {
        return this.http.get(`${this.path}/${this.database}/${this.version}/concepts`, {
            params: {
                sctids
            }
        });
    }

    parents(sctid) {
        const form = this.qf.relationship;
        return this.http.get(`${this.path}/${this.database}/${this.version}/concepts/${sctid}/parents`, { params: { form } });
    }

    children(sctid) {
        const form = this.qf.relationship;
        return this.http.get(`${this.path}/${this.database}/${this.version}/concepts/${sctid}/children`, { params: { form } });
    }

    stats(id) {
        if (!this.conceptBS[id]) {
            this.conceptBS[id] = new BehaviorSubject({ total: 0, exact: 0, children: 0 });
        }
        return this.conceptBS[id];
    }

    history(sctids: string[]) {
        const reals = sctids.filter(c => !this.cache[c]);
        const start = this.qf.start;
        const end = this.qf.end;
        const organizacion = this.qf.organizacion ? this.qf.organizacion.id : null;

        if (reals.length > 0) {
            return this.http.post(`/andes/rup`, { concepts: reals, start, end, organizacion }).pipe(map(data => {
                const res = {};
                sctids.forEach(c => {
                    if (this.conceptBS[c]) {
                        this.conceptBS[c].next(data[c]);
                    } else {
                        this.conceptBS[c] = new BehaviorSubject(data[c]);
                    }
                    if (this.cache[c]) {
                        res[c] = this.cache[c];
                    } else {
                        res[c] = data[c];
                    }
                });
                return res;
            }));
        } else {
            const res = {};
            sctids.forEach(c => {
                res[c] = this.cache[c];
            });
            return of(res);
        }
    }

    demografia(sctid, rangoEtario) {
        const start = this.qf.start;
        const end = this.qf.end;
        const organizacion = this.qf.organizacion ? this.qf.organizacion.id : null;

        return this.http.post(`/andes/rup/demografia`, { conceptId: sctid, rango: rangoEtario, start, end, organizacion });
    }

    cluster(sctid) {
        const start = this.qf.start;
        const end = this.qf.end;
        const organizacion = this.qf.organizacion ? this.qf.organizacion.id : null;

        return this.http.post(`/andes/rup/cluster`, { conceptId: sctid });
    }

    maps(sctid) {
        const start = this.qf.start;
        const end = this.qf.end;
        const organizacion = this.qf.organizacion ? this.qf.organizacion.id : null;

        return this.http.post(`/andes/rup/maps`, { conceptId: sctid });
    }

    terms(sctid) {
        const start = this.qf.start;
        const end = this.qf.end;
        const organizacion = this.qf.organizacion ? this.qf.organizacion.id : null;

        return this.http.post(`/andes/rup/terms`, { conceptId: sctid, start, end, organizacion });
    }

    organizaciones(search) {
        return this.http.get('/andes/organizaciones', { params: { search } });
    }

    semanticTags(search) {
        return this.http.get('/andes/semanticTags', { params: { search } });
    }
}
