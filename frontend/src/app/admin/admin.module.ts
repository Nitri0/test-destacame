import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { FormGeneralComponent } from './sub-components/form-general/form-general.component';
import { ListGeneralComponent } from './sub-components/list-general/list-general.component';
import { ApiService } from '../api.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    AdminComponent,
    FormGeneralComponent,
    ListGeneralComponent
  ],
  providers: [ApiService]
})
export class AdminModule { }
