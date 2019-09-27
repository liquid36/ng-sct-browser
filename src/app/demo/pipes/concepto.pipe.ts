import { Pipe, PipeTransform } from '@angular/core';
import { Concepto } from '../servicios/concepto';

@Pipe({
  name: 'concepto'
})
export class ConceptoPipe implements PipeTransform {

  transform(conceptoList: Concepto[], searchTerm: string) {
    if (!conceptoList || !searchTerm) {
        return conceptoList;
    }

    return conceptoList.filter(Concepto => Concepto.nombre.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);

  }

}