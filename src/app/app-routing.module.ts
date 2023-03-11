import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { RehanaPageModule } from "./rehana/rehana.module";
// const routes: Routes = [
//   {
//     path: "",
//     loadChildren: () =>
//       import("./rehana/rehana.module").then((m) => m.RehanaPageModule),
//   },
// ];

const routes: Routes = [
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "",
    loadChildren: () =>
      import("./welcome-page/welcome-page.module").then(
        (m) => m.WelcomePagePageModule
      ),
  },
  {
    path: 'rehana',
    loadChildren: () => import('./rehana/rehana.module').then( m => m.RehanaPageModule)
  },
  // {
  //   path: "item",
  //   loadChildren: () =>
  //     import("./item-detail/item-detail.module").then(
  //       (m) => m.ItemDetailPageModule
  //     ),
  // },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
