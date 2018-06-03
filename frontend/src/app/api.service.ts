import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseService } from './base.service';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiService extends BaseService {

  url = 'http://localhost:8000/';

  constructor(public http: HttpClient) {
    super(http);
  }

  getany(data: object): Observable<any> {
    return this.request(data['method'], this.url  + data['path'], data['params'] || [], data['hd'] || {});
  }

}
