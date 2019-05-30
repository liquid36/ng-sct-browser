
import { Injectable } from '@angular/core';
import { Server } from './server.service';

@Injectable()
export class SnomedAPI {
    private database = 'es-edition';
    private version = 'v20180919';
    private path = '/snomed';

    constructor(private http: Server) {
        this.http.setBaseURL('http://localhost:3001');

    }

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

    history(sctids) {
        return this.http.post(`/andes/rup`, { concepts: sctids });
    }

    demografia(sctid) {
        return this.http.post(`/andes/rup/demografia`, { conceptId: sctid });
    }
}
