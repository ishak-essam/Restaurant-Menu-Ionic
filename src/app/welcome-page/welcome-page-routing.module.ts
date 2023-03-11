import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ItemDetailComponent } from "./item-detail/item-detail.component";
import { CategroyComponent } from "./categroy/categroy.component";
import { WelcomePagePage } from "./welcome-page.page";
import { CartComponent } from "./cart/cart.component";
const routes: Routes = [
  {
    path: "",
    component: WelcomePagePage,
  },
  { path: "welcome/cart", component: CartComponent },
  { path: "welcome/:cat", component: CategroyComponent },
  { path: "welcome/:cat/:id", component: ItemDetailComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomePagePageRoutingModule {}
