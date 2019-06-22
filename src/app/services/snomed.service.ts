
import { Injectable } from '@angular/core';
import { Server } from './server.service';
import { map } from 'rxjs/operators';
import { of, BehaviorSubject } from 'rxjs';
import { QueryFilterService } from './queryfilter.service';

@Injectable()
export class SnomedAPI {
    constructor(private http: Server, private qf: QueryFilterService) {
        this.http.setBaseURL('http://localhost:3001');
    }
    private database = 'es-edition';
    private version = 'v20180919';
    private path = '/snomed';
    private cache = {};

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
        return this.http.get(`${this.path}/${this.database}/${this.version}/concepts/${sctid}/parents`, { params: { form: 'stated' } });
    }

    children(sctid) {
        return this.http.get(`${this.path}/${this.database}/${this.version}/concepts/${sctid}/children`, { params: { form: 'stated' } });
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

    demografia(sctid) {
        return this.http.post(`/andes/rup/demografia`, { conceptId: sctid });
    }

    organizaciones(search) {
        return this.http.get('/andes/organizaciones', { params: { search } });
    }
}
