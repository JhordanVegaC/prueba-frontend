import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faB, faPenNib, faBook, faEnvelopesBulk, faGear,
  faFileSignature} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'sidebar-slim',
  templateUrl: './sidebar-slim.component.html',
  styleUrls: ['./sidebar-slim.component.scss']
})
export class SidebarSlimComponent {

  @Input() isExpanded: boolean = false;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

  // icons
  faB = faB;
  faPenNib = faPenNib;
  faBook = faBook;
  faEnvelopesBulk = faEnvelopesBulk;
  faGear = faGear;
  faFileSignature = faFileSignature;


  handleSidebarToggle = () => this.toggleSidebar.emit(!this.isExpanded);
}
