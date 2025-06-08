import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { CommonModule } from '@angular/common';
import { ReponseHandlerComponent } from '../../../components/response-handler/reponse-handler.component';

@Component({
  selector: 'app-signin-page',
  imports: [
    FormsModule,
    LoaderComponent,
    CommonModule,
    ReponseHandlerComponent,
  ],
  templateUrl: './signin-page.component.html',
  styleUrl: './signin-page.component.css',
})
export class SigninPageComponent {
  signin_data = {
    username: '',
    password: '',
  };
  constructor(public authservice: AuthService) {}
  Signin_form_submit(SigninForm: NgForm) {
    this.authservice.signin_handler(SigninForm);
  }
}
