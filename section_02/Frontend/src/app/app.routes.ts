import { Routes } from '@angular/router';
// import { ProductsComponent } from './products/products.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./auth/login-page/login-page.component').then(
        (page) => page.LoginPageComponent
      ),
    children: [],
  },
  {
    path: 'signin',
    loadComponent: () =>
      import('./auth/signin-page/signin-page.component').then(
        (page) => page.SigninPageComponent
      ),
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./admin/admin-home-page/admin-home-page.component').then(
        (page) => page.AdminHomePageComponent
      ),
  },
  {
    path: 'admin/products',
    loadComponent: () =>
      import('./admin/products/products.component').then(
        (page) => page.ProductsComponent
      ),
  },
  {
    path: 'admin/addproduct',
    loadComponent: () =>
      import('./admin/add-product/add-product.component').then(
        (page) => page.AddProductComponent
      ),
  },
  {
    path: 'admin/products/:_id',
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
