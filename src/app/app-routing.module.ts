import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DemoComponent } from './demo/demo.component';

const routes: Routes = [
  // { path: 'home', component: HomeComponent },
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: '**', redirectTo: '/home', pathMatch: 'full' }
  { path: 'demo', component: DemoComponent },
  { path: '', redirectTo: '/demo', pathMatch: 'full' },
  { path: '**', redirectTo: '/demo', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
