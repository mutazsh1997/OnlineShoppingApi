import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { ControlPanelComponent } from './Admin/control-panel/control-panel.component';
import { OrdersComponent } from './Admin/orders/orders.component';
import { roleAuthGuard } from './gurds/roleAuth.guard';

import { HomePageComponent } from './home-page/home-page.component';
import { ProductDetailsComponent } from './products/details/details.component';
import { productDetailsResolver } from './resolvers/productDetails.resolver';
import { ProductsResolver } from './resolvers/products.resolver';
import { CreateProductComponent } from './Admin/create-product/create-product.component';
import { CategoryComponent } from './Admin/category/category.component';
import { OrderCoustmerComponent } from './order-coustmer/order-coustmer.component';
import { ProductsListComponent } from './products/list/list.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { cartShoppingResolver } from './resolvers/cartShopping.resolver';
import { CustomerGuard } from './gurds/customer.guard';
import { RegsirationsComponent } from './authentication/regsirations/regsirations.component';
import { ConfirmAuthComponent } from './authentication/confirm-auth/confirm-auth.component';
import { ProductsEditorComponent } from './Admin/products-editor/products-editor.component';


const routes: Routes = [
  { path: "", component: HomePageComponent },
  { path: "registration", component: RegsirationsComponent },
  { path: "productList", component: ProductsListComponent, resolve: { products: ProductsResolver }, runGuardsAndResolvers: 'always' },
  { path: "productQuery", component: ProductsListComponent, resolve: { products: ProductsResolver }, runGuardsAndResolvers: 'always' },
  { path: "productDetails", component: ProductDetailsComponent, resolve: { productDetails: productDetailsResolver, products: ProductsResolver }, runGuardsAndResolvers: 'always' },
  { path: "shoppingCart", component: ShoppingCartComponent, resolve: { shoppingCart: cartShoppingResolver } },

  { path: "confirmAuth", component: ConfirmAuthComponent },
  { path: "checkout", component: CheckoutComponent, canActivate: [CustomerGuard] },
  { path: "orderCoustmer", component: OrderCoustmerComponent, canActivate: [CustomerGuard] },

  //Admin path
  {
    path: 'controlPanel',
    runGuardsAndResolvers: 'always',
    canActivate: [roleAuthGuard],
    data: { roles: ['Admin'] },
    component: ControlPanelComponent,
    children: [
      { path: "createProduct", component: CreateProductComponent },
      { path: "orders", component: OrdersComponent },
      { path: "category", component: CategoryComponent },
      { path: "productsEditor", component: ProductsEditorComponent, resolve: { products: ProductsResolver } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
