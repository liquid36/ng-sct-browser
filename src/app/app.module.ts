import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CdkTreeModule } from '@angular/cdk/tree';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularSplitModule } from 'angular-split';

import { Server } from './services/server.service';
import { SnomedAPI } from './services/snomed.service';

import { NavBusquedaComponent } from './components/nav-busqueda.component';

import { ConceptDetailService } from './components/concept-detail/concept-detail.service';
import { ConceptDetailComponent } from './components/concept-detail/concept-detail.component';
import { SummaryNavComponent } from './components/concept-detail/summary-nav/summary-nav.component';
import { ConceptNameComponent } from './elements/concept-name.component';
import { ConceptParentComponent } from './elements/concept-parent.component';
import { ConceptChildrenComponent } from './elements/concept-children.component';
import { TaxonomyNavComponent } from './components/taxonomy-nav/taxonomy-nav.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBusquedaComponent,
    ConceptDetailComponent,
    SummaryNavComponent,
    DemografiaNavComponent,
    TaxonomyNavComponent,
    ConceptNameComponent,
    ConceptParentComponent,
    ConceptChildrenComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    AngularSplitModule,
    CdkTreeModule
  ],
  providers: [
    Server,
    SnomedAPI,
    ConceptDetailService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
