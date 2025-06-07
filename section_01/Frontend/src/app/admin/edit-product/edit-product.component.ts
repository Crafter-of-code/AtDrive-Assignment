import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpserviceService } from '../httpservice.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm, PristineChangeEvent } from '@angular/forms';
type single_product_data_type = {
  // _id: string;
  name: string;
  price: number;
  discription: string;
};
@Component({
  selector: 'app-edit-product',
  imports: [FormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export class EditProductComponent {
  single_product_data: single_product_data_type | any = {
    name: '',
    price: 0,
    discription: '',
  };
  constructor(
    private route: ActivatedRoute,
    private httpserver: HttpserviceService,
    private router: Router
  ) {}
  ngOnInit() {
    this.httpserver
      .getSingleProduct(String(this.route.snapshot.paramMap.get('_id')))
      .subscribe({
        next: (data) => {
          this.single_product_data = data;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  updateForm_method(data: NgForm) {
    this.httpserver.update_product_handler(
      String(this.route.snapshot.paramMap.get('_id')),
      data.value
    );
    data.reset();
    this.router.navigate(['/']);
  }
}
