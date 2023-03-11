export interface CartInterface {
  item: [
    {
      name: string;
      price: number;
      image: string;
      hasChoices: true;
      sectionName: string;
      choices: [
        {
          nm: string;
          State: boolean;
        }
      ];
    }
  ];
}
