export interface FirmaDigitalInterface {
  idFirma: number;
  tipoFirma: string;
  razonSocial: string;
  representanteLegal: string;
  empresaAcreditadora: string;
  fechaEmision: Date;
  fechaVencimiento: Date;
  rutaRubrica: string;
  certificadoDigital: string;
}
