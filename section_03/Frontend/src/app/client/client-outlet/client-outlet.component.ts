import { Component } from '@angular/core';
import { ClientHeaderComponent } from '../../../components/client-header/client-header.component';
import { RouterOutlet } from '@angular/router';
import { ResponseHandlerComponent } from '../../../components/response-handler/reponse-handler.component';
import { ClientService } from '../service/client.service';
// import { ProductContainerComponent } from '../../../components/product-container/product-container.component';

@Component({
  selector: 'app-client-outlet',
  imports: [ClientHeaderComponent, RouterOutlet, ResponseHandlerComponent],
  templateUrl: './client-outlet.component.html',
  styleUrl: './client-outlet.component.css',
})
export class ClientOutletComponent {
  constructor(public clientHttp: ClientService) {}
  logout_handler = () => this.clientHttp.requestLogout();
}
