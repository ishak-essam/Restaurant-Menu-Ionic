import { ServiceService } from "./Services/service.service";
import { Component, OnChanges, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-welcome-page",
  templateUrl: "./welcome-page.page.html",
  styleUrls: ["./welcome-page.page.scss"],
})
export class WelcomePagePage implements OnInit, OnChanges {
  constructor(private service: ServiceService) {}
  // SelectSegment = "Delivery";
  // @Output() Cat!: string;
  // SelectSegmentChanged(ele: any) {
  //   this.SelectSegment = ele.detail.value;
  //   // ele.style.color = 'primary';
  // }
  // filter(event: any) {
  //   this.Cat = event.target;
  // }
  ngOnInit() {
    this.service.getAllItems().subscribe((ele) => {
      this.srcImgs = ele;
      this.srcImg = this.srcImgs?.props.pageProps.gtmEventData.restaurant.logo;
    });
    this.GetAllcategories();
  }
  category: any;
  srcImgs: any;
  categories: any;
  srcImg: any;
  GetAllcategories() {
    this.service.getAllItems().subscribe(
      (ele: any) => {
        this.categories = ele;
        this.category =
          ele?.props.pageProps.initialMenuState.menuData.categories;
      },
      (ero) => {
        alert(ero.status);
      }
    );
    this.category =
      this.categories?.props.pageProps.initialMenuState.menuData.categories;
  }
  ngOnChanges(): void {}
  // pageProps.gtmEventData.restaurant.logo
}
