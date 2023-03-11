import { CartComponent } from "./cart/cart.component";
import { CategroyComponent } from "./categroy/categroy.component";
import { ModalExampleComponentComponent } from "./modal/modal-example-component/modal-example-component.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { WelcomePagePageRoutingModule } from "./welcome-page-routing.module";
import { WelcomePagePage } from "./welcome-page.page";
import { HeaderComponent } from "./header/header.component";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { ItemComponent } from "./Items/item/item.component";
import { ItemDetailComponent } from "./item-detail/item-detail.component";
@NgModule({
  declarations: [
    WelcomePagePage,
    HeaderComponent,
    NavBarComponent,
    ItemComponent,
    ModalExampleComponentComponent,
    CategroyComponent,
    ItemDetailComponent,
    CartComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WelcomePagePageRoutingModule,
  ],
  exports: [],
})
export class WelcomePagePageModule {}
