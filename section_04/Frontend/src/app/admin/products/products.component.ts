import { Component } from '@angular/core';
import { HttpserviceService } from '../httpservice.service';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ProductContainerComponent } from '../../../components/product-container/product-container.component';
type reponse_data_type = {
  type: string;
  message: string;
  redirectTo: string;
};
type AllProductData = {
  _id: string;
  name: string;
  price: number;
  description: string;
};
@Component({
  selector: 'app-products',
  imports: [CommonModule, RouterLink, ProductContainerComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  AllProductData: AllProductData[] = [];
  constructor(
    private allProductService: HttpserviceService,
    private router: Router
  ) {}
  ngOnInit() {
    this.allProductService.getProducts().subscribe({
      next: (data) => {
        this.AllProductData = data;
      },
      error: (err) => console.log({ message: 'Error in the server' }, err),
    });
  }
  delete_Event(id: string) {
    this.allProductService.deleteProduct(id);
  }
}
