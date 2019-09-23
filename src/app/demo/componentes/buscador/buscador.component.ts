import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
