import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectorRef, Inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ToastrService } from 'ngx-toastr';
import { Item } from '../../../interfaces/item';
import { ItemManageService } from '../../../services/item-manage.service';
@Component({
  selector: 'app-manage-items',
  templateUrl: './manage-items.component.html',
  styleUrls: ['./manage-items.component.scss']
})
export class ManageItemsComponent implements OnInit {
  //img upload
  file!: File;

  imageUrl: string | ArrayBuffer =
    "https://bulma.io/images/placeholders/480x480.png";
  fileName: string = "No file selected";
  //formControls for inserting student data
  insertForm!: FormGroup
  name!: FormControl
  description: FormControl
  quantity!: FormControl
  price!: FormControl
  actual_price: FormControl
  img!: FormControl
  //formControls for updating student data
  updateForm!: FormGroup
  _item!: FormControl
  _quantity!: FormControl
  _price!: FormControl
  _img!: FormControl
  //Add Modal
  @ViewChild('template') modal!: TemplateRef<any>
  //update Modal
  @ViewChild('editTemplate') editModal!: TemplateRef<any>
  //Modal properties
  modalMessage!: string
  modalRef!: BsModalRef
  baseURL: string;
  item$!: Observable<Item[]>
  items: Item[] = [];
  //Properties for the data table
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  //Data Table directive
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  constructor(@Inject('BASE_URL') BASE_URL: string, private service: ItemManageService, private modalService: BsModalService, private spinner: NgxSpinnerService,
    private fb: FormBuilder, private changeRef: ChangeDetectorRef, private toastr: ToastrService, private route: Router) { this.baseURL = BASE_URL; }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',        //pages
      pageLength: 10,                    //5 elements will be shown
      autoWidth: true,
      //order:[[0,'desc']]
    };
    this.item$ = this.service.getItemList();
    this.item$.subscribe(result => { this.items = result; this.changeRef.detectChanges(); this.dtTrigger.next(); })
    this.modalMessage = "All Fields are necessary";
    this.modalMessage = "All Fields are necessary";
    //intializing add supervisor properties
    this.name = new FormControl('', [Validators.required, Validators.maxLength(20)]);
    this.description = new FormControl('', [Validators.required, Validators.maxLength(20)]);
    this.quantity = new FormControl('', [Validators.required, Validators.maxLength(20)]);
    this.price = new FormControl('', [Validators.required, Validators.maxLength(50)]);
    this.actual_price = new FormControl('', [Validators.required, Validators.maxLength(50)]);
    this.insertForm = this.fb.group({
      'name': this.name,
      'description':this.description,
      'quantity': this.quantity,
      'price': this.price,
      'actual_price': this.actual_price,
      'img': this.file
    });
  }
  rerenderer() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      //destroy table in current context
      dtInstance.destroy();
      //rerender again
      this.dtTrigger.next();
    })
  }
  onAddItem() {
    this.modalRef = this.modalService.show(this.modal);
  }
  onSubmit() {
    let formData = this.insertForm.value;
    const form = new FormData();
    form.append('name', this.insertForm.get('name').value);
    form.append('description', this.insertForm.get('description').value);
    form.append('quantity', this.insertForm.get('quantity').value);
    form.append('price', this.insertForm.get('price').value);
    form.append('actual_price', this.insertForm.get('actual_price').value)
    form.append('img', this.file);
    this.service.postItem(form).subscribe(result => {
      this.service.clearItemCache();
      this.item$ = this.service.getItemList();
      this.item$.subscribe(result => { this.items = result; this.rerenderer(); this.modalRef.hide(); this.insertForm.reset(); this.toastr.success("Item Added Successfully"); },
        error => { this.toastr.error("Cannot Add Item!"); })
    }, error => { this.toastr.error("Check Filename and type", "Cannot Add this File"); });
  }
  public fileChange(files): void {
    if (files.length === 0) { return; }
    if (files[0].type != 'image/png') { this.insertForm.invalid }
    else { this.insertForm.valid; this.file = <File>files[0]; }
    //console.log((event.target as HTMLInputElement).value);
  }
  onDelete(item: Item): void {
    this.service.deleteItem(item.id, item.img).subscribe(result => {
      this.item$ = this.service.getItemList();
      this.item$.subscribe(list => { this.items = list; this.rerenderer(); this.toastr.success("Item Deleted Success!"); })
    },
      error => { this.toastr.error("Unable to Delete Item"); })
  }
  public createImgPath(filename: string) {
    return this.baseURL + 'ItemImages/' + filename;
  }
}
