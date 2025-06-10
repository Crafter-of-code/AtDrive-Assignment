import { Component, OnInit } from '@angular/core';
import { ClientService } from '../service/client.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { OrderContainerComponent } from '../../../components/order-container/order-container.component';
type orderId = {
  orderId: number;
};
type response = {
  type: string;
  message: string;
};
type product = {
  _id: string;
  name: string;
  price: number;
  discription: string;
};
type reponse_data = {
  type: string;
  message: string;
  data: {
    totalAmount: number;
    mongoresult: product[];
  };
};
type response_data_when_delete = {
  data: orderId[];
};
@Component({
  selector: 'app-client-orders',
  imports: [CommonModule, OrderContainerComponent],
  templateUrl: './client-orders.component.html',
  styleUrl: './client-orders.component.css',
})
export class ClientOrdersComponent implements OnInit {
  orderId: orderId[] = [];
  allProduct: product[] = [];
  var_current_product_id: number = 0;
  response_setter(type: string, message: string) {
    this.orderhttp.var_response_type = type;
    this.orderhttp.var_response_message = message;
    setTimeout(() => {
      this.orderhttp.var_response_type = '';
      this.orderhttp.var_response_message = '';
    }, 1000);
  }
  constructor(private orderhttp: ClientService) {}
  fetchData() {
    this.orderhttp.getAllOrders().subscribe({
      next: (data: orderId | any) => {
        this.orderId = data;
      },
      error: (err) => console.log(err),
    });
  }
  ngOnInit() {
    this.fetchData();
  }
  getOrder_byId(id: number) {
    this.var_current_product_id = id;
    this.orderhttp.getSingleOrderInfo(id).subscribe({
      next: (data: reponse_data | any) => {
        if (Array.isArray(data?.data?.mongoresult)) {
          this.allProduct = data.data.mongoresult;
          console.log(data);
        } else {
          console.error(
            'Expected product[], but got:',
            data?.data?.mongoresult
          );
          this.allProduct = [];
        }
        this.response_setter(data.type, data.message);
      },
      error: (error) => {
        console.error(error);
        this.allProduct = [];
        this.response_setter(error.type, error.message);
      },
    });
  }
  deleteOrderById() {
    this.orderhttp.deleteOrder(this.var_current_product_id).subscribe({
      next: (data: response | any) => {
        console.log(data);
        this.response_setter(data.type, data.message);
        this.allProduct = [];
        setTimeout(() => {
          this.fetchData();
        }, 2000);
      },
      error: (err) => {
        this.response_setter(err.type, err.message);
      },
    });
  }
}
