import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  resultados = true;

  sidebar: boolean = true;
  @Output() enviar = new EventEmitter<boolean>();

  enviarSidebar() {
    this.enviar.emit(this.sidebar);
    this.sidebar = !this.sidebar;
  }


  constructor() { }

  ngOnInit() {
  }

}
