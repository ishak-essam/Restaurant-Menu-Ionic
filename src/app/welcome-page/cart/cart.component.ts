import { HttpClient } from "@angular/common/http";
import { CartInterface } from "./cart-interface";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  constructor(private Http: HttpClient) {}
  CartaAdded!: CartInterface;
  Items: any;
  itmelocal: any;
  Choices!: any;
  TotalPrice!: number;
  CartItems: any;
  ngOnInit() {
    this.GetAllItemCards();
    this.GetPriceTotal();
  }
  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.GetAllItemCards();
    this.GetPriceTotal();
  }
  GetAllItemCards() {
    this.CartItems = JSON.parse(localStorage.getItem("Items")!);
  }
  plus(index: number) {
    this.CartItems[index].quantity += 1;
    console.log(this.CartItems[index].quantity);
    localStorage.setItem(`Items`, JSON.stringify(this.CartItems));
    this.GetPriceTotal();
  }
  mins(index: number) {
    if (this.CartItems[index].quantity > 0) this.CartItems[index].quantity -= 1;
    console.log(this.CartItems[index].quantity);
    localStorage.setItem(`Items`, JSON.stringify(this.CartItems));
    this.GetPriceTotal();
  }
  deleteItem(index: any) {
    this.CartItems.splice(index, 1);
    localStorage.setItem("Items", JSON.stringify(this.CartItems));
  }
  GetPriceTotal() {
    this.TotalPrice = 0;
    for (let index in this.CartItems) {
      this.TotalPrice +=
        this.CartItems[index].price * this.CartItems[index].quantity;
    }
  }
  changeQuantity(index: number, Qunt: any) {
    this.CartItems[index].quantity = Qunt.value;
    localStorage.setItem(`Items`, JSON.stringify(this.CartItems));
    this.GetPriceTotal();
  }
  RemoveAll() {
    this.CartItems.splice(0, this.CartItems.length);
    console.log(this.CartItems);
    localStorage.removeItem("Items");
  }
}
