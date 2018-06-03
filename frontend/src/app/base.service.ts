import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
/*
  Generated class for the BaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BaseService {

  constructor(public http: HttpClient) {

  }

  public request(method: string, url: string, params, hd): Observable<any> {
    const body: any = (params !== '' ? params : false);
    const pm = new HttpParams();

    Object.keys(body).map((key: any): void => {
      pm.append(key, params[key]);
    });


    //hd['Content-Type'] = 'application/json';
    //hd['Access-Control-Allow-Methods'] = "POST, GET, PUT, DELETE, OPTIONS"
    hd['Content-Type'] = 'application/json';
    hd['Accept'] = 'application/json';

    const req = new HttpRequest(method, url, params, {
      reportProgress: true,
      responseType: 'json',
      headers: new HttpHeaders(hd)
    });

    return this.http.request(req).map((res: any) => res);

  }

}
