import { Component, OnInit } from '@angular/core';
import { Concepto } from '../../servicios/concepto';
import { Observable, of } from 'rxjs';
import { CONCEPTOS } from '../../servicios/mock-conceptos';


@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent implements OnInit {

  busquedaAvanzada = false;

  mostrarBusquedaAvanzada() {
    this.busquedaAvanzada = !this.busquedaAvanzada;
  }

  buscarConceptos():Observable<Concepto[]> {
    return of (CONCEPTOS);
  }

  constructor() { }

  ngOnInit() {
  }

}
