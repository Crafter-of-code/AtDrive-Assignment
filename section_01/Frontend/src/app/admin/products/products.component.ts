import { Component } from '@angular/core';
import { HttpserviceService } from '../httpservice.service';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProductContainerComponent } from '../../../components/product-container/product-container.component';
import { Observable } from 'rxjs';
type AllProductData = {
  _id: string;
  name: string;
  price: number;
  discription: string;
};
@Component({
  selector: 'app-products',
  imports: [CommonModule, RouterLink, ProductContainerComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  AllProductData: AllProductData[] | any = [];
  constructor(private allProductService: HttpserviceService) {}
  getAllProduct() {
    this.allProductService.getProducts().subscribe({
      next: (data) => {
        this.AllProductData = data;
        console.log(data);
      },
      error: (err) => console.log({ message: 'Error in the server' }, err),
    });
  }
  ngOnInit() {
    this.getAllProduct();
  }
  delete_Event(id: string) {
    this.allProductService.deleteProduct(id).subscribe({
      next: (data) => (this.AllProductData = data),
      error: (err) => console.log(err),
    });
    this.getAllProduct();
  }
}
