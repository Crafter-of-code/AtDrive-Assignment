import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
// import { NgForm } from '@angular/forms';
type response_data_type = {
  type: string;
  message: string;
  redirectTo: string;
};
type getProducts = {
  id: number;
  name: string;
  price: number;
  description: string;
};
type addProduct = {
  name: string;
  price: number;
  description: string;
};
type updated_product_type = {
  updated_product_name: string;
  updated_product_value: number;
  updated_product_description: string;
};
@Injectable({
  providedIn: 'root',
})
export class HttpserviceService {
  private baseUrl = 'http://localhost:4040';
  private toAddproduct = 'http://localhost:4040/addproduct';
  private toDeleteProduct = 'http://localhost:4040/deleteproduct';
  private getOneProduct: string = 'http://localhost:4040/product';
  var_response_type: string = '';
  var_response_message: string = '';
  constructor(private http: HttpClient, private router: Router) {}
  getProducts(): Observable<getProducts[] | any> {
    return this.http.get(`${this.baseUrl}/products`, { withCredentials: true });
  }
  deleteProduct(id: string) {
    this.http
      .delete(`${this.baseUrl}/deleteproduct`, {
        body: { _id: id },
        withCredentials: true,
      })
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  addProduct(data: addProduct) {
    console.log(data);
    this.http
      .post(this.toAddproduct, data, { withCredentials: true })
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  getSingleProduct(id: string): Observable<getProducts | any> {
    return this.http.get(`${this.getOneProduct}/${id}`, {
      withCredentials: true,
    });
  }
  update_product_handler(id: number, product_detail: updated_product_type) {
    return this.http
      .patch(
        `${this.baseUrl}/product/update`,
        {
          body: { id: id, detail: product_detail },
        },
        { withCredentials: true }
      )
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  logout_handler() {
    this.http
      .get(`${this.baseUrl}/logout`, { withCredentials: true })
      .subscribe({
        next: (data: response_data_type | any) => {
          this.var_response_type = data.type;
          this.var_response_message = data.message;
          if (data.type == 'success') {
            setTimeout(() => {
              this.var_response_type = '';
              this.var_response_message = '';
              this.router.navigate([data.redirectTo]);
            }, 2000);
          }
        },
        error: (err) => console.log(err),
      });
  }
}
