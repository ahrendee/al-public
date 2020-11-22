import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { LightboxModule } from 'ngx-lightbox';
import { NgxPayPalModule } from 'ngx-paypal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CounterComponent } from './components/counter/counter.component';
import { CounterModule } from './components/counter/counter.module';
import { HeaderComponent } from './components/header/header.component';
import { MailinglistComponent } from './components/mailinglist/mailinglist.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { MenuService } from './components/navigation-bar/services/menu.service';
import { PaypalIntegrationComponent } from './components/paypal-integration/paypal-integration.component';
import { SubheaderComponent } from './components/subheader/subheader.component';
import { ContactComponent } from './contact/contact.component';
import { EpkComponent } from './epk/epk.component';
import { GigsComponent } from './gigs/gigs.component';
import { GigsResolver } from './gigs/services/gigs.resolver';
import { GigsService } from './gigs/services/gigs.service';
import { HomeComponent } from './home/home.component';
import { CarouselService } from './home/services/carousel.service';
import { HttpConfigInterceptor } from './interceptor/http.interceptor';
import { MaterialComponent } from './material/material.component';
import { PixflixComponent } from './pixflix/pixflix.component';
import { AuthenticationService } from './services/authentication.service';
import { ArticleService } from './shop/services/article.service';
import { CountryService } from './shop/services/country.service';
import { PayPalService } from './shop/services/pay-pal.service';
import { ShoppingBasketService } from './shop/services/shopping-basket.service';
import { ShopComponent } from './shop/shop.component';
import { SuccessfullPurchaseComponent } from './shop/successfull-purchase/successfull-purchase.component';
import { BaseService } from './util/BaseService.service';
import { VideosComponent } from './videos/videos.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    HomeComponent,
    GigsComponent,
    ShopComponent,
    HeaderComponent,
    EpkComponent,
    ContactComponent,
    MaterialComponent,
    SubheaderComponent,
    MailinglistComponent,
    PixflixComponent,
    VideosComponent,
    CounterComponent,
    PaypalIntegrationComponent,
    SuccessfullPurchaseComponent
  ],
  imports: [
    StoreModule.forRoot({}),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPayPalModule,
    LightboxModule,
    CounterModule
  ],
  providers: [
    BaseService,
    MenuService,
    GigsService,
    CarouselService,
    ShoppingBasketService,
    CountryService,
    ArticleService,
    PayPalService,
    GigsResolver,
    AuthenticationService,
    {provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
