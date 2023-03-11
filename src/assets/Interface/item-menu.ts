// export interface ItemMenu {
//   "id": number,
//   "name": string,
//   "description":string,
//   "price": number,
//   "oldPrice": number,
//   "rating": number,
//   "image": string,
//   "originalImage": string,
//   "hasChoices": false,
//   "sectionName": string|null,
//   "sectionId": number,
//   "originalSection": string,
//   "isItemDiscount": boolean,
//   "isWithImage": boolean

import { Interface } from "readline"

// }
export interface ItemChoiceJson
{
  "items": [{
      "name": string,
      "price": number,
      "hasChoices": boolean,
      "sectionName": string,
      "choices": [{
          "nm": string,
          "State": boolean
      }]
  }]
}
