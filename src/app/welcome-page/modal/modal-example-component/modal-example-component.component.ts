import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {
  AlertController,
  ModalController,
  ToastController,
} from "@ionic/angular";
import { ServiceService } from "../../Services/service.service";

@Component({
  selector: "modal",
  templateUrl: "./modal-example-component.component.html",
  styleUrls: ["./modal-example-component.component.scss"],
})
export class ModalExampleComponentComponent implements OnInit {
  TotalPriceChocies: number = 0;
  hasChoicesModel: any;
  constructor(
    private modalCtrl: ModalController,
    private service: ServiceService,
    private toast: ToastController,
    private alert: AlertController
  ) {}
  @Output() TotalPrice = new EventEmitter<number>();
  ngOnInit() {
    this.GetAllChoicesModel();
  }
  cancel() {
    return this.modalCtrl.dismiss(null, "cancel");
  }
  checkBox(count: number, event: any) {
    if (event.detail.checked) {
      this.TotalPriceChocies += count;
      this.TotalPrice.emit(this.TotalPriceChocies);
    } else if (!event.detail.checked) {
      this.TotalPriceChocies -= count;
      this.TotalPrice.emit(this.TotalPriceChocies);
    }
    // console.log(this.TotalPriceChocies);
  }
  GetAllChoicesModel() {
    this.service.getChoice().subscribe(
      (ele: any) => {
        this.hasChoicesModel =
          ele?.result.choiceForItem[0].choiceSections[0].ich;
        console.log(this.hasChoicesModel);
      },
      (ero) => {
        alert(ero.status);
      }
    );
  }
  async alertsModel() {
    let alerts = await this.alert.create({
      header: "Are You sure to Add Your Cart ?",
      buttons: [
        {
          text: "Yes",
          role: "Yes",
          handler: () => {
            this.modalCtrl.dismiss(null, "cancel");
            this.ToastsModel();
          },
        },
        { text: "No", role: "No" },
      ],
    });
    await alerts.present();
  }
  async ToastsModel() {
    let Toasting = await this.toast.create({
      message: "Successful",
      position: "top",
      duration: 3000,
      color: "success",
      icon: "right",
    });
    await Toasting.present();
  }
}
