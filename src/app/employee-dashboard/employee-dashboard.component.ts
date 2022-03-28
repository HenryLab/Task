import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  formValue !: FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel();
  employeeData !:any;
  showAdd!: boolean;
  showUpdate!:boolean;
  constructor(private formbuilder: FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      first_name: [''],
      last_name: [''],
      email :[''],
      avatar: ['']
    })
  }
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postEmployeeDetails(){
    this.employeeModelObj.first_name = this.formValue.value.first_name;
    this.employeeModelObj.last_name = this.formValue.value.last_name;
    this.employeeModelObj.email = this.formValue.value.email;

    this.employeeModelObj.avatar = this.formValue.value.avatar;
    this.api.postEmploye(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Employee Added Successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
    error=>{
      alert("something went wrong");
    })
  }
  getAllEmployee(){
    
    this.api.getAllEmployee()
    .subscribe(res=>{
      const { data} = res;
      console.log(res)
      if(data && data.length){
      this.employeeData = data;
      }
    })
  }
  deleteEmployee(data:any){
    this.api.deleteEmployee(data.id)
    .subscribe(res=>{
      console.log(res);
      alert("Employee Deleted")
      this.getAllEmployee();
    })
  }
  onEdit(data:any){
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.id = data.id;
    this.formValue.controls['first_name'].setValue(data.first_name);
    this.formValue.controls['last_name'].setValue(data.last_name);
    this.formValue.controls['email'].setValue(data.email);

    this.formValue.controls['avatar'].setValue(data.avatar);
  }
  updateEmployeeDetails(){
    this.employeeModelObj.first_name = this.formValue.value.first_name;
    this.employeeModelObj.last_name = this.formValue.value.last_name;
    this.employeeModelObj.email = this.formValue.value.email;

    this.employeeModelObj.avatar = this.formValue.value.avatar;

    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
    this.api.updateEmployees(this.employeeModelObj,this.employeeModelObj.id)

    .subscribe(res=>{
      alert("Updated Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })
  }
}
