import { Routes } from '@angular/router';
// import { ProductsComponent } from './products/products.component';

export const routes: Routes = [
  // login page on home route
  {
    path: '',
    loadComponent: () =>
      import('./auth/login-page/login-page.component').then(
        (page) => page.LoginPageComponent
      ),
  },
  // signin page on /signin route
  {
    path: 'signin',
    loadComponent: () =>
      import('./auth/signin-page/signin-page.component').then(
        (page) => page.SigninPageComponent
      ),
  },
  // admin page on admin route
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
    path: 'shop',
    loadComponent: () =>
      import('./client/client-outlet/client-outlet.component').then(
        (page) => page.ClientOutletComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./client/client-shop/client-shop.component').then(
            (page) => page.ClientShopComponent
          ),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./client/client-cart/client-cart.component').then(
            (page) => page.ClientCartComponent
          ),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./client/client-orders/client-orders.component').then(
            (page) => page.ClientOrdersComponent
          ),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./page-not-found/page-not-found.component').then(
        (page) => page.PageNotFoundComponent
      ),
  },
];
