import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { SentUserModel } from "../models/SentUserModel";
import { UsersObjResModel } from "../models/UsersObjResModel";
import { UsersResponseModel } from "../models/UsersResponseModel";

@Injectable({
  providedIn: "root"
})
export class ApiServicesService {
  private url = "/users";
  constructor(private http: HttpClient) {}

  getPagesUsers(pageNum: string): Observable<UsersResponseModel> {
    return this.http.get<UsersResponseModel>(pageNum);
  }
  getUsers(): Observable<UsersResponseModel> {
    return this.http.get<UsersResponseModel>(this.url);
  }
  getUser(id: string): Observable<UsersObjResModel> {
    return this.http.get<UsersObjResModel>(`${this.url}/${id}`);
  }
  deleteUser(id: string): Observable<UsersObjResModel> {
    return this.http.delete<UsersObjResModel>(`${this.url}/${id}`);
  }
  sendForm(form: SentUserModel) {
    return this.http.post<UsersObjResModel>(this.url, form);
  }
  editForm(id: string, form: SentUserModel) {
    return this.http.put<UsersObjResModel>(`${this.url}/${id}`, form);
  }
}
