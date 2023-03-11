import { Item } from "./../Items/item/item";
import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ServiceService } from "../Services/service.service";
import { NavController } from "@ionic/angular";
@Component({
  selector: "app-categroy",
  templateUrl: "./categroy.component.html",
  styleUrls: ["./categroy.component.scss"],
})
export class CategroyComponent implements OnInit {
  itemsCat: any;
  itemCat: any;

  CatName: any;
  ngOnInit(): void {
    this.CatName = this.active.snapshot.paramMap.get("cat");
    if (this.CatName == "all") {
    } else this.CatName = this.CatName;
    this.service.getAllItems().subscribe((ele: any) => {
      this.itemsCat = ele;
      if (this.CatName == "all") {
        this.itemCat =
          this.itemsCat?.props.pageProps.initialMenuState.menuData.items;
      } else {
        for (let e = 0; e < 16; e++) {
          if (
            this.itemsCat?.props.pageProps.initialMenuState.menuData
              .filteredCategories[e].name == this.CatName
          ) {
            this.itemCat =
              this.itemsCat?.props.pageProps.initialMenuState.menuData.filteredCategories[
                e
              ].items;
          }
        }
      }
    });
  }
  constructor(
    private service: ServiceService,
    private active: ActivatedRoute,
    private nav: NavController
  ) {}
  clickdetail(id: any, Cat: string) {
    Cat = this.CatName;
    this.nav.navigateForward("welcome/" + Cat + "/" + id);
  }
}
