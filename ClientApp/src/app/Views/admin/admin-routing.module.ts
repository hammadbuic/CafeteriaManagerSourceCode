import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from '../Common/profile/profile.component';
import { AdminComponent } from './admin.component';
import { ManageAdminComponent } from './manage-admin/manage-admin.component';
import { ManageItemsComponent } from './manage-items/manage-items.component';
import { ManageKitchenComponent } from './manage-kitchen/manage-kitchen.component';
import { OrderReportsComponent } from './order-reports/order-reports.component';

const routes: Routes = [
  { path: 'dashboard', component: AdminComponent },
  { path: 'manage-admin', component: ManageAdminComponent },
  { path: 'manage-items', component: ManageItemsComponent },
  { path: 'manage-kitchen', component: ManageKitchenComponent },
  { path: 'order-reports', component: OrderReportsComponent },
  { path: ":id", component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
