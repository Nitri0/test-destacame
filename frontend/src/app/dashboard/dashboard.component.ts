import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { horas } from './horas.list';
import { choferes } from './choferes.list';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public horas: any = horas;
  public choferes: any = choferes;

  constructor(public router: Router) {
  }

  ngOnInit() {}

  getChoferFromHorario(day:string, start_time:string, start_sh:string, end_time:string, end_sh:string):string{
    let name: string;
    let horario_start:number = this.horaEstandarAMilitar(start_time.split(":")[0], start_sh);
    let horario_end:number   = this.horaEstandarAMilitar(end_time.split(":")[0], end_sh);

    choferes[day].forEach( chofer => {
      let extraend:number = chofer.end_time.split(":")[1] > 0? 1:0  

      let chofer_start:number = parseInt(chofer.start_time.split(":")[0]);
      let chofer_end:  number = parseInt( chofer.end_time.split(":")[0]) + extraend;
      
      if (this.estaEnRango(chofer_start, chofer_end, horario_start, horario_end)){
        name = chofer.name
      }
    });
    return name
  }

  estaEnRango(chofer_start:number, chofer_end:number, horario_start:number, horario_end:number):boolean {
    if (chofer_start <= horario_start && chofer_end >= horario_end){
      return true
    }
    return false
  }

  horaEstandarAMilitar(hora:string, sh:string): number {
    let horaInt:number = parseInt(hora);
    return sh === "am" ? horaInt: horaInt+12;
  }
}
