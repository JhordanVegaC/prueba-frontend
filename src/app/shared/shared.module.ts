import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ModalComponent } from './components/modal/modal.component';



@NgModule({
  declarations: [

    NotFoundComponent,
    // ModalComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
