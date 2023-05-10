import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirmaDigitalComponent } from './pages/firma-digital/firma-digital.component';
import { LayoutContainerComponent } from './layout/layout-container/layout-container.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutContainerComponent,
    children: [
      {
        path: 'firma-digital', component: FirmaDigitalComponent
      },
      {
        path: '**', redirectTo: 'firma-digital'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContainerRoutingModule { }
