import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators } from '@angular/forms'
import { ApiService } from '../api.service';
import { forms } from './forms.list';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ListGeneralComponent } from './sub-components/list-general/list-general.component'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  @ViewChild(ListGeneralComponent) listGeneralComponent: ListGeneralComponent;
  forms: object = forms;
  result: any;
  modalRef: any;
  closeResult: string;
  activeModal:NgbActiveModal;
  dataUpdate:any;

  dataShow:string;
  formsData: any;

  constructor(
    public router: Router,
    private modalService: NgbModal,
  ){}

  ngOnInit() {
    this.setView("trayecto");
  }

  setView(view){
    this.dataShow = view;
    this.formsData = forms[this.dataShow];
  }


  open(content, dataUpdate = {}){
    this.dataUpdate = dataUpdate;
    console.log(dataUpdate)
    this.modalRef = this.modalService.open(content, { 
      size: 'lg', 
      backdropClass: 'light-blue-backdrop',
      backdrop: 'static'
    }).result.then(
      ()=>{},
      (resolve)=>{
        this.listGeneralComponent.getData();
      },
    )
  }
}
