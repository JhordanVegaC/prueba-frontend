import { Component } from '@angular/core';
import { faBars} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-layout-container',
  templateUrl: './layout-container.component.html',
  styleUrls: ['./layout-container.component.scss'],
})
export class LayoutContainerComponent {

  sidebarExpanded = false;

  closeResult = '';

	open() {
    return this.sidebarExpanded = !this.sidebarExpanded;
	}

  faBars = faBars;

  public onLogout(){

  }
}
