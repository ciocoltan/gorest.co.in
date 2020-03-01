import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiServicesService } from "../shared/services/api-services.service";
import { UsersObjResModel } from "../shared/models/UsersObjResModel";
import { UserModel } from "../shared/models/UserModel";
import { Subscription } from "rxjs";

@Component({
  selector: "app-view",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.scss"]
})
export class ViewComponent implements OnInit, OnDestroy {
  public currentUser: UserModel;
  private controlCode: UsersObjResModel;
  private unSubscribe: Subscription = new Subscription();
  constructor(
    private activatedRoute: ActivatedRoute,
    private _apiServices: ApiServicesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.activatedRoute.params.forEach(params => {
      if (params["id"]) {
        this.unSubscribe.add(
          this._apiServices.getUser(params["id"]).subscribe(res => {
            this.currentUser = res.result;
          })
        );
      }
    });
  }
  deleteCurrentUser() {
    if (confirm("Are you sure you want to delete this item?")) {
      this.unSubscribe.add(
        this._apiServices.deleteUser(this.currentUser.id).subscribe(res => {
          this.controlCode = res;
          if (this.controlCode._meta.code === 204) {
            alert(this.controlCode._meta.message);
            this.router.navigate(["home/users"]);
          } else {
            alert(this.controlCode._meta.message);
          }
        })
      );
    }
  }
  goToUpdate() {
    this.router.navigate([`home/users/update/${this.currentUser.id}`]);
  }
  ngOnDestroy() {
    this.unSubscribe.unsubscribe();
  }
}
