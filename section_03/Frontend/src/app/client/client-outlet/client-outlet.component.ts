import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientHeaderComponent } from '../../common/client-header/client-header.component';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-client-outlet',
  imports: [RouterOutlet, ClientHeaderComponent],
  templateUrl: './client-outlet.component.html',
  styleUrl: './client-outlet.component.css',
})
export class ClientOutletComponent {}
