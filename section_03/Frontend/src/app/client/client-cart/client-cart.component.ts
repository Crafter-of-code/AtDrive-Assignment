import { Component, OnInit } from '@angular/core';
import { ClientService } from '../service/client.service';
import { CommonModule } from '@angular/common';

type productType = {
  _id: string;
  name: string;
  price: number;
  discription: string;
};
type reponse_type = {
  type: string;
  massage: string;
};
@Component({
  selector: 'app-client-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-cart.component.html',
  styleUrls: ['./client-cart.component.css'],
})
export class ClientCartComponent implements OnInit {
  Cart_Product: productType[] = [];
  varProductAddedToCart: string[] = [];
  var_resposne_type: string = '';
  var_response_message: string = '';
  totalAmountOfCart: number = 0;
  constructor(private cartHttp: ClientService) {}
  ngOnInit(): void {
    this.varProductAddedToCart = this.cartHttp.Product_added_to_cart;
    this.cartHttp.getProductInCart().subscribe({
      next: (data: productType[]) => {
        this.Cart_Product = data;
        this.totalAmountOfCart = data.reduce(
          (sum, product) => sum + product.price,
          0
        );
      },
      error: (err) => {
        console.error('Error fetching cart products:', err);
      },
    });
  }
  create_order() {
    this.cartHttp.createOrder(this.totalAmountOfCart).subscribe({
      next: (data: reponse_type | any) => {
        this.cartHttp.reponse_handler(
          'success',
          'Thank you! Your order is confirmed.'
        );
        this.Cart_Product = [];
        this.totalAmountOfCart = 0;
      },
      error: (err) => {
        console.log(err);
        this.cartHttp.reponse_handler(
          'error',
          'Oops! Something went wrong on our end. Your order was not completed.'
        );
      },
    });
  }
}
