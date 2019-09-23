import { Component, OnInit } from '@angular/core';
import { SnomedService } from '../../servicios/snomed.service';


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {


  
  constructor(private snomedService: SnomedService) { }

  ngOnInit() {
  }

}
