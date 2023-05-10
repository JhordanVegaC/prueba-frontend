import { Component, Input, inject } from '@angular/core';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-firma',
  templateUrl: './agregar-firma.component.html',
  styleUrls: ['./agregar-firma.component.scss']
})
export class AgregarFirmaComponent {

  @Input() modoAgregar: boolean;
  @Input() title: string;
  @Input() txtButton: string;

  faCalendarDays = faCalendarDays;

  minDate: NgbDateStruct = { year: 2023, month: 5, day: 7 };
  maxDate: NgbDateStruct = { year: 2023, month: 5, day: 10 };

  rutaRubrica: string = ''
  rutaCertificadoDigital: string = ''

	constructor(public activeModal: NgbActiveModal) {
    this.modoAgregar = true;
    this.title = 'Nueva Firma'
    this.txtButton = 'Agregar'
  }

  private fb = inject( FormBuilder );

  public firmaForm: FormGroup = this.fb.group({
    tipoFirma:            ['', [ Validators.required ]],
    razonSocial:          ['', [ Validators.required ]],
    representanteLegal:   ['', [ Validators.required ]],
    empresaAcreditadora:  ['', [ Validators.required ]],
    fechaEmision:         ['', [ Validators.required ]],
    fechaVencimiento:     ['', [ Validators.required ]],
    rutaRubrica:          ['', [ Validators.required ]],
    certificadoDigital:   ['', [ Validators.required ]],

  });

  /*
  crearModificarfirma(){
    console.log("firmaForm =>", this.firmaForm.value)
  }
  */


}
