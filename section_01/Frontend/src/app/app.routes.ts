import { Routes } from '@angular/router';
// import { ProductsComponent } from './products/products.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./admin/admin-home-page/admin-home-page.component').then(
        (page) => page.AdminHomePageComponent
      ),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./admin/products/products.component').then(
        (page) => page.ProductsComponent
      ),
  },
  {
    path: 'addproduct',
    loadComponent: () =>
      import('./admin/add-product/add-product.component').then(
        (page) => page.AddProductComponent
      ),
  },
  {
    path: 'products/:_id',
    loadComponent: () =>
      import('./admin/edit-product/edit-product.component').then(
        (page) => page.EditProductComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./page-not-found/page-not-found.component').then(
        (page) => page.PageNotFoundComponent
      ),
  },
];
