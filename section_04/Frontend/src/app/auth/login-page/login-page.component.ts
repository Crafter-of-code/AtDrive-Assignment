import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';
import { ResponseHandlerComponent } from '../../../components/response-handler/reponse-handler.component';
@Component({
  standalone: true,
  selector: 'app-login-page',
  imports: [
    FormsModule,
    RouterLink,
    LoaderComponent,
    CommonModule,
    ResponseHandlerComponent,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  login_data = {
    role: '',
    username: '',
    password: '',
  };
  constructor(public authservice: AuthService) {}
  login_form_submit(loginForm: NgForm) {
    console.log(loginForm.value);
    this.authservice.login_handler(loginForm);
  }
}
