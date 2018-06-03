import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss']
})
export class CheckinComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
  
  login() {
    this.router.navigate(['/dashboard']);
  }

}
