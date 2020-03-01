import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { UsersComponent } from "./users/users.component";
import { UpdateComponent } from "./update/update.component";
import { ViewComponent } from "./view/view.component";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: "home",
    component: HomeComponent,
    data: { breadcrumb: "Home" },
    children: [
      { path: "", redirectTo: "users", pathMatch: "full" },
      {
        path: "users?page=:id",
        component: UsersComponent,
        data: { breadcrumb: "Users" }
      },
      {
        path: "users",
        data: { breadcrumb: "Users" },
        children: [
          {
            path: "",
            data: { breadcrumb: "null" },
            component: UsersComponent
          },
          {
            path: "update",
            data: { breadcrumb: "Update" },
            children: [
              {
                path: "",
                data: { breadcrumb: "null" },
                component: UpdateComponent
              },
              {
                path: ":id",
                data: { breadcrumb: "Id" },
                children: [
                  {
                    path: "",
                    data: { breadcrumb: "null" },
                    component: UpdateComponent
                  }
                ]
              }
            ]
          },
          {
            path: "view/:id",
            data: { breadcrumb: "View" },
            children: [
              {
                path: "",
                data: { breadcrumb: "null" },
                component: ViewComponent
              }
            ]
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
