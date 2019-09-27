import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoComponent } from './demo/demo.component';
import { MainComponent } from './demo/layout/main/main.component';
import { TablaComponent } from './demo/componentes/tabla/tabla.component';
import { GraficoComponent } from './demo/componentes/grafico/grafico.component';
import { MapaComponent } from './demo/componentes/mapa/mapa.component';


const routes: Routes = [
  // { path: 'home', component: HomeComponent },
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: '**', redirectTo: '/home', pathMatch: 'full' }

  { path: 'demo', component: DemoComponent,
    children: [
      { path: ':id' , component: MainComponent, 
        children: [
          { path:'arbol' , component: TablaComponent },
          { path:'grafico' , component: GraficoComponent },
          { path:'mapa' , component: MapaComponent },
        ]
      }
    ]
  },
  { path: '', redirectTo: '/demo', pathMatch: 'full' },
  { path: '**', redirectTo: '/demo', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
