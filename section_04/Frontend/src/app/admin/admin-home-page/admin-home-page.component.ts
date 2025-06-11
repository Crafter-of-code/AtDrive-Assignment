import { Component } from '@angular/core';
import { NavButtonComponent } from '../../../components/nav-button/nav-button.component';
import { ResponseHandlerComponent } from '../../../components/response-handler/reponse-handler.component';
import { HttpserviceService } from '../httpservice.service';

@Component({
  selector: 'app-admin-home-page',
  imports: [NavButtonComponent, ResponseHandlerComponent],
  templateUrl: './admin-home-page.component.html',
  styleUrl: './admin-home-page.component.css',
})
export class AdminHomePageComponent {
  constructor(public httpAdmin: HttpserviceService) {}
}
