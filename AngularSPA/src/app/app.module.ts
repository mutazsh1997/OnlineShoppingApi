import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsListComponent } from './products/list/list.component';
import { ProductDetailsComponent } from './products/details/details.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductService } from './services/product.service';
import { ProductsResolver } from './resolvers/products.resolver';
import { AppMatiralModule } from './app-matiral.module';
import { CarouselComponent } from './carousel/carousel.component';
import { productDetailsResolver } from './resolvers/productDetails.resolver';

import { AuthenticationPopupComponent } from './authentication/authentication-popup.component';
import { ConfirmAuthComponent } from './authentication/confirm-auth/confirm-auth.component';

import { roleAuthGuard } from './gurds/roleAuth.guard';
import { hasRoleDirective } from './shared/hasRole.directive';
import { CheckoutComponent } from './checkout/checkout.component';

import { CreateProductComponent } from './Admin/create-product/create-product.component';
import { ControlPanelComponent } from './Admin/control-panel/control-panel.component';
import { OrderDetailsComponent, OrdersComponent, showInfoComponent } from './Admin/orders/orders.component';
import { CategoryComponent, editCategoryNameComponent } from './Admin/category/category.component';
import { UploadImagesComponent } from './Admin/create-product/upload-images/upload-images.component';
import { SidebarComponent } from './Admin/sidebar/sidebar.component';
import { OrderCoustmerComponent } from './order-coustmer/order-coustmer.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { cartShoppingResolver } from './resolvers/cartShopping.resolver';
import { FooterComponent } from './footer/footer.component';
import { RegsirationsComponent } from './authentication/regsirations/regsirations.component';
import { FiltersPipe } from './shared/filters.pipe';
import { SliceTextPipe } from './shared/slice-text.pipe';
import { ProductsEditorComponent } from './Admin/products-editor/products-editor.component';
import { CreateProductFormComponent, UpdateProductFormDialog } from './Admin/create-product/create-product-form/create-product-form.component';
import { AgmCoreModule } from '@agm/core';
import { sanitizeStylePipe } from './shared/sanitizeStyle.pipe';
 
 

export function tokenGetter() {
  return localStorage.getItem('token');
}


@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
    ProductDetailsComponent,
    NavBarComponent,
    HomePageComponent,
    CarouselComponent,
    RegsirationsComponent,
    AuthenticationPopupComponent,
    ConfirmAuthComponent,
    CheckoutComponent,
    CreateProductComponent,
    CategoryComponent,
    editCategoryNameComponent,
    ControlPanelComponent,
    UploadImagesComponent,
    CreateProductFormComponent,
    UpdateProductFormDialog,
    ProductsEditorComponent,
    OrdersComponent,
    FooterComponent,
    SidebarComponent,
    SpinnerComponent,
    ShoppingCartComponent,
    OrderCoustmerComponent,
    OrderDetailsComponent,
    showInfoComponent,
    hasRoleDirective,
    FiltersPipe,
    SliceTextPipe,
    sanitizeStylePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMatiralModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:5000', '192.168.1.104:45455'],
        disallowedRoutes: ['localhost:5000/api/auth', '192.168.1.104:45455/api/auth'],
      }
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC5t2CEtaiIFLSHAzDg7IbhB2R62wqzrPI'
    })
  ],
  providers: [
    ProductService,
    ProductsResolver,
    cartShoppingResolver,
    productDetailsResolver,
    roleAuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
