import { ItemChoiceJson } from "src/assets/Interface/item-menu";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class ServiceService {
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllItems();
    this.getChoice();
  }
  constructor(private http: HttpClient) {}
  getAllItems() {
    return this.http.get("../../../assets/Json/Tababat.json");
  }
  getChoice() {
    return this.http.get("../../../assets/Json/choise.json");
  }

  PostCart(Obj: ItemChoiceJson) {
    return this.http.post("../../../assets/Json/Cart.json", Obj);
  }
}
