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

import { NavBusquedaComponent } from './components/nav-busqueda/nav-busqueda.component';

import { ConceptDetailService } from './components/concept-detail/concept-detail.service';
import { ConceptDetailComponent } from './components/concept-detail/concept-detail.component';
import { SummaryNavComponent } from './components/concept-detail/summary-nav/summary-nav.component';
import { ConceptNameComponent } from './elements/concept-name.component';
import { ConceptParentComponent } from './elements/concept-parent.component';
import { ConceptChildrenComponent } from './elements/concept-children.component';
import { DemografiaNavComponent } from './components/concept-detail/demografia-nav/demografia-nav.component';
import { TaxonomyNavComponent } from './components/taxonomy-nav/taxonomy-nav.component';
import { DetailNavComponent } from './components/concept-detail/detail-nav/detail-nav.component';
import { ConceptDescTableComponent } from './elements/concept-desc-table.component';
import { ConceptRelTableComponent } from './elements/concept-rel-table.component';
import { GraphNavComponent } from './components/concept-detail/graph-nav/graph-nav.component';
import { SctBoxComponent } from './elements/graph/sct-box.svg';
import { CommonModule } from '@angular/common';
import { ConnectElementComponent } from './elements/graph/connect-element.svg';
import { CircleNodeComponent } from './elements/graph/circle-node.svg';
import { TreeNavComponent } from './components/concept-detail/tree-nav/tree-nav.component';
import { TreeElementComponent } from './elements/tree/tree-element.component';
import { QueryFilterService } from './services/queryfilter.service';
import { TimeFilterFormComponent } from './components/time-filter-form/time-filter-form.component';
import { HomeComponent } from './components/home/home.component';
import { NavBusquedaService } from './components/nav-busqueda/nav-busqueda.service';


@NgModule({
  declarations: [
    AppComponent,
    NavBusquedaComponent,
    ConceptDetailComponent,
    SummaryNavComponent,
    DemografiaNavComponent,
    DetailNavComponent,
    TaxonomyNavComponent,
    GraphNavComponent,
    ConceptNameComponent,
    ConceptParentComponent,
    ConceptChildrenComponent,
    ConceptDescTableComponent,
    ConceptRelTableComponent,
    SctBoxComponent,
    ConnectElementComponent,
    CircleNodeComponent,
    TreeNavComponent,
    TreeElementComponent,
    TimeFilterFormComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
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
    ConceptDetailService,
    QueryFilterService,
    NavBusquedaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
