import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  sidebar = true;

  mostrarSidebar() {
    this.sidebar = !this.sidebar;
    console.log(this.sidebar)
    }

  constructor() { }

  ngOnInit() {
  }

}
