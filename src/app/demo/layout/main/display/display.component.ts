import { Component, OnInit } from '@angular/core';
import { SnomedService } from '../../../servicios/snomed.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Concepto } from '../../../servicios/concepto';


@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})

export class DisplayComponent implements OnInit {

  conceptos$: Observable<Concepto>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: SnomedService
   ) { }

  ngOnInit() {
  
    this.conceptos$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => 
      this.service.getConcepto(params.get('id')))
      );
    }

    gotoCars(concepto: Concepto) {
      let conceptoId = concepto ? concepto.id : null;
      this.router.navigate(['/conceptos' , {id: conceptoId}]);
    } 

  }
