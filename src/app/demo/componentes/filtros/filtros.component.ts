import { Component, OnInit } from '@angular/core';
import { SnomedService } from '../../servicios/snomed.service';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss']
})
export class FiltrosComponent implements OnInit {

  constructor(
    private snomedService: SnomedService,
  ) { }

  ngOnInit() {
  }

}
