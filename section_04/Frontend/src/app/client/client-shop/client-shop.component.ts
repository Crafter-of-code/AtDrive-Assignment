import { Component } from '@angular/core';
import { ClientService } from '../service/client.service';
import { ProductContainerComponent } from '../../../components/product-container/product-container.component';
import { CommonModule } from '@angular/common';
import { WeatherContainerComponent } from '../../../components/weather-container/weather-container.component';
type productType = {
  _id: string;
  name: string;
  price: number;
  description: string;
};
@Component({
  selector: 'app-client-shop',
  imports: [ProductContainerComponent, CommonModule, WeatherContainerComponent],
  templateUrl: './client-shop.component.html',
  styleUrl: './client-shop.component.css',
})
export class ClientShopComponent {
  Products: productType[] = [];
  cssStyle: {} = {};
  var_is_weather_showing: boolean = false;
  var_content_of_button: string = 'show weather';
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
  WeatherShower() {
    if (this.var_is_weather_showing) {
      this.cssStyle = {
        left: '-22rem',
      };
      this.var_is_weather_showing = false;
      this.var_content_of_button = 'show weather';
    } else {
      this.cssStyle = {
        left: '0rem',
      };
      this.var_content_of_button = 'Hide';
      this.var_is_weather_showing = true;
    }
  }
}
