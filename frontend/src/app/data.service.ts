import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
  data: any;
  constructor() { }

  setData(value: any) {
    this.data = value;
  }
  getData() {
    return this.data;
  }
}
