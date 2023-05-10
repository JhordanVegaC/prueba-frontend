import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBaseService } from './api-base.service';
import { FirmaDigitalInterface } from '@core/models/firma-digital.interface';

@Injectable({
  providedIn: 'root'
})
export class FirmaDigitalService {

  constructor(private apiBase: ApiBaseService) {}

  listarFirmas(): Observable<FirmaDigitalInterface[]> {
    return this.apiBase.get<FirmaDigitalInterface[]>('/firmadigital');
  }

  crearFirma(body: FirmaDigitalInterface): Observable<FirmaDigitalInterface> {
    return this.apiBase.post<FirmaDigitalInterface>('/firmadigital', body);
  }

  actualizarFirma(body: FirmaDigitalInterface): Observable<FirmaDigitalInterface> {
    return this.apiBase.put<FirmaDigitalInterface>('/firmadigital', body);
  }

  eliminarFirma(idFirma: number): Observable<any> {
    return this.apiBase.delete(`/firmadigital/${idFirma}`)
  }
}
