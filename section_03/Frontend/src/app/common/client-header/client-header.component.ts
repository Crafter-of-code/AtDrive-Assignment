import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-client-header',
  imports: [RouterLink, FormsModule],
  templateUrl: './client-header.component.html',
  styleUrl: './client-header.component.css',
})
export class ClientHeaderComponent {
  search_data = {
    value: '',
  };
  search_form_submit_handler(seachForm: NgForm) {
    console.log(seachForm.value);
  }
}
