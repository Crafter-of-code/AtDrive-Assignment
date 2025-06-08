import { HttpClient } from '@angular/common/http';
import { Injectable, StreamingResourceOptions } from '@angular/core';
import { Observable } from 'rxjs';

type getAllProduct_type = {
  _id: string;
  name: string;
  price: number;
  discription: string;
};
@Injectable({
  providedIn: 'root',
})
export class ClientService {
  baseUrl = 'http://localhost:4040';
  constructor(private http: HttpClient) {}
  getAllProduct(): Observable<getAllProduct_type[] | any> {
    return this.http.get(`${this.baseUrl}/client/products`);
  }
}
