import { Component, OnInit, OnDestroy } from "@angular/core";
import { ApiServicesService } from "../shared/services/api-services.service";
import { UserModel } from "../shared/models/UserModel";
import { Subscription } from "rxjs";
import { UsersObjResModel } from "../shared/models/UsersObjResModel";
import { FormGroup, FormBuilder } from "@angular/forms";

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
  public formFilter: FormGroup;
  private apiUrl: string;
  private filterUrl: string;
  public statusUser: Array<string> = ["", "active", "inactive"];
  public genderUser: Array<string> = ["", "male", "female"];
  constructor(
    private _apiServices: ApiServicesService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.filterForm();
    this.pagination();
  }

  showUsers(pageNum: string) {
    this.unSubscribe.add(
      this._apiServices.getPagesUsers(pageNum).subscribe(res => {
        this.users = res.result;
        this.filterUrl = undefined;
      })
    );
  }

  pagination() {
    this.filter();
    this.unSubscribe.add(
      this._apiServices.getPagesUsers(this.apiUrl).subscribe(res => {
        this.totalUsers = res._meta.totalCount;
        this.items = Array(res._meta.pageCount)
          .fill(0)
          .map((x, i) => ({
            id: i + 1,
            name: `/users?page=${i + 1}`,
            show: `${(i + 1) * 20 - 19} - ${(i + 1) * 20}`
          }));
      })
    );
  }
  filterForm() {
    this.formFilter = this.fb.group({
      first_name: [""],
      last_name: [""],
      gender: [""],
      email: [""],
      phone: [""],
      status: [""]
    });
  }
  filter() {
    this.apiUrl = "/users";
    if (
      this.formFilter.controls.first_name.dirty == true &&
      this.formFilter.controls.first_name.value !== ""
    ) {
      this.filterUrl = `?first_name=${this.formFilter.controls.first_name.value}`;
      this.apiUrl += this.filterUrl;
    } else if (
      this.formFilter.controls.last_name.dirty == true &&
      this.formFilter.controls.last_name.value !== ""
    ) {
      this.filterUrl = `?last_name=${this.formFilter.controls.last_name.value}`;
      this.apiUrl += this.filterUrl;
    } else if (
      this.formFilter.controls.gender.dirty == true &&
      this.formFilter.controls.gender.value !== ""
    ) {
      this.filterUrl = `?gender=${this.formFilter.controls.gender.value}`;
      this.apiUrl += this.filterUrl;
    } else if (
      this.formFilter.controls.email.dirty == true &&
      this.formFilter.controls.email.value !== ""
    ) {
      this.filterUrl = `?email=${this.formFilter.controls.email.value}`;
      this.apiUrl += this.filterUrl;
    } else if (
      this.formFilter.controls.phone.dirty == true &&
      this.formFilter.controls.phone.value !== ""
    ) {
      this.filterUrl = `?phone=${this.formFilter.controls.phone.value}`;
      this.apiUrl += this.filterUrl;
    } else if (
      this.formFilter.controls.status.dirty == true &&
      this.formFilter.controls.status.value !== ""
    ) {
      this.filterUrl = `?status=${this.formFilter.controls.status.value}`;
      this.apiUrl += this.filterUrl;
    }
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
    if (this.filterUrl == undefined) {
      this.showUsers(this.pageOfItems[0].name);
    } else {
      this.showUsers(this.apiUrl);
    }
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
