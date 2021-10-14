import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ToastrService } from 'ngx-toastr';
import { Item } from '../../../interfaces/Order_Item/item-placeholder';
import { ItemManageService } from '../../../services/item-manage.service';
import { ManageKitchenService } from '../../../services/manage-kitchen.service';
import { Orders } from '../../../interfaces/Order_Item/Orders';
import { GenerateReportsService } from '../../../services/generate-reports.service';
@Component({
  selector: 'app-order-reports',
  templateUrl: './order-reports.component.html',
  styleUrls: ['./order-reports.component.scss']
})
export class OrderReportsComponent implements OnInit {
  item$!: Observable<Item[]>
  items: Item[] = [];
  orders: Orders[] = [];  //placeholder array to fetch orders for a product
  //Properties for the data table
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  //Data Table directive
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  constructor(@Inject('BASE_URL') BASE_URL: string, private service: GenerateReportsService, private spinner: NgxSpinnerService,
    private fb: FormBuilder, private modalService: BsModalService, private changeRef: ChangeDetectorRef, private toastr: ToastrService, private route: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      paging: false,                    //5 elements will be shown
      autoWidth: true,
      //order:[[0,'desc']]
    };
    this.item$ = this.service.getItemsForReports();
    this.item$.subscribe(result => {
      this.items = result;
      for (var i = 0; i < this.items.length; i++) {
        this.items[i].order_placed = this.items[i].orders.length;
        var price = this.items[i].actual_price + 3;
        for (var j = 0; j < this.items[i].orders.length; j++) {
            this.items[i].cost_Item =+ (price * this.items[i].orders[i].order_quantity);
          this.items[i].revenue_generated =+ ((this.items[i].price + 20) * this.items[i].orders[i].order_quantity);
        }
      }
      this.changeRef.detectChanges();
      this.dtTrigger.next();
    })
  }

}
