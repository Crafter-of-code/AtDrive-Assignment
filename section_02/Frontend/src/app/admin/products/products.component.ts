import { Component } from '@angular/core';
import { HttpserviceService } from '../httpservice.service';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProductContainerComponent } from '../../../components/product-container/product-container.component';
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
  AllProductData: AllProductData[] = [];
  constructor(private allProductService: HttpserviceService) {}
  ngOnInit() {
    this.allProductService.getProducts().subscribe({
      next: (data) => {
        this.AllProductData = data;
        console.log(data);
      },
      error: (err) => console.log({ message: 'Error in the server' }, err),
    });
  }
  delete_Event(id: string) {
    this.allProductService.deleteProduct(id);
  }
}
