import { Component, OnInit, Input, SimpleChanges} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../api.service';
import { ToastrService } from 'ngx-toastr';
import { forms } from '../../forms.list';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'general-list',
  templateUrl: './list-general.component.html',
  styleUrls: ['./list-general.component.scss']
})

export class ListGeneralComponent implements OnInit {
  @Input() data: any;
  @Input() editItem:any;
  @Input() openEditModal: any;

  defaultValues: any;
  dataUpdate:any;
  listData:any;
  closeResult: string;
  forms: any;

  constructor(
    private toastr: ToastrService, 
    public api:ApiService,
    private modalService: NgbModal,
    public router: Router){}

  ngOnInit() {
    this.forms= forms;
    this.getData()
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getData()
  }

  delete(id){
    let result: any;
    const data: object = {
      method: 'DELETE',
      path: this.data.urlCrud+id+'/',
    };
    this.api.getany(data)
      .subscribe(
        (data: any): any => {
          this.listData = data.body;
        },
        (e: any) => {
          console.log(e);
          this.toastr.error('Algo va mal, en algun lado la cague xD... oops','Error');
        },
        ()=>{
          this.toastr.success( this.data.mainLabelSingular+' eliminado exitosamente','Success');
          this.getData();
        }
    )
  }

  getData() {
    let result: any;
    const data: object = {
      method: 'GET',
      path: this.data.urlCrud,
    };
    this.api.getany(data)
      .subscribe(
        (data: any): any => {
          this.listData = data.body;
        },
        (e: any) => {
          console.log(e);
          this.toastr.error('Algo va mal, en algun lado la cague xD... oops','Error');
        }
    )
  }

  open(content, dataUpdate = {},defaultValues= {}){
    this.dataUpdate = dataUpdate;
    this.defaultValues = defaultValues;
    this.modalService.open(content, { 
      size: 'lg', 
      backdropClass: 'light-blue-backdrop',
      backdrop: 'static'
    }).result.then( result => {},
    (reason) => {
      this.getData();
    })
  }
}