import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  sidebar = '';

  recibirSidebar($event) {
    this.sidebar = $event;
    console.log(this.sidebar)
  }

  constructor() { }

  ngOnInit() {
  }

}
