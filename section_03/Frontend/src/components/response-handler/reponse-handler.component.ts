import { Component, Input } from '@angular/core';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';

@Component({
  selector: 'app-response-handler',
  imports: [],
  templateUrl: './reponse-handler.component.html',
  styleUrl: './reponse-handler.component.css',
})
export class ReponseHandlerComponent {
  error_style = {
    display: 'flex',
    backgroundColor: 'red',
    color: 'white',
  };
  success_style = {
    backgroundColor: 'green',
    color: 'white',
  };
  @Input() type: string = '';
  @Input() message: string = '';
}
