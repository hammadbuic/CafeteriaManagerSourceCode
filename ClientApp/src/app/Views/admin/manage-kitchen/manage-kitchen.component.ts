import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectorRef, Inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ToastrService } from 'ngx-toastr';
import { Item } from '../../../interfaces/Order_Item/item';
import { ItemManageService } from '../../../services/item-manage.service';
import { ManageKitchenService } from '../../../services/manage-kitchen.service';
import { Orders } from '../../../interfaces/Order_Item/Orders';

@Component({
  selector: 'app-manage-kitchen',
  templateUrl: './manage-kitchen.component.html',
  styleUrls: ['./manage-kitchen.component.scss']
})
export class ManageKitchenComponent implements OnInit {
  baseURL: string;
  item$!: Observable<Item[]>
  items: Item[] = [];
  orders: Orders[] = [];  //placeholder array to fetch orders for a product
  @ViewChild('template') modal!: TemplateRef<any>
  modalMessage!: string
  modalRef!: BsModalRef
  //Properties for the data table
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  //Data Table directive
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  constructor(@Inject('BASE_URL') BASE_URL: string, private service: ManageKitchenService, private spinner: NgxSpinnerService,
    private fb: FormBuilder, private modalService: BsModalService,private changeRef: ChangeDetectorRef, private toastr: ToastrService, private route: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      paging:false,                    //5 elements will be shown
      autoWidth: true,
      //order:[[0,'desc']]
    };
    this.item$ = this.service.getItemsWithOrders();
    this.item$.subscribe(result => {
      this.items = result; this.changeRef.detectChanges(); this.dtTrigger.next();
    })

  }
  onViewOrders(item: Item) {
    this.modalRef = this.modalService.show(this.modal);
    this.modalRef.setClass('modal-lg modal-scrollable');
    this.orders = item.orders;
  }
  onDelivery(order: Orders) {
    order.status = true;
    this.service.putOrder(order).subscribe(
      result => {
        this.toastr.success(result.toString(), "Order Updated");
        this.item$ = this.service.getItemsWithOrders();
        this.item$.subscribe(result => {
          this.items = result; this.changeRef.detectChanges(); this.rerenderer(); this.modalRef.hide();
          console.log("Item Fetch Success");
        },
          errors => { console.log("Unable to fetch Orders"); })
        
      },
      error => {  }
    )
  }
  rerenderer() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      //destroy table in current context
      dtInstance.destroy();
      //rerender again
      this.dtTrigger.next();
    })
  }
}
