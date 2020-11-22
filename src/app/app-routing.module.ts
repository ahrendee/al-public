import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { EpkComponent } from './epk/epk.component';
import { GigsComponent } from './gigs/gigs.component';
import { GigsResolver } from './gigs/services/gigs.resolver';
import { HomeComponent } from './home/home.component';
import { MaterialComponent } from './material/material.component';
import { PixflixComponent } from './pixflix/pixflix.component';
import { ShopComponent } from './shop/shop.component';
import { SuccessfullPurchaseComponent } from './shop/successfull-purchase/successfull-purchase.component';
import { VideosComponent } from './videos/videos.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'gigs', component: GigsComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'successful-purchase', component: SuccessfullPurchaseComponent},
  {path: 'epk', component: EpkComponent},
  {path: 'music', component: MaterialComponent},
  {path: 'pictures', component: PixflixComponent},
  {path: 'videos', component: VideosComponent},
  {path: 'contact', component: ContactComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
