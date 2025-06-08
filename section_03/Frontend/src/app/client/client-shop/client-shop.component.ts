import { Component } from '@angular/core';
import { ProductContainerComponent } from '../../../components/product-container/product-container.component';
import { CommonModule } from '@angular/common';
import { ClientService } from '../services/client.service';

type AllProductData_type = {
  _id: string;
  name: string;
  price: number;
  discription: string;
};
@Component({
  selector: 'app-client-shop',
  imports: [ProductContainerComponent, CommonModule],
  templateUrl: './client-shop.component.html',
  styleUrl: './client-shop.component.css',
})
export class ClientShopComponent {
  AllProductData: AllProductData_type[] = [];
  constructor(private clientService: ClientService) {}
  ngOnInit() {
    this.clientService.getAllProduct().subscribe({
      next: (data) => {
        console.log(data);
        this.AllProductData = data;
      },
      error: (err) => console.log(err),
    });
  }
}
