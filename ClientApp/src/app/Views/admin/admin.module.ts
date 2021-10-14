import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ManageAdminComponent } from './manage-admin/manage-admin.component';
import { ManageKitchenComponent } from './manage-kitchen/manage-kitchen.component';
import { ManageItemsComponent } from './manage-items/manage-items.component';
import { OrderReportsComponent } from './order-reports/order-reports.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    AdminComponent,
    ManageAdminComponent,
    ManageKitchenComponent,
    ManageItemsComponent,
    OrderReportsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgxSpinnerModule,
    ModalModule, ToastrModule.forRoot()
  ]
})
export class AdminModule { }
