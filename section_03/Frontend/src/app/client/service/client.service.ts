import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
type productType = {
  _id: string;
  name: string;
  price: number;
  description: string;
};
type response_data_type = {
  type: string;
  data: string;
  redirectTo: string;
};
@Injectable({
  providedIn: 'root',
})
export class ClientService {
  Products: productType[] = [];
  Product_added_to_cart: string[] = [];
  var_response_type: string = '';
  var_response_message: string = '';
  var_cart_loading_status: boolean = true;
  base_url = 'http://localhost:4040';
  reponse_handler(type: string, message: string) {
    this.var_response_type = type;
    this.var_response_message = message;
    setTimeout(() => {
      this.var_response_type = '';
      this.var_response_message = '';
    }, 2000);
  }
  constructor(private clienthttp: HttpClient, private router: Router) {}
  getAllProduct(): Observable<productType[] | any> {
    return this.clienthttp.get(`${this.base_url}/shop`, {
      withCredentials: true,
    });
  }
  addToCart_handler(_id: string) {
    this.Product_added_to_cart.push(_id);
    this.reponse_handler('success', 'added to card');
    console.log(this.Product_added_to_cart);
  }
  getProductInCart(): Observable<productType[] | any> {
    return this.clienthttp.post(
      `${this.base_url}/cart`,
      { data: this.Product_added_to_cart },
      { withCredentials: true }
    );
  }
  createOrder(totalAmount: number) {
    const createOrderObject = {
      totalAmount: totalAmount,
      productId: this.Product_added_to_cart,
    };
    return this.clienthttp.post(
      `${this.base_url}/cart/createorder`,
      createOrderObject,
      { withCredentials: true }
    );
  }
  getAllOrders() {
    return this.clienthttp.get(`${this.base_url}/shop/myorders`, {
      withCredentials: true,
    });
  }
  getSingleOrderInfo(id: number) {
    return this.clienthttp.get(`${this.base_url}/shop/order/${id}`);
  }
  deleteOrder(id: number) {
    return this.clienthttp.delete(`${this.base_url}/shop/order/${id}`, {
      withCredentials: true,
    });
  }
  requestLogout() {
    this.clienthttp
      .get(`${this.base_url}/logout`, { withCredentials: true })
      .subscribe({
        next: (data: response_data_type | any) => {
          if (data) {
            this.var_response_type = data.type;
            this.var_response_message = data.message;
            setTimeout(() => {
              this.router.navigate([data.redirectTo]);
              this.var_response_type = '';
              this.var_response_message = '';
            }, 2000);
          }
        },
        error: (err) => console.log(err),
      });
  }
}
