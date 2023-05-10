import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirmaDigitalComponent } from './pages/firma-digital/firma-digital.component';
import { LayoutContainerComponent } from './layout/layout-container/layout-container.component';
import { ContainerRoutingModule } from './container-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarSlimComponent } from './layout/components/sidebar-slim/sidebar-slim.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbDropdownModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { ThreeDotsComponent } from './components/three-dots/three-dots.component';
import { AgregarFirmaComponent } from './components/agregar-firma/agregar-firma.component';


@NgModule({
  declarations: [
    LayoutContainerComponent,
    FirmaDigitalComponent,
    SidebarSlimComponent,
    ThreeDotsComponent,
    AgregarFirmaComponent,
  ],
  imports: [
    CommonModule,
    ContainerRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NgbTypeaheadModule,
    NgbDropdownModule,
    NgbDatepickerModule
  ],
})
export class ContainerModule { }
