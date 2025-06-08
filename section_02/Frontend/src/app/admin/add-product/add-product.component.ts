import { Component, StreamingResourceOptions } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpserviceService } from '../httpservice.service';
type data_type_from_form = {
  name: string;
  price: number;
  discription: string;
};
@Component({
  selector: 'app-add-product',
  imports: [FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  product = {
    name: 'helo',
    price: 300,
    discription: 'hey there',
  };
  constructor(private httpserver: HttpserviceService) {}
  onSubmitProductDiscritpion(data: NgForm) {
    this.httpserver.addProduct(data.value);
  }
}
