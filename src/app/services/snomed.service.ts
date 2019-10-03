
import { Injectable } from '@angular/core';
import { Server } from './server.service';
import { map, tap, bufferTime, filter, switchMap } from 'rxjs/operators';
import { of, BehaviorSubject } from 'rxjs';
import { QueryFilterService } from './queryfilter.service';
import { environment } from '../../environments/environment';
@Injectable()
export class SnomedAPI {
    constructor(private http: Server, private qf: QueryFilterService) {
        this.http.setBaseURL(environment.API_URL);

        this.qf.onChange$.subscribe(() => {
            this.conceptBS = {};
        });

        this.fromStats$.pipe(
            filter(concepts => concepts),
            bufferTime(250),
            filter(concepts => concepts.length > 0),
            switchMap(concepts => {
                return this.history(concepts);
            })
        ).subscribe(() => { });

    }
    private database = 'es-edition';
    private version = 'v20190722';
    private path = '/snomed';
    private cache = {};
    private conceptBS = {};


    public fromStats = new BehaviorSubject(null);
    public fromStats$ = this.fromStats.asObservable();

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
            this.fromStats.next(id);
        }
        return this.conceptBS[id];
    }

    history(sctids: string[]) {
        const start = this.qf.start;
        const end = this.qf.end;
        const organizacion = this.qf.organizacion ? this.qf.organizacion.id : null;
        const form = this.qf.relationship;

        const reals = sctids.filter(c => !this.cache[c]);
        const body = {
            visualization: 'count',
            target: reals,
            type: form,
            filter: {
                start,
                end,
                organizacion
            }
        };

        if (reals.length > 0) {
            return this.http.post(`/andes/analytics/count`, body).pipe(map(data => {
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

    cluster(sctid, semanticTags) {
        const start = this.qf.start;
        const end = this.qf.end;
        const organizacion = this.qf.organizacion ? this.qf.organizacion.id : null;

        return this.http.post(`/andes/rup/cluster`, { conceptId: sctid, semanticTags });
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

        const body = {
            visualization: 'term',
            target: sctid,
            filter: {
                start,
                end,
                organizacion
            }
        };

        return this.http.post(`/andes/analytics/term`, body).pipe(
            map(res => res[sctid])
        );
    }

    organizaciones(search) {
        return this.http.get('/andes/organizaciones', { params: { search } });
    }

    semanticTags(search) {
        return this.http.get('/andes/semanticTags', { params: { search } });
    }
}
