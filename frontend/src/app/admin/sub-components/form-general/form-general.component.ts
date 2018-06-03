import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators } from '@angular/forms'
import { ApiService } from '../../../api.service';
import { ToastrService } from 'ngx-toastr';
import { promise } from 'protractor';


@Component({
  selector: 'general-form',
  templateUrl: './form-general.component.html',
  styleUrls: ['./form-general.component.scss']
})

export class FormGeneralComponent implements OnInit {
  @Input() data: any;
  @Input() update: any;
  @Input() defaultValues: any ;
  
  myform: FormGroup;
  resultConsult: any;
  inputs: {};
  nameSubmitButton:string;
  constructor(private toastr: ToastrService, public api:ApiService, public router: Router){}

  ngOnInit() {
    this.nameSubmitButton = this.update!== undefined ?  "Actualizar": "Crear"
    
    if ('requiredSelectData' in this.data){
      this.resultConsult = {};
      let promises = []
      this.data.requiredSelectData.forEach((query,index) =>{
        
        if ('defaultValues' in query){
          this.resultConsult[query.varResultName] = query.defaultValues;
        }else{
          promises.push( this.getDataForm(query.uri))
          this.resultConsult[query.varResultName] = [];
        }
      })
      if (promises.length){
        Promise.all(promises)
        .then(results =>{
          results.forEach( (result,index) => {
            this.resultConsult[this.data.requiredSelectData[index].varResultName] = result 
          })
        })
      }
      this.initForm()
    }else{
      this.initForm()
    }
  }

  getDataForm(url){
    return new Promise((resolve, reject) => {
      let result;
      const data = {
        method: 'GET',
        path: url,
      }
      this.api.getany(data)
        .subscribe((data: any): any => {
          result = data.body;
        },
        (e: any) => {
          reject(e);
          this.toastr.error('Algo va mal, no se pueden cargar selects... oops','Error');
        },
        () => {
          resolve(result);
        }
      )
    })
  }

  initForm(){
    console.log("update: ",this.update);
    this.inputs = {};
    this.data.inputs.forEach(input => {
      this.inputs[input.inputName] = input.isRequired ? new FormControl('', Validators.required): new FormControl()
      this.inputs[input.inputName].value = this.defaultValues && this.defaultValues[input.inputName] ? this.defaultValues[input.inputName] : ""
      if (this.update!==undefined){
        this.inputs[input.inputName].value = this.update[input.inputName] ? this.update[input.inputName] : ""
        console.log(this.update, this.inputs[input.inputName], input.inputName);
      }
    });

    // if (this.update!==undefined){
    //   this.inputs = this.update
    // }else{
    //   this.data.inputs.forEach(input => {
    //     this.inputs[input.inputName] = input.isRequired ? new FormControl('', Validators.required): new FormControl()
    //     }
    // });
    console.log(this.inputs)
    this.myform = new FormGroup(this.inputs)
  }

  onSubmit() {
    let result: any;
    if (this.myform.valid){
      let params = this.myform.value
      if (this.update!==undefined){
        params["id"] = this.update.id
      }

      const data: object = {
        method: this.update!==undefined ? 'PUT': 'POST',
        path: this.update!==undefined ? this.data.urlCrud + this.update.id + '/': this.data.urlCrud,
        params:this.myform.value
      };
      this.api.getany(data)
        .subscribe(
          (data: any): any => {
            result = data.body;
            this.myform.reset();
            
          },
          (e: any) => {
            console.log(e);
            this.toastr.error('Algo va mal, en algun lado la cague xD... oops','Error');
          },
          () => {
            this.toastr.success( this.data.mainLabelSingular+' creado exitosamente','Success');
            this.myform.reset();
          }
      )
    }
    else{
      this.toastr.error('Todos los campos son requeridos','Datos invalidos');
    }
  }
}
