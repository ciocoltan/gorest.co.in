import { Component, OnInit, OnDestroy } from "@angular/core";
import { ApiServicesService } from "../shared/services/api-services.service";
import { UserModel } from "../shared/models/UserModel";
import { Subscription } from "rxjs";
import { UsersObjResModel } from "../shared/models/UsersObjResModel";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit, OnDestroy {
  public items = [];
  public pageOfItems: Array<any>;
  public users: Array<UserModel>;
  public totalUsers: number;
  public showing: string;
  public menu: Array<any> = [];
  private unSubscribe: Subscription = new Subscription();
  private controlCode: UsersObjResModel;
  constructor(private _apiServices: ApiServicesService) {}

  ngOnInit() {
    this.pagination();
  }

  showUsers(pageNum: string) {
    this.unSubscribe.add(
      this._apiServices.getPagesUsers(pageNum).subscribe(res => {
        this.users = res.result;
      })
    );
  }

  pagination() {
    this.unSubscribe.add(
      this._apiServices.getPagesUsers("/users?page=1").subscribe(res => {
        this.totalUsers = res._meta.totalCount;
        this.items = Array(Math.round(res._meta.totalCount / 20))
          .fill(0)
          .map((x, i) => ({
            id: i + 1,
            name: `/users?page=${i + 1}`,
            show: `${(i + 1) * 20 - 19} - ${(i + 1) * 20}`
          }));
      })
    );
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
    this.showUsers(this.pageOfItems[0].name);
    this.showing = this.pageOfItems[0].show;
  }

  deleteCurrentUser(id: string) {
    if (confirm("Are you sure you want to delete this item?")) {
      this.unSubscribe.add(
        this._apiServices.deleteUser(id).subscribe(res => {
          this.controlCode = res;
          if (this.controlCode._meta.code === 204) {
            alert(this.controlCode._meta.message);
            this.showUsers(this.pageOfItems[0].name);
          } else {
            alert(this.controlCode._meta.message);
          }
        })
      );
    }
  }

  ngOnDestroy() {
    this.unSubscribe.unsubscribe();
  }
}
