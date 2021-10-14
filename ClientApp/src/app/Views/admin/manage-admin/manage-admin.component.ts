import { Component, OnInit, ViewChild, TemplateRef, OnDestroy, ChangeDetectorRef} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ToastrService } from 'ngx-toastr';
import { AdminManageService } from '../../../services/admin-manage.service';
import { Admin } from '../../../interfaces/admin';
@Component({
  selector: 'app-manage-admin',
  templateUrl: './manage-admin.component.html',
  styleUrls: ['./manage-admin.component.scss']
})
export class ManageAdminComponent implements OnInit, OnDestroy {
  //formControls for inserting student data
  insertForm!: FormGroup
  fullname!: FormControl
  username!: FormControl
  email!: FormControl
  //Add Modal
  @ViewChild('template') modal!: TemplateRef<any>
  //update Modal
  @ViewChild('editTemplate') editModal!: TemplateRef<any>
  //Modal properties
  modalMessage!: string
  modalRef!: BsModalRef
  //Observers
  selectedAdmin: any;
  admins$!: Observable<Admin[]>
  admins: Admin[] = [];
  //Properties for the data table
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  //Data Table directive
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  constructor(private service: AdminManageService, private modalService: BsModalService, private spinner: NgxSpinnerService,
    private fb: FormBuilder, private changeRef: ChangeDetectorRef, private toastr: ToastrService, private route: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',        //pages
      pageLength: 10,                    //5 elements will be shown
      autoWidth: true,
      //order:[[0,'desc']]
    };
    this.admins$ = this.service.getAdminList();
    this.admins$.subscribe(result => {
      this.admins = result;
      this.changeRef.detectChanges();
      this.dtTrigger.next();
    });
    this.modalMessage = "All Fields are necessary";
    //intializing add supervisor properties
    this.fullname = new FormControl('', [Validators.required, Validators.maxLength(20)]);
    this.username = new FormControl('', [Validators.required, Validators.maxLength(20)]);
    this.email = new FormControl('', [Validators.required, Validators.maxLength(50)]);
    this.insertForm = this.fb.group({
      'fullName': this.fullname,
      'UserName': this.username,
      'Email': this.email,
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
  onAddAdmin() {
    this.modalRef = this.modalService.show(this.modal);
  }
  onSubmit() {
    let newAdmin = this.insertForm.value;
    this.service.postAdmin(newAdmin).subscribe(
      result => {
        //this.service.clearServiceCache();
        this.admins$ = this.service.getAdminList();
        this.admins$.subscribe(adminsList => {
          this.admins = adminsList;
          this.rerenderer();
          this.modalRef.hide();
          this.insertForm.reset();
         })
        console.log("ADMIN ADDED SUCCESS");
        this.toastr.success("Admin added successfully");
      },
      error => {
        console.log("ADMIN ADD ERROR!");
        this.toastr.success("Operation Unsuccessfull");
      });
  }
  onDelete(admin: Admin): void {
    this.service.deleteAdmin(admin.id).subscribe(result => {
      console.log("ADMIN DELETED!");
      this.admins$ = this.service.getAdminList();
      this.admins$.subscribe(list => {
        this.admins = list;
        this.rerenderer();
      });
      this.toastr.success("Admin Deleted Successfully!");
    },
      error => { console.log("Unable to delete admin!"); this.toastr.success("Operation Failed!"); })
  }
  onSelect(admin: Admin) {
    this.route.navigateByUrl("/home/admin/" + admin.id);
  }
  ngOnDestroy() {
    //this.service.clearServiceCache();
  }
}
