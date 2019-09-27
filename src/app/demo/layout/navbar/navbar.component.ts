import { Component, OnInit } from '@angular/core';
import { SnomedService } from '../../servicios/snomed.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(private snomedService: SnomedService) { }

  ngOnInit() {
  }

}
