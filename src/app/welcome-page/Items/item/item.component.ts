import { ModalExampleComponentComponent } from "./../../modal/modal-example-component/modal-example-component.component";
import { ServiceService } from "./../../Services/service.service";
import { OverlayEventDetail } from "@ionic/core/components";
import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import {
  AlertController,
  IonModal,
  ModalController,
  NavController,
  ToastController,
} from "@ionic/angular";
import { HttpClient } from "@angular/common/http";
import { ItemChoiceJson } from "src/assets/Interface/item-menu";
import { Router } from "@angular/router";
@Component({
  selector: "app-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.scss"],
})
export class ItemComponent implements OnInit, OnChanges {
  items: any;
  item: any;
  hasChoices: any;
  ChossieCat!: string;
  categories: any;
  category: any;
  ItemChoice!: ItemChoiceJson;
  constructor(
    private NavCtrl: NavController,
    private service: ServiceService,
    private http: HttpClient,
    private toast: ToastController,
    private alert: AlertController,
    private router: Router,
    private modalCtrl: ModalController
  ) {}
  presentingElement = null;
  ngOnInit(): void {
    this.presentingElement != document.querySelector(".ion-page");
    this.GetAll();
    this.GetAllcategories();
  }
  GetAll() {
    this.service.getAllItems().subscribe(
      (ele: any) => {
        this.items = ele;
        this.item = ele?.props.pageProps.initialMenuState.menuData.items;
      },
      (ero) => {
        alert(ero.status);
      }
    );
  }
  FilterData: any = "";
  GetFilters() {}
  GetCatgroy(event: any) {
    this.ChossieCat = event;
    for (let e = 0; e < 16; e++) {
      if (
        this.items?.props.pageProps.initialMenuState.menuData
          .filteredCategories[e].name == this.ChossieCat
      ) {
        this.item =
          this.items?.props.pageProps.initialMenuState.menuData.filteredCategories[
            e
          ].items;
      } else if (this.ChossieCat == "all") {
        this.item = this.items?.props.pageProps.initialMenuState.menuData.items;
      }
    }
  }
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
  ngOnChanges(changes: SimpleChanges): void {
    this.GetCatgroy(this.ChossieCat);
  }
  message =
    "This modal example uses the modalController to present and dismiss modals.";

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

  async SendItem(
    nameHTML: string,
    pricehtHTML: number,
    hasChoicesHTML: boolean,
    sectionNameHTML: string
  ) {
    let alerts = await this.alert.create({
      header: "Are You sure to Add Your Cart ?",
      buttons: [
        {
          text: "Yes",
          role: "Yes",
          handler: () => {
            this.ItemChoice = {
              items: [
                {
                  name: nameHTML,
                  price: pricehtHTML,
                  hasChoices: hasChoicesHTML,
                  sectionName: sectionNameHTML,
                  choices: [
                    {
                      nm: "",
                      State: false,
                    },
                  ],
                },
              ],
            };
            this.service.PostCart(this.ItemChoice);
            this.Toasts();
          },
        },
        { text: "No", role: "No" },
      ],
    });
    await alerts.present();
  }
  async Toasts() {
    let Toasting = await this.toast.create({
      message: "Successful Done ",
      position: "top",
      duration: 3000,
      color: "success",
      icon: "right",
    });
    await Toasting.present();
  }
  Nag(originalSection: string, id: number) {
    this.NavCtrl.pop().then(() => {
      this.NavCtrl.navigateForward("welcome/" + originalSection + "/" + id);
      //'welcome/{{ itdata.originalSection }}/{{itdata.id}}'
    });
  }

  SelectSegment: string = "Form1";
  SelectSegmentChanged(ele: any) {
    this.SelectSegment = ele.detail.value;
    // ele.style.color = 'primary';
  }
}
