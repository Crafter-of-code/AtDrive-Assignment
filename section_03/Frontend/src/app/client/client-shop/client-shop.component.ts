import { Component } from '@angular/core';
import { ClientService } from '../service/client.service';
import { ProductContainerComponent } from '../../../components/product-container/product-container.component';
import { CommonModule } from '@angular/common';
type productType = {
  _id: string;
  name: string;
  price: number;
  description: string;
};
@Component({
  selector: 'app-client-shop',
  imports: [ProductContainerComponent, CommonModule],
  templateUrl: './client-shop.component.html',
  styleUrl: './client-shop.component.css',
})
export class ClientShopComponent {
  Products: productType[] = [];
  constructor(private shopHttp: ClientService) {}
  getProduct() {
    this.shopHttp.getAllProduct().subscribe({
      next: (data: productType[]) => {
        this.Products = data;
      },
      error: (error) => console.log(error),
    });
  }
  ngOnInit() {
    this.getProduct();
  }
  addToCart(_id: string) {
    this.shopHttp.addToCart_handler(_id);
  }
}
