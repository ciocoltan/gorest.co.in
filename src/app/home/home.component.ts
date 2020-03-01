import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  public languages: { id: string; title: string }[] = [];
  constructor(private _translateService: TranslateService) {}

  ngOnInit() {
    this._translateService.use(environment.defaultLocale);
    this.languages = environment.locales.map(x => {
      return { id: x, title: `${x.toUpperCase()}`};
    });
  }

  changeLanguage(lang: string) {
    this._translateService.use(lang);
  }
}
