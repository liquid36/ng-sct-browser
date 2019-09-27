import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

// Servicio
import { Concepto } from '../../servicios/concepto';
import { SnomedService } from '../../servicios/snomed.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  conceptos$: Observable<Concepto[]>;
  selectedId: number;
  
  volverHome() {
    this.router.navigate(['/']);
  }

  constructor(
    private service: SnomedService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {

    this.conceptos$ = this.route.paramMap.pipe(
      switchMap(params => {
        // (+) before `params.get()` turns the string into a number
        this.selectedId = +params.get('id');
        return this.service.getConceptos();
      })
    );
  }

}
