import { Component, Input  } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Input() title: string;
  @Input() message: string;
  @Input() idFirma: number | null;

  constructor(public activeModal: NgbActiveModal) {
    this.title = ''
    this.message = ''
    this.idFirma = null;
  }

}
