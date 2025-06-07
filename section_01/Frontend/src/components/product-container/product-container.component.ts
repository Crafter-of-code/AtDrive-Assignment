import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-container',
  imports: [CommonModule],
  templateUrl: './product-container.component.html',
  styleUrl: './product-container.component.css',
})
export class ProductContainerComponent {
  @Input() name: string = '';
  @Input() price: number | any = 0;
  @Input() discription: string = '';
  first_button_handler() {}
  second_button_handler() {}
}
