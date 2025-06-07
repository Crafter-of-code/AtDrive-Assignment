import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { NgForm } from '@angular/forms';
type getProducts = {
  id: number;
  name: string;
  price: number;
  discription: string;
};
type addProduct = {
  name: string;
  price: number;
  discription: string;
};
type updated_product_type = {
  updated_product_name: string;
  updated_product_value: number;
  updated_product_discription: string;
};
@Injectable({
  providedIn: 'root',
})
export class HttpserviceService {
  private baseUrl = 'http://localhost:4040';
  private toAddproduct = 'http://localhost:4040/addproduct';
  private toDeleteProduct = 'http://localhost:4040/deleteproduct';
  private getOneProduct: string = 'http://localhost:4040/product';
  constructor(private http: HttpClient) {}
  getProducts(): Observable<getProducts[] | any> {
    return this.http.get(`${this.baseUrl}/products`);
  }
  deleteProduct(id: string) {
    return this.http.delete(`${this.baseUrl}/deleteproduct`, {
      body: { _id: id },
    });
  }
  addProduct(data: addProduct) {
    this.http.post(this.toAddproduct, data).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  getSingleProduct(id: string): Observable<getProducts | any> {
    return this.http.get(`${this.getOneProduct}/${id}`);
  }
  update_product_handler(id: string, product_detail: updated_product_type) {
    return this.http
      .patch(`${this.baseUrl}/product/update`, { id, product_detail })
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
