import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
type income_reponse_data = {
  type: string;
  message: string;
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  base_url = 'http://localhost:4040';
  var_login_loading_state: boolean = false;
  var_login_button_status: boolean = false;
  var_signin_loading_state: boolean = false;
  var_signin_button_status: boolean = false;
  var_response_type: string = '';
  var_response_message: string = '';
  constructor(private authHttp: HttpClient, private router: Router) {}
  reponse_setter(type: string, message: string) {
    this.var_response_type = type;
    this.var_response_message = message;
    setTimeout(() => {
      this.var_response_type = '';
      this.var_response_message = '';
    }, 3000);
  }
  signin_handler(SigninForm: NgForm) {
    this.var_signin_loading_state = true;
    this.authHttp.post(`${this.base_url}/signin`, SigninForm.value).subscribe({
      next: (data: income_reponse_data | any) => {
        this.var_signin_loading_state = false;
        this.reponse_setter(data.type, data.message);
        if (data.type == 'success') {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        this.var_signin_loading_state = false;
        console.log('Facing some problem', err);
      },
    });
  }
  login_handler(LoginForm: NgForm) {
    this.var_login_loading_state = true;
    this.var_login_button_status = true;
    this.authHttp.post(`${this.base_url}/login`, LoginForm.value).subscribe({
      next: (data) => {
        this.var_login_loading_state = false;
        this.var_login_button_status = false;
        console.log(data);
      },
      error: (err) => {
        this.var_login_loading_state = false;
        this.var_login_button_status = false;

        console.log(err);
      },
    });
  }
}
