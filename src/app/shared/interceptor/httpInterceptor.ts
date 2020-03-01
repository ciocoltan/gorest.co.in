import {HttpInterceptor,HttpRequest,HttpHandler,HttpEvent} from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const checkLocalhost:RegExp = /^\./;
    if (!checkLocalhost.exec(request.url)){
 // add authorization header with jwt token if available
    const token = "gtDRPcH6V79HpXgLV8XomXKcxRxqj0AidK2T";

    if (token) {
      request = request.clone({
        setHeaders: { Authorization: "Bearer " + token }
      });
    }
    const exp = /^(http:|https:)/;
    if (!exp.exec(request.url)) {
      const url = "https://gorest.co.in/public-api";

      request = request.clone({
        url: url + request.url
      });
    }
    return next.handle(request);
    }else {
      return next.handle(request);
    }

  }
}
