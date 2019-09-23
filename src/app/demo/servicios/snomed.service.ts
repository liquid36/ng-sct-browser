import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnomedService {


  semantics = [
    {
      nombre:'hallazgos',
      icono:'hallazgo',
      color: 'hallazgos',
    },
    {
      nombre:'procedimientos',
      icono:'termometro',
      color: 'procedimientos',
    },
    {
      nombre:'trastornos',
      icono:'trastorno',
      color: 'hallazgos',
    },
    {
      nombre:'dispositivos',
      icono:'ferula',
      color: 'dispositivos',
    },
    {
      nombre:'medicamentos',
      icono:'pildora',
      color: 'medicamentos',
    },
    {
      nombre:'conceptos para navegacion',
      icono:'web',
      color: 'observables',
    },
    {
      nombre:'productos',
      icono:'inhalador-80',
      color: 'productos',
    }

  ]


  conceptos = [
    {
      id: 101291009,
      nombre: 'Fiebre',
      totales: 1237,
      exactos: 537,
      semantic: 'hallazgo',
      color: 'trastornos',
    },
    {
      id: 101291009,
      nombre: 'Fiebre',
      totales: 1237,
      exactos: 537,
      semantic: 'documento-corazon',
      color: 'observables',
    },
    {
      id: 101291009,
      nombre: 'Fiebre',
      totales: 1237,
      exactos: 537,
      semantic: 'hallazgo',
      color: 'productos',
    },
    {
      id: 101291009,
      nombre: 'Fiebre',
      totales: 1237,
      exactos: 537,
      semantic: 'trastorno',
      color: 'trastornos',
    },
    {
      id: 101291009,
      nombre: 'Fiebre',
      totales: 1237,
      exactos: 537,
      semantic: 'termometro',
      color: 'procedimientos',
    },
    {
      id: 101291009,
      nombre: 'Fiebre',
      totales: 1237,
      exactos: 537,
      semantic: 'hallazgo',
      color: 'trastornos',
    },
    {
      id: 101291009,
      nombre: 'Fiebre',
      totales: 1237,
      exactos: 537,
      semantic: 'documento-corazon',
      color: 'trastornos',
    },
    {
      id: 101291009,
      nombre: 'Fiebre',
      totales: 1237,
      exactos: 537,
      semantic: 'hallazgo',
      color: 'trastornos',
    },
    {
      id: 101291009,
      nombre: 'Fiebre',
      totales: 1237,
      exactos: 537,
      semantic: 'trastorno',
      color: 'trastornos',
    },
    {
      id: 101291009,
      nombre: 'Fiebre',
      totales: 1237,
      exactos: 537,
      semantic: 'termometro',
      color: 'trastornos',
    },
    {
      id: 101291009,
      nombre: 'Fiebre',
      totales: 1237,
      exactos: 537,
      semantic: 'hallazgo',
      color: 'trastornos',
    },
    {
      id: 101291009,
      nombre: 'Fiebre',
      totales: 1237,
      exactos: 537,
      semantic: 'documento-corazon',
      color: 'trastornos',
    },
    {
      id: 101291009,
      nombre: 'Fiebre',
      totales: 1237,
      exactos: 537,
      semantic: 'hallazgo',
      color: 'trastornos',
    },
    {
      id: 101291009,
      nombre: 'Fiebre',
      totales: 1237,
      exactos: 537,
      semantic: 'trastorno',
      color: 'trastornos',
    },
    {
      id: 101291009,
      nombre: 'Fiebre',
      totales: 1237,
      exactos: 537,
      semantic: 'termometro',
      color: 'trastornos',
    },
    {
      id: 101291009,
      nombre: 'Fiebre',
      totales: 1237,
      exactos: 537,
      semantic: 'pastilla-79',
      color: 'procedimientos',
    },
    {
      id: 101291009,
      nombre: 'Fiebre',
      totales: 1237,
      exactos: 537,
      semantic: 'recipiente',
      color: 'trastornos',
    },
    {
      id: 1337295454,
      nombre: 'Fiebre Zika',
      totales: 1237,
      exactos: 537,
      semantic: 'mano-corazon',
      color: 'trastornos',
    }
  ]

  constructor() { }
}
