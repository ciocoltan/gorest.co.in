import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BreadcrumbModule } from "angular-crumbs";
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from "@angular/common/http";
import { JwtInterceptor } from "./shared/interceptor/httpInterceptor";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { UsersComponent } from "./users/users.component";
import { SharedModule } from "./shared/shared.module";

import { JwPaginationComponent } from "jw-angular-pagination";
import { UpdateComponent } from "./update/update.component";
import { ViewComponent } from "./view/view.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { TranslateModule, TranslateLoader, MissingTranslationHandler } from "@ngx-translate/core"
import { HttpLoaderFactory } from './shared/translation/http-loader-factory';
import { MissingTranslationService } from './shared/translation/missing-translation-service';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    JwPaginationComponent,
    UpdateComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    BreadcrumbModule,
    ReactiveFormsModule,
    FormsModule,
    NoopAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      missingTranslationHandler: { provide: MissingTranslationHandler, useClass: MissingTranslationService },
      useDefaultLang: false,
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
