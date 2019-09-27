import { Component, OnInit } from '@angular/core';
import { SnomedService } from '../../servicios/snomed.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {

  constructor(private snomedService: SnomedService) { }

  ngOnInit() {
  }

}
