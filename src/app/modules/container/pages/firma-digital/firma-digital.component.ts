import { Component, OnInit, ViewChild, ElementRef, inject } from '@angular/core';
import { DatePipe  } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

import { faFileExcel, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FirmaDigitalService } from '@shared/services/firma-digital.service';
import { FirmaDigitalInterface } from '@core/models/firma-digital.interface';

import * as XLSX from "xlsx";
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { AgregarFirmaComponent } from '@modules/container/components/agregar-firma/agregar-firma.component';
import { dateObjectToDateString, dateToNgbDateStruct } from '@shared/utils/parse-date.util';

@Component({
  selector: 'app-firma-digital',
  //encapsulation: ViewEncapsulation.None,
  templateUrl: './firma-digital.component.html',
  styleUrls: ['./firma-digital.component.scss'],
  providers: [DatePipe],
})
export class FirmaDigitalComponent implements OnInit {

	filter = new FormControl('', { nonNullable: true });

  faFileExcel = faFileExcel;
  faEllipsisVertical = faEllipsisVertical;

  firmasDigitales: FirmaDigitalInterface[] = [];
  firmasDigitales$: Observable<FirmaDigitalInterface[]> = new Observable<FirmaDigitalInterface[]>();

	constructor(
    private serviceFD: FirmaDigitalService,
    private datePipe: DatePipe,
    private modalService: NgbModal
    ) {}

  ngOnInit(): void {

    this.firmasDigitales$ = this.filter.valueChanges.pipe(
      startWith(''),
      switchMap((text) =>
        this.serviceFD.listarFirmas().pipe(
          map((firmas) => this.search(text, firmas))
        )
      )
    );

  }

  search(text: string, firmas: FirmaDigitalInterface[]): FirmaDigitalInterface[]{
    return firmas.filter((firma) => {
      const term = text.toLowerCase();


      return (
        this.containString(firma.razonSocial, term)
        || this.containSignatureType(firma.tipoFirma ,term)
        || this.containString(firma.representanteLegal, term)
        //firma.empresaAcreditadora.toLowerCase().includes(term)
        || this.containString(firma.empresaAcreditadora, term)
        || this.containDate(firma.fechaEmision, term)
        || this.containDate(firma.fechaVencimiento, term)
      );
    });
  }

  private containString(campo: any, term: string): boolean{
    if(!!campo && campo){
      return campo.toLowerCase().includes(term)
    }
    return false;
  }

  private containDate(date: any, term: string): boolean{
    if(!!date && date){
      let fechaFormateada: string | null = this.datePipe.transform(date, 'dd/MM/yyyy');
      if(!!fechaFormateada && fechaFormateada) {
        return fechaFormateada.toLowerCase().includes(term)
      }

    }
    return false;
  }

  private containSignatureType(campo: string, term: string): boolean{
    if(!!campo && campo){
      const type = this.getTxtSignatureType(campo);
      if(!!type && type)
        return type.toLowerCase().includes(term)
    }
    return false;
  }

  public getTxtSignatureType(type: string): string | ''{
    if(type === '1')
      return 'Firma Digital';
    else if(type === '2')
      return 'Rúbrica Escaneada';
    else if(type === '3')
      return 'Firma Electrónica';

    return '';
  }

  @ViewChild("tableFirmasDigitales") table! : ElementRef;

  exportExcel() {
    console.log("Descargando excel")

    // Creamos un workbook
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    // Creamos una hoja de cálculo de Excel
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);

    // Eliminar los datos de la última columna de la hoja de cálculo (Queda pendiente)

    // Agregamos la hoja de cálculo al workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Descargamos el Excel
    XLSX.writeFile(wb, 'Firmas digitales.xlsx');

  }


  agregarModificarFirma(modoAgregar: boolean, firma?: FirmaDigitalInterface){

    const modalAgregarRef = this.modalService.open(AgregarFirmaComponent, { size: 'lg', backdrop: 'static' });

    console.log("modoAgregar =>", modoAgregar);
    if(modoAgregar){
      modalAgregarRef.componentInstance.title = 'Nueva Firma';
      modalAgregarRef.componentInstance.txtButton = 'Agregar'

      this.agregarFirma(modalAgregarRef);
    }else{
      modalAgregarRef.componentInstance.title = 'Editar Firma';
      modalAgregarRef.componentInstance.txtButton = 'Modificar'

      let fb =  modalAgregarRef.componentInstance.firmaForm;

      console.log('rubrica =>', firma?.rutaRubrica)
      console.log('certificadoDigital =>', firma?.certificadoDigital)

      fb.get('tipoFirma').setValue(firma?.tipoFirma)
      fb.get('razonSocial').setValue(firma?.razonSocial)
      fb.get('representanteLegal').setValue(firma?.representanteLegal)
      fb.get('empresaAcreditadora').setValue(firma?.empresaAcreditadora)
      fb.get('fechaEmision').setValue(firma?dateToNgbDateStruct(new Date(firma.fechaEmision)): null)
      fb.get('fechaVencimiento').setValue(firma?dateToNgbDateStruct(new Date(firma.fechaVencimiento)): null)
      //fb.get('rutaRubrica').setValue(firma?.rutaRubrica)
      //fb.get('certificadoDigital').setValue(firma?.certificadoDigital)

      if(firma){
        modalAgregarRef.componentInstance.rutaRubrica = `Ruta de rúbrica: ${firma.rutaRubrica}`
        modalAgregarRef.componentInstance.certificadoDigital = `Ruta de certificado digital: ${firma.certificadoDigital}`
      }

      /*
      const payload = {
        ...fb.value,
        rutaRubrica: fb.get('fechaEmision').getValue == null && firma != null ? firma.rutaRubrica: fb.get('fechaEmision').getValue,
        fechaVencimiento: fb.get('fechaVencimiento').getValue == null && firma != null ? firma.fechaVencimiento: fb.get('fechaVencimiento').getValue
      }
      */

      this.modificarFirma(modalAgregarRef, firma!.idFirma);


    }



  }

  eliminarFirma(idFirma: number) {
		const modalRef = this.modalService.open(ModalComponent);
		modalRef.componentInstance.title = 'Eliminar Firma';
    modalRef.componentInstance.message = `¿Está seguro que quiere eliminar esta firma? (id = ${idFirma})`;
    modalRef.componentInstance.idFirma = idFirma;

    modalRef.result.then(
      (result) => {
        this.serviceFD.eliminarFirma(result).subscribe(rpta => {
          console.log("rpta =>", rpta)
          this.actualizarTabla();
        })
      },
      (reason) => {
      }

    );
	}

  private actualizarTabla() {
    this.serviceFD.listarFirmas().subscribe(firmas => {
      this.firmasDigitales$ = this.filter.valueChanges.pipe(
        startWith(''),
        map((text) => this.search(text, firmas))
      );
    });
  }

  private agregarFirma(modalAgregarRef: NgbModalRef){
    modalAgregarRef.result.then(
      (result) => {

        result = {
          ...result,
          fechaEmision: dateObjectToDateString(result.fechaEmision),
          fechaVencimiento: dateObjectToDateString(result.fechaVencimiento),
        }

        this.serviceFD.crearFirma(result).subscribe(rpta => {
          this.actualizarTabla();
        })
      } ,
      (reason) => {

      }
    );
  }

  private modificarFirma(modalAgregarRef: NgbModalRef, idFirma: number) {
    modalAgregarRef.result.then(
      (result) => {


        console.log("result x=>", result)
        result = {
          idFirma: idFirma,
          ...result,
          fechaEmision: dateObjectToDateString(result.fechaEmision),
          fechaVencimiento: dateObjectToDateString(result.fechaVencimiento),
        }

        this.serviceFD.actualizarFirma(result).subscribe(rpta => {
          this.actualizarTabla();
        })
      } ,
      (reason) => {

      }
    );
  }

}

