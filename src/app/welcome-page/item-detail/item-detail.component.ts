import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ServiceService } from "../Services/service.service";
import {
  AlertController,
  ModalController,
  ToastController,
} from "@ionic/angular";
import { ModalExampleComponentComponent } from "../modal/modal-example-component/modal-example-component.component";

@Component({
  selector: "app-item-detail",
  templateUrl: "./item-detail.component.html",
  styleUrls: ["./item-detail.component.scss"],
})
export class ItemDetailComponent implements OnInit {
  disable!: boolean;
  id: any;
  filterCat: any;
  CatName!: any;
  hasChoices: any;
  ItemChoice: any;
  ProductDetail: any;
  constructor(
    private active: ActivatedRoute,
    private service: ServiceService,
    private alert: AlertController,
    private toast: ToastController,
    private modalCtrl: ModalController
  ) {}
  ngOnInit() {
    this.id = this.active.snapshot.paramMap.get("id");
    this.CatName = this.active.snapshot.paramMap.get("cat");
    this.GetItem();
  }
  TotalPriceCh: number = 0;
  TotalPriceChoices(event: any) {
    console.log(event);
    this.TotalPriceCh = event;
  }

  GetItem() {
    this.service.getAllItems().subscribe((ele: any) => {
      this.filterCat = ele;
      this.filterCat =
        this.filterCat?.props.pageProps.initialMenuState.menuData.filteredCategories;
      for (let e = 0; e < 16; e++) {
        if (this.filterCat[e].name == this.CatName) {
          for (let ea of this.filterCat[e].items) {
            if (ea.id == +this.id) {
              this.ProductDetail = ea;
            }
          }
        }
      }
    });
  }
  plus() {
    if (this.quantityHtml >= 1) {
      this.disable = false;
      this.quantityHtml++;
    }
  }
  GetAllChoices() {
    this.service.getChoice().subscribe(
      (ele: any) => {
        this.hasChoices = ele?.result.choiceForItem[0].choiceSections[0].ich;
        console.log(this.hasChoices);
      },
      (ero) => {
        alert(ero.status);
      }
    );
  }
  mins() {
    if (this.quantityHtml > 1) this.quantityHtml--;
    else if (this.quantityHtml == 1) {
      this.disable = true;
    }
  }
  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.id = this.active.snapshot.paramMap.get("id");
    this.CatName = this.active.snapshot.paramMap.get("cat");
    this.GetItem();
    this.SendItem();
  }
  message: string = "Choices";
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ModalExampleComponentComponent,
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();

    if (role === "confirm") {
      this.message = `Hello, ${data}!`;
    }
  }

  testadded: boolean = true;
  quantityHtml: number = 1;
  async SendItem() {
    if (this.TotalPriceCh == 0) {
      alert("You Must Choice one of Add-On");
    } else {
      let alerts = await this.alert.create({
        header: "Are You sure to Add Your Cart ?",
        buttons: [
          {
            text: "Yes",
            role: "Yes",
            handler: () => {
              this.ItemChoice = {
                name: this.ProductDetail?.name,
                quantity: this.quantityHtml,
                price: this.ProductDetail?.price,
                hasChoices: this.ProductDetail?.hasChoices,
                sectionName: this.ProductDetail?.originalSection,
                Image: this.ProductDetail?.originalImage,
                choices: [
                  {
                    nm: "",
                    State: false,
                  },
                ],
              };

              if (JSON.parse(localStorage.getItem("Items")!).length > 0) {
                this.Items = JSON.parse(localStorage.getItem("Items")!);
                let index = 0;
                for (let items of this.Items) {
                  if (items.name == this.ItemChoice.name) {
                    if (items.quantity == this.ItemChoice.quantity) {
                      this.alertDubl();
                      console.log(true);
                      this.testadded = false;
                    } else {
                      this.testadded = false;
                      this.Items[index] = this.ItemChoice;
                      this.ToastsUpdated();
                      // this.Items.push(this.ItemChoice);
                      localStorage.setItem("Items", JSON.stringify(this.Items));
                    }
                  }
                  index++;
                }
                if (this.testadded) {
                  this.Items.push(this.ItemChoice);
                  localStorage.setItem("Items", JSON.stringify(this.Items));
                  this.Toasts();
                }
              } else {
                this.Items = [];
                this.Items.push(this.ItemChoice);
                localStorage.setItem("Items", JSON.stringify(this.Items));
                this.Toasts();
              }
            },
          },
          { text: "No", role: "No" },
        ],
      });
      await alerts.present();
    }
  }
  async Toasts() {
    let Toasting = await this.toast.create({
      message: "Successful  Added ",
      position: "top",
      duration: 2000,
      color: "success",
      icon: "right",
    });
    await Toasting.present();
  }
  async ToastsUpdated() {
    let Toasting = await this.toast.create({
      message: "Successful  Updated ",
      position: "top",
      duration: 2000,
      color: "success",
      icon: "right",
    });
    await Toasting.present();
  }
  async alertDubl() {
    let Toasting = await this.toast.create({
      message: "It is already existing , the same product and quantity  ",
      position: "bottom",
      duration: 2000,
      color: "danger",
      // icon: "right",
    });
    await Toasting.present();
  }
  Items: any;
}
