import { Component, OnInit } from '@angular/core';
import { SnomedService } from '../../servicios/snomed.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {

  constructor(private snomedService: SnomedService) { }

  ngOnInit() {
  }

}
