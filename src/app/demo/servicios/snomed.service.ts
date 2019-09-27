import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Concepto } from '../servicios/concepto';
import { CONCEPTOS } from '../servicios/mock-conceptos';


@Injectable({
  providedIn: 'root'
})
export class SnomedService {

  constructor() { }


  getConceptos():Observable<Concepto[]>{
    return of (CONCEPTOS);
  }

  getConcepto(id: number | string) {
    return this.getConceptos().pipe(
      map(( conceptos: Concepto[]) => conceptos.find(concepto => concepto.id === +id ))
    );
  }

// ** HARDCODEO FILTROS**

  //Navbar 
  menu = [
    {
      item:'Inicio',
    },
    {
      item:'Pacientes',
    },
    {
      item:'Prestaciones',
    },
    {
      item:'Profesionales',
    },
    {
      item:'Organizaciones',
    },
    {
      item:'Conceptos Asociados',
    }
  ]

  // Organizaciones
  organizaciones = [
    {
      nombre: 'Hospital Provincial Neuquén "Dr. Eduardo Castro Rendón',
      localidad: '',
      zona: ''
    },
    {
      nombre: 'Hospital Zonal "Dr. Ramón Carrillo',
      localidad: '',
      zona: ''
    },
    {
      nombre: 'Hospital Bouquet Roldán',
      localidad: '',
      zona: ''
    },
    {
      nombre: 'Hospital Dr. Horacio Heller',
      localidad: '',
      zona: ''
    },
    {
      nombre: 'Hospital Villa La Angostura',
      localidad: '',
      zona: '',
    }
  ]  

  // Profesionales
  profesionales = [
    {
      nombre: 'Matías Hernán',
      apellido: 'Neira',
      especialidad: 'Medicina general'
    },
    {
      nombre: 'Sebastián',
      apellido: 'Lusetti',
      especialidad: 'Traumatología'
    },
    {
      nombre: 'María Laura',
      apellido: 'Monteverde',
      especialidad: 'Pediatría'
    },
    {
      nombre: 'Nerina',
      apellido: 'Lopez',
      especialidad: 'Medicina general'
    },
    {
      nombre: 'Walter',
      apellido: 'Molini',
      especialidad: 'Medicina general'
    },
    {
      nombre: 'Ignacio',
      apellido: 'Del Pin',
      especialidad: 'Traumatología'
    },
  ]  


  // Prestaciones
  prestaciones = [
    {
      nombre: 'Consulta General de Medicina',
    },
    {
      nombre: 'Examen medico del adulto',
    },
    {
      nombre: 'Consulta odontologica',
    },
    {
      nombre: 'Consulta de colonoscopia',
    },
    {
      nombre: 'Consulta de traumatologia',
    }
  ]

  // Semantics
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


// Iconos Asidebar
  aside = [
    {
      icono: 'jerarquia'
    },
    {
      icono: 'estadistica'
    },
    {
      icono: 'grafico-torta'
    }
  ]

}
