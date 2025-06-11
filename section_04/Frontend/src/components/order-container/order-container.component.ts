import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ProductContainerComponent } from '../product-container/product-container.component';
type product = {
  _id: string;
  name: string;
  price: number;
  description: string;
};
@Component({
  selector: 'app-order-container',
  imports: [CommonModule, ProductContainerComponent],
  templateUrl: './order-container.component.html',
  styleUrl: './order-container.component.css',
})
export class OrderContainerComponent {
  @Input() Products: product[] = [];
}
